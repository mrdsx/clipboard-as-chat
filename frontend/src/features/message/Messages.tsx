import { ScrollArea } from "@/components/ui/scroll-area";
import { getIsAtBottom } from "@/lib";
import { LoaderCircle } from "lucide-react";
import { useChatContext } from "../chat";
import { MessageCard } from "./MessageCard";

function Messages() {
  const {
    chatStatus,
    clientMessages: messages,
    isAtBottomRef,
    messagesContainerRef,
  } = useChatContext();

  function handleScrollCapture(
    e: React.UIEvent<HTMLDivElement, UIEvent>,
  ): void {
    const target = e.target as HTMLDivElement;
    isAtBottomRef.current = getIsAtBottom(target);
  }

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
      <ScrollArea className="h-full" onScrollCapture={handleScrollCapture}>
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
