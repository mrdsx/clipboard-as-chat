import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard } from "lucide-react";
import { useChatContext } from "./ChatContextProvider";

function ChatActions() {
  const { inputRef, handleSendMessage } = useChatContext();

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === "Enter") handleSendMessage();
  }

  async function handlePaste(): Promise<void> {
    if (!inputRef.current) return;
    inputRef.current.value = await navigator.clipboard.readText();
  }

  return (
    <div className="xs:flex-row flex flex-col items-center gap-3">
      <Input
        className="relative p-5"
        placeholder="Enter a text..."
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="xs:w-fit w-full"
        type="button"
        variant="outline"
        onClick={handlePaste}
      >
        <Clipboard />
        Paste
      </Button>
    </div>
  );
}

export { ChatActions };
