import { ChatContextProvider, ChatHeader } from "@/features/chat";
import { ChatActions } from "@/features/chat/components/ChatActions";
import { Messages } from "@/features/message";

function Chat() {
  return (
    <ChatContextProvider>
      <div className="flex h-screen flex-col justify-between gap-4 p-6">
        <ChatHeader />
        <Messages />
        <ChatActions />
      </div>
    </ChatContextProvider>
  );
}

export { Chat };
