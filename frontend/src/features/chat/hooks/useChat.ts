import { useChatMessagesQuery, type MessageResponse } from "@/features/message";
import { type ReactRef } from "@/lib";
import type { UseQueryResult } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import type { ChatSessionResponse, ChatStatus } from "../types";
import {
  useChatStatusEffect,
  useClientMessagesEffect,
  useMessageEventEffect,
  useScrollToBottomEffect,
} from "./useChatEffect";
import { useChatSessionQuery } from "./useChatSessionQuery";

type UseChatStatusResult = {
  chatSessionQuery: UseQueryResult<ChatSessionResponse, Error>;
  chatStatus: ChatStatus;
  clientMessages: MessageResponse[] | null;
  inputRef: ReactRef<HTMLInputElement>;
  isAtBottomRef: React.RefObject<boolean>;
  messagesContainerRef: ReactRef<HTMLDivElement>;
  messagesQuery: UseQueryResult<MessageResponse[], Error>;
  sessionUUID: string | undefined;
  handleSendMessage(): void;
};

function useChat(): UseChatStatusResult {
  const { sessionUUID } = useParams<{ sessionUUID: string }>();
  const chatSocketRef = useRef<WebSocket>(null);
  const chatSessionQuery = useChatSessionQuery(sessionUUID as string);
  const messagesQuery = useChatMessagesQuery(sessionUUID);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("Pending");
  const [clientMessages, setClientMessages] = useState<
    MessageResponse[] | null
  >(null);

  useChatStatusEffect({ chatSocketRef, sessionUUID, setChatStatus });
  useClientMessagesEffect({ messagesQuery, setClientMessages });
  useMessageEventEffect({ chatSocketRef, setClientMessages });
  useScrollToBottomEffect({
    chatStatus,
    clientMessages,
    isAtBottomRef,
    messagesContainerRef,
  });

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
    isAtBottomRef,
    messagesContainerRef,
    messagesQuery,
    sessionUUID,
    handleSendMessage,
  };
}

export { useChat, type UseChatStatusResult };
