import { type MessageResponse, useChatMessagesQuery } from "@/features/message";
import type { ReactRef } from "@/lib";
import { BASE_API_WS_URL } from "@/lib/api";
import type { UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { ChatStatus } from "./types";

type ChatContextType = {
  chatSocket: WebSocket;
  chatStatus: ChatStatus;
  clientMessages: MessageResponse[] | null;
  inputRef: ReactRef<HTMLInputElement>;
  messagesContainerRef: ReactRef<HTMLDivElement>;
  messagesQuery: UseQueryResult<MessageResponse[], Error>;
  handleSendMessage(): void;
};

const ChatContext = createContext<ChatContextType | null>(null);

function ChatContextProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const { sessionUUID } = useParams<{ sessionUUID: string }>();
  const chatSocket = new WebSocket(`${BASE_API_WS_URL}/ws/chat/${sessionUUID}`);
  const messagesQuery = useChatMessagesQuery(sessionUUID);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("Pending");
  const [clientMessages, setClientMessages] = useState<
    MessageResponse[] | null
  >(null);

  useEffect(() => {
    if (messagesQuery.data !== undefined) {
      setClientMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

  if (messagesQuery.isError) navigate("/");

  chatSocket.addEventListener("open", () => setChatStatus("Online"));
  chatSocket.addEventListener("close", () => setChatStatus("Offline"));
  chatSocket.addEventListener("message", (event) => {
    if (clientMessages !== null) {
      const newClientMessage: MessageResponse = JSON.parse(event.data);
      setClientMessages([...clientMessages, newClientMessage]);
    }
  });

  function handleSendMessage(): void {
    if (!inputRef.current || !messagesContainerRef.current) {
      return;
    }

    const message = inputRef.current.value;
    if (message.trim().length === 0) return;
    chatSocket.send(message);
    inputRef.current.value = "";
  }

  return (
    <ChatContext.Provider
      value={{
        chatSocket,
        chatStatus,
        clientMessages,
        inputRef,
        messagesContainerRef,
        messagesQuery: { ...messagesQuery },
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

function useChatContext() {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useChatContext must be used inside ChatContextProvider");
  }

  return context;
}

export { ChatContextProvider, useChatContext };
