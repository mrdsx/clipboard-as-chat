import { useChatMessagesQuery, type MessageResponse } from "@/features/message";
import { type ReactRef, type ReactSetState } from "@/lib";
import type { UseQueryResult } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import type { ChatSessionResponse, ChatStatus } from "../types";
import {
  useChatStatusEffect,
  useClientMessagesEffect,
  useMessageEventEffect,
  useScrollToBottomEffect,
  useShowLocalTimeEffect,
} from "./useChatEffect";
import { useChatSessionQuery } from "./useChatSessionQuery";

const SHOW_LOCAL_TIME_LOCAL_STORAGE_KEY = "show-local-time";

type UseChatProps = {
  chatSessionQuery: UseQueryResult<ChatSessionResponse, Error>;
  chatStatus: ChatStatus;
  clientMessages: MessageResponse[] | null;
  inputRef: ReactRef<HTMLInputElement>;
  isScrolledToBottom: boolean;
  messagesContainerRef: ReactRef<HTMLDivElement>;
  messagesQuery: UseQueryResult<MessageResponse[], Error>;
  sessionUUID: string | undefined;
  showLocalTime: boolean;
  setShowLocalTime: ReactSetState<boolean>;
  setIsScrolledToBottom: ReactSetState<boolean>;
  handleSendMessage(): void;
};

function useChat(): UseChatProps {
  const { sessionUUID } = useParams<{ sessionUUID: string }>();
  const chatSocketRef = useRef<WebSocket>(null);
  const chatSessionQuery = useChatSessionQuery(sessionUUID as string);
  const messagesQuery = useChatMessagesQuery(sessionUUID);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("Pending");
  const [clientMessages, setClientMessages] = useState<
    MessageResponse[] | null
  >(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(true);
  const [showLocalTime, setShowLocalTime] = useState<boolean>(() =>
    Boolean(
      JSON.parse(
        localStorage.getItem(SHOW_LOCAL_TIME_LOCAL_STORAGE_KEY) ?? "true",
      ),
    ),
  );

  useChatStatusEffect({ chatSocketRef, sessionUUID, setChatStatus });
  useClientMessagesEffect({ messagesQuery, setClientMessages });
  useMessageEventEffect({ chatSocketRef, setClientMessages });
  useScrollToBottomEffect({
    chatStatus,
    clientMessages,
    isScrolledToBottom,
    messagesContainerRef,
  });
  useShowLocalTimeEffect({ showLocalTime });

  function handleSendMessage(): void {
    if (!inputRef.current || !chatSocketRef.current || chatStatus !== "Online")
      return;

    const message = inputRef.current.value;
    if (message.trim().length === 0) return;

    chatSocketRef.current.send(message);
    inputRef.current.value = "";
  }

  return {
    chatSessionQuery,
    chatStatus,
    clientMessages,
    inputRef,
    isScrolledToBottom,
    messagesContainerRef,
    messagesQuery,
    sessionUUID,
    showLocalTime,
    setIsScrolledToBottom,
    setShowLocalTime,
    handleSendMessage,
  };
}

export { SHOW_LOCAL_TIME_LOCAL_STORAGE_KEY, useChat, type UseChatProps };
