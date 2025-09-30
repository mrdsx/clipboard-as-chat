import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../chat";
import type { MessageResponse } from "./types";
import { getMessageCreationTime } from "./utils";

function MessageCard({ message }: { message: MessageResponse }) {
  const { showLocalTime } = useChatContext();
  const createdAtDate = new Date(message.created_at);
  const formattedTime = getMessageCreationTime(createdAtDate, showLocalTime);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const isCopiedTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (!isCopied && !isCopiedTimeoutRef.current) return;

    isCopiedTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => clearTimeout(isCopiedTimeoutRef.current);
  }, [isCopied]);

  return (
    <Card className="px-0" key={message.id}>
      <CardHeader className="flex text-sm">
        <span className="text-muted-foreground">{formattedTime}</span>
        <Button
          className="ml-auto size-7.5 p-0"
          variant="ghost"
          size="icon"
          onClick={() => {
            navigator.clipboard.writeText(message.text);
            setIsCopied(true);
          }}
        >
          {isCopied ? <Check /> : <Copy className="-scale-x-100" />}
        </Button>
      </CardHeader>
      <CardContent className="line-clamp-6 font-semibold break-all">
        {message.text}
      </CardContent>
    </Card>
  );
}

export { MessageCard };
