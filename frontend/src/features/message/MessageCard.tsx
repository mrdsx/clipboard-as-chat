import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy } from "lucide-react";
import type { MessageResponse } from "./types";
import { getMessageCreationTime } from "./utils";

function MessageCard({ message }: { message: MessageResponse }) {
  const date = new Date(message.created_at);
  const formattedTime = getMessageCreationTime(date);

  return (
    <Card className="px-0" key={message.id}>
      <CardHeader className="flex text-sm">
        <span className="text-muted-foreground">{formattedTime}</span>
        <Button
          className="ml-auto size-7.5 p-0"
          variant="ghost"
          size="icon"
          onClick={() => navigator.clipboard.writeText(message.text)}
        >
          <Copy className="-scale-x-100" />
        </Button>
      </CardHeader>
      <CardContent className="line-clamp-6 font-semibold break-all">
        {message.text}
      </CardContent>
    </Card>
  );
}

export { MessageCard };
