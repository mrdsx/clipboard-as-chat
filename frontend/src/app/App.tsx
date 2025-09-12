import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { scrollToBottom } from "@/lib";
import { Clipboard, Copy, SendHorizontal } from "lucide-react";
import { useRef, useState } from "react";

const mockMessages = [
  {
    id: 1,
    sender: "PC",
    text: "https://docs.example.com/123",
    time: "10:14 PM",
  },
  {
    id: 2,
    sender: "Phone",
    text: "221B Baker Street, London",
    time: "10:14 PM",
  },
  {
    id: 3,
    sender: "PC",
    text: "Meeting at 4:15, Zoom link: zoom.us/xyz",
    time: "10:14 PM",
  },
];

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastId = useRef(3);
  const [messages, setMessages] = useState([...mockMessages]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!inputRef.current || !messagesContainerRef.current) {
      return;
    }

    const message = inputRef.current.value;
    if (message.trim().length === 0) return;

    lastId.current++;
    setMessages((prev) => [
      ...prev,
      {
        id: lastId.current,
        sender: "PC",
        text: message,
        time: "now",
      },
    ]);
    inputRef.current.value = "";
    setTimeout(() => scrollToBottom(messagesContainerRef.current), 1);
  }

  async function handlePaste(): Promise<void> {
    if (!inputRef.current) return;
    inputRef.current.value = await navigator.clipboard.readText();
  }

  return (
    <div className="flex h-screen flex-col justify-between gap-4 p-8">
      <div className="overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid gap-3" ref={messagesContainerRef}>
            {messages.map((m) => (
              <Card className="gap-0" key={m.id}>
                <div className="flex text-sm">
                  {m.sender} -{" "}
                  <span className="text-muted-foreground">{m.time}</span>
                  <Button
                    className="ml-auto size-7.5 p-0"
                    variant="ghost"
                    size="icon"
                    onClick={() => navigator.clipboard.writeText(m.text)}
                  >
                    <Copy className="-scale-x-100" />
                  </Button>
                </div>
                <span className="font-semibold">{m.text}</span>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <form className="flex items-center gap-3" onSubmit={handleSubmit}>
        <Input
          className="relative p-5"
          placeholder="Enter a text..."
          ref={inputRef}
        />
        <Button type="button" variant="outline" onClick={handlePaste}>
          <Clipboard />
          Paste
        </Button>
        <Button type="submit">
          <SendHorizontal />
          Send
        </Button>
      </form>
    </div>
  );
}

export { App };
