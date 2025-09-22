import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle } from "lucide-react";
import { useChatContext } from "../chat";
import { MessageCard } from "./MessageCard";

function Messages() {
  const {
    chatStatus,
    clientMessages: messages,
    messagesContainerRef,
  } = useChatContext();

  if (chatStatus === "Offline") return;

  if (chatStatus === "Pending") {
    return (
      <div className="flex h-full justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

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
