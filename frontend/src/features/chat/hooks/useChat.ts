import { useChatMessagesQuery, type MessageResponse } from "@/features/message";
import { scrollToBottom, type ReactRef } from "@/lib";
import type { UseQueryResult } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import type { ChatStatus } from "../types";
import {
  useChatStatusEffect,
  useClientMessagesEffect,
  useMessageEventEffect,
  useScrollToBottomEffect,
} from "./useChatEffect";

type UseChatStatusResult = {
  chatStatus: ChatStatus;
  clientMessages: MessageResponse[] | null;
  inputRef: ReactRef<HTMLInputElement>;
  messagesContainerRef: ReactRef<HTMLDivElement>;
  messagesQuery: UseQueryResult<MessageResponse[], Error>;
  handleSendMessage(): void;
};

function useChat(): UseChatStatusResult {
  const { sessionUUID } = useParams<{ sessionUUID: string }>();
  const chatSocketRef = useRef<WebSocket>(null);
  const messagesQuery = useChatMessagesQuery(sessionUUID);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("Pending");
  const [clientMessages, setClientMessages] = useState<
    MessageResponse[] | null
  >(null);

  useChatStatusEffect({ chatSocketRef, sessionUUID, setChatStatus });
  useClientMessagesEffect({ messagesQuery, setClientMessages });
  useMessageEventEffect({ chatSocketRef, setClientMessages });
  useScrollToBottomEffect({ clientMessages, messagesContainerRef });

  function handleSendMessage(): void {
    if (!inputRef.current || !chatSocketRef.current) return;

    const message = inputRef.current.value;
    if (message.trim().length === 0) return;

    chatSocketRef.current.send(message);
    inputRef.current.value = "";
    setTimeout(() => {
      scrollToBottom(messagesContainerRef.current);
    }, 10);
  }

  return {
    chatStatus,
    clientMessages,
    inputRef,
    messagesContainerRef,
    messagesQuery,
    handleSendMessage,
  };
}

export { useChat, type UseChatStatusResult };
