import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReactRef } from "@/lib";
import { Clipboard, SendHorizontal } from "lucide-react";

type ChatActionsProps = {
  inputRef: ReactRef<HTMLInputElement>;
  messagesContainerRef: ReactRef<HTMLDivElement>;
};

function ChatActions({ inputRef, messagesContainerRef }: ChatActionsProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!inputRef.current || !messagesContainerRef.current) {
      return;
    }

    const message = inputRef.current.value;
    if (message.trim().length === 0) return;

    console.log(inputRef.current.value);
  }

  async function handlePaste(): Promise<void> {
    if (!inputRef.current) return;
    inputRef.current.value = await navigator.clipboard.readText();
  }

  return (
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
  );
}

export { ChatActions };
