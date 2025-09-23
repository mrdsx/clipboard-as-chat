import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, SendHorizontal } from "lucide-react";
import { useChatContext } from "../ChatContextProvider";

function ChatActions() {
  const { chatStatus, inputRef, handleSendMessage } = useChatContext();

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === "Enter") handleSendMessage();
  }

  async function handlePaste(): Promise<void> {
    if (!inputRef.current) return;
    inputRef.current.value = await navigator.clipboard.readText();
  }

  return (
    <div className="xs:flex-row flex flex-col items-center gap-3">
      <div className="relative w-full">
        <Input
          className="p-5 pr-10"
          placeholder="Enter a text..."
          ref={inputRef}
          onKeyDown={handleKeyDown}
          disabled={chatStatus !== "Online"}
          aria-disabled={chatStatus !== "Online"}
        />
        {chatStatus === "Online" && (
          <Button
            className="absolute top-[50%] right-2 size-7 -translate-y-[50%]"
            variant="ghost"
            onClick={handleSendMessage}
          >
            <SendHorizontal />
          </Button>
        )}
      </div>
      <Button
        className="xs:w-fit xs:h-full h-fit w-full"
        type="button"
        variant="outline"
        onClick={handlePaste}
        disabled={chatStatus !== "Online"}
        aria-disabled={chatStatus !== "Online"}
      >
        <Clipboard />
        Paste
      </Button>
    </div>
  );
}

export { ChatActions };
