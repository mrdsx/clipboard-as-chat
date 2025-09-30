import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConnectToChatSessionMutation } from "@/features/chat";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";

function ConnectToSessionDialog() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useConnectToChatSessionMutation();

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    if (!inputRef.current || inputRef.current.value.trim().length === 0) return;

    mutate(inputRef.current.value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Connect to session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Enter the chat session UUID</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="link" className="sr-only">
            Session UUID
          </Label>
          <Input
            placeholder="Enter UUID..."
            ref={inputRef}
            disabled={isPending}
            aria-disabled={isPending}
          />
        </form>
        <DialogFooter className="sm:justify-between">
          <Button
            className="w-full"
            type="submit"
            onClick={handleSubmit}
            disabled={isPending}
            aria-disabled={isPending}
          >
            {isPending && <LoaderCircle className="animate-spin" />}
            {isPending ? "Connecting..." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConnectToSessionDialog };
