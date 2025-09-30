import { createContext, useContext } from "react";
import { useChat, type UseChatProps } from "./hooks";

type ChatContextType = UseChatProps;

const ChatContext = createContext<ChatContextType | null>(null);

function ChatContextProvider({ children }: React.PropsWithChildren) {
  const chat = useChat();

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

function useChatContext() {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useChatContext must be used inside ChatContextProvider");
  }

  return context;
}

export { ChatContextProvider, useChatContext };
