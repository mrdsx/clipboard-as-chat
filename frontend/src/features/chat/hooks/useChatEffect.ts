import type { MessageResponse } from "@/features/message";
import { scrollToBottom, type ReactRef, type ReactSetState } from "@/lib";
import { BASE_API_WS_URL } from "@/lib/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import type { ChatStatus } from "../types";

type ChatStatusEffectProps = {
  chatSocketRef: ReactRef<WebSocket>;
  sessionUUID: string | undefined;
  setChatStatus: ReactSetState<ChatStatus>;
};

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
  messagesQuery: UseQueryResult<MessageResponse[], Error>;
  setClientMessages: ReactSetState<MessageResponse[] | null>;
};

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

type ScrollToBottomEffectProps = {
  chatStatus: ChatStatus;
  clientMessages: MessageResponse[] | null;
  isScrolledToBottom: boolean;
  messagesContainerRef: ReactRef<HTMLDivElement>;
};

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

export {
  useChatStatusEffect,
  useClientMessagesEffect,
  useMessageEventEffect,
  useScrollToBottomEffect,
};
