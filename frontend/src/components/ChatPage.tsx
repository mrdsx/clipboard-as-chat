import { ChatActions } from "@/features/chat/ChatActions";
import { Messages } from "@/features/message";
import { useRef } from "react";

function ChatPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen flex-col justify-between gap-4 p-8">
      <Messages messagesContainerRef={messagesContainerRef} />
      <ChatActions
        inputRef={inputRef}
        messagesContainerRef={messagesContainerRef}
      />
    </div>
  );
}

export { ChatPage };
