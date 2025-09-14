import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactRef } from "@/lib";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router";
import { MessageCard } from "./MessageCard";
import { useChatMessagesQuery } from "./useChatMessagesQuery";

function Messages({
  messagesContainerRef,
}: {
  messagesContainerRef: ReactRef<HTMLDivElement>;
}) {
  const { sessionUUID } = useParams<{ sessionUUID: string }>();
  const { data: messages, isPending } = useChatMessagesQuery(sessionUUID);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
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
