import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatContext } from "../chat";
import { MessageCard } from "./MessageCard";

function Messages() {
  const { clientMessages: messages, messagesContainerRef } = useChatContext();

  return (
    <div className="h-full overflow-hidden">
      <ScrollArea className="h-full">
        <div className="grid gap-3" ref={messagesContainerRef}>
          {messages?.map((message) => (
            <MessageCard message={message} key={message.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export { Messages };
