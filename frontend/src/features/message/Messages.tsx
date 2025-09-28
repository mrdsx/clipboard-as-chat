import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIsScrolledToBottom, scrollToBottom } from "@/lib";
import { ArrowDown, LoaderCircle } from "lucide-react";
import { useChatContext } from "../chat";
import { MessageCard } from "./MessageCard";

function Messages() {
  const {
    chatStatus,
    clientMessages: messages,
    isScrolledToBottom,
    setIsScrolledToBottom,
    messagesContainerRef,
  } = useChatContext();

  function handleScrollCapture(
    e: React.UIEvent<HTMLDivElement, UIEvent>,
  ): void {
    const target = e.target as HTMLDivElement;
    if (!isScrolledToBottom) {
      setIsScrolledToBottom(getIsScrolledToBottom(target));
    } else {
      setTimeout(
        () => setIsScrolledToBottom(getIsScrolledToBottom(target)),
        200,
      );
    }
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
    <div className="relative h-full overflow-hidden">
      <ScrollArea className="h-full" onScrollCapture={handleScrollCapture}>
        <div className="grid gap-3" ref={messagesContainerRef}>
          {messages?.map((message) => (
            <MessageCard message={message} key={message.id} />
          ))}
        </div>
      </ScrollArea>
      {!isScrolledToBottom && (
        <Button
          className="absolute right-2 bottom-2 size-8 border-1"
          size="icon"
          variant="secondary"
          onClick={() => scrollToBottom(messagesContainerRef.current)}
        >
          <ArrowDown />
        </Button>
      )}
    </div>
  );
}

export { Messages };
