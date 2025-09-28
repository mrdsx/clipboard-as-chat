import { ChatContextProvider, ChatHeader } from "@/features/chat";
import { ChatActions } from "@/features/chat/components/ChatActions";
import { Messages } from "@/features/message";
import { ChatContainer } from "./ChatContainer";

function Chat() {
  return (
    <ChatContextProvider>
      <ChatContainer>
        <ChatHeader />
        <Messages />
        <ChatActions />
      </ChatContainer>
    </ChatContextProvider>
  );
}

export { Chat };
