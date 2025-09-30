import type { MessageResponse } from "@/features/message";
import { scrollToBottom, type ReactRef, type ReactSetState } from "@/lib";
import { BASE_API_WS_URL } from "@/lib/api";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import type { ChatStatus } from "../types";
import {
  SHOW_LOCAL_TIME_LOCAL_STORAGE_KEY,
  type UseChatProps,
} from "./useChat";

type ChatStatusEffectProps = {
  chatSocketRef: ReactRef<WebSocket>;
  setChatStatus: ReactSetState<ChatStatus>;
} & Pick<UseChatProps, "sessionUUID">;

function useChatStatusEffect({
  chatSocketRef,
  sessionUUID,
  setChatStatus,
}: ChatStatusEffectProps): void {
  useEffect(() => {
    chatSocketRef.current = new WebSocket(
      `${BASE_API_WS_URL}/ws/chat/${sessionUUID}`,
    );

    const socket = chatSocketRef.current;
    socket.addEventListener("open", () => setChatStatus("Online"));
    socket.addEventListener("close", () => setChatStatus("Offline"));

    return () => socket.close();
  }, [sessionUUID]);
}

type ClientMessagesEffectProps = {
  setClientMessages: ReactSetState<MessageResponse[] | null>;
} & Pick<UseChatProps, "messagesQuery">;

function useClientMessagesEffect({
  messagesQuery,
  setClientMessages,
}: ClientMessagesEffectProps): void {
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesQuery.data !== undefined) {
      setClientMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

  if (messagesQuery.isError) navigate("/");
}

type MessageEventEffectProps = {
  chatSocketRef: ReactRef<WebSocket>;
  setClientMessages: ReactSetState<MessageResponse[] | null>;
};

function useMessageEventEffect({
  chatSocketRef,
  setClientMessages,
}: MessageEventEffectProps): void {
  useEffect(() => {
    if (!chatSocketRef.current) return;

    function handleMessage(event: MessageEvent): void {
      const newClientMessage: MessageResponse = JSON.parse(event.data);
      setClientMessages((prev) =>
        prev ? [...prev, newClientMessage] : [newClientMessage],
      );
    }

    chatSocketRef.current.addEventListener("message", handleMessage);

    return () => {
      chatSocketRef.current?.removeEventListener("message", handleMessage);
    };
  }, []);
}

type ScrollToBottomEffectProps = Pick<
  UseChatProps,
  | "chatStatus"
  | "clientMessages"
  | "isScrolledToBottom"
  | "messagesContainerRef"
>;

function useScrollToBottomEffect({
  chatStatus,
  clientMessages,
  isScrolledToBottom,
  messagesContainerRef,
}: ScrollToBottomEffectProps): void {
  const hasInitiallyScrolledRef = useRef(false);

  useEffect(() => {
    if (!clientMessages || chatStatus !== "Online") return;

    if (!hasInitiallyScrolledRef.current) {
      messagesContainerRef.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
      hasInitiallyScrolledRef.current = true;
    } else if (isScrolledToBottom) {
      scrollToBottom(messagesContainerRef.current);
    }
  }, [chatStatus, clientMessages]);
}

type ShowLocalTimeEffectProps = Pick<UseChatProps, "showLocalTime">;

function useShowLocalTimeEffect({
  showLocalTime,
}: ShowLocalTimeEffectProps): void {
  useEffect(() => {
    localStorage.setItem(
      SHOW_LOCAL_TIME_LOCAL_STORAGE_KEY,
      String(showLocalTime),
    );
  }, [showLocalTime]);
}

export {
  useChatStatusEffect,
  useClientMessagesEffect,
  useMessageEventEffect,
  useScrollToBottomEffect,
  useShowLocalTimeEffect,
};
