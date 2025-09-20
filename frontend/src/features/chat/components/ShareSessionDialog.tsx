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
import { useChatContext } from "@/features/chat";
import { Link2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

function ShareSessionDialog() {
  const { sessionUUID } = useChatContext();
  const sessionURL = `${import.meta.env.VITE_BASE_URL}/chat/${sessionUUID}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Link2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view chat history.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-(--radius) bg-white p-2">
            <QRCodeSVG value={sessionURL} />
          </div>
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input id="link" value={sessionURL} readOnly />
        </div>
        <DialogFooter className="sm:justify-start">
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

export { ShareSessionDialog };
