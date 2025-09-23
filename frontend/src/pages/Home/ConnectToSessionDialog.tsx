import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getChatSession } from "@/features/chat";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function ConnectToSessionDialog() {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["connect_to_session"],
    mutationFn: getChatSession,
    onSuccess: ({ session_uuid }) => {
      navigate(`/chat/${session_uuid}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
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
            type="submit"
            onClick={handleSubmit}
            disabled={isPending}
            aria-disabled={isPending}
          >
            {isPending && <LoaderCircle className="animate-spin" />}
            Connect
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConnectToSessionDialog };
