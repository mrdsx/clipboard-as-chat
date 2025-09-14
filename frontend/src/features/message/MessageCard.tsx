import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy } from "lucide-react";
import type { MessageResponse } from "./types";

function MessageCard({ message }: { message: MessageResponse }) {
  return (
    <Card className="gap-0 px-0" key={message.id}>
      <CardHeader className="flex text-sm">
        <span className="text-muted-foreground">{message.created_at}</span>
        <Button
          className="ml-auto size-7.5 p-0"
          variant="ghost"
          size="icon"
          onClick={() => navigator.clipboard.writeText(message.text)}
        >
          <Copy className="-scale-x-100" />
        </Button>
      </CardHeader>
      <CardContent className="font-semibold">{message.text}</CardContent>
    </Card>
  );
}

export { MessageCard };
