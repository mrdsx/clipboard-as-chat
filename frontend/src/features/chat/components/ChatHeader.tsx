import { Skeleton } from "@/components/ui/skeleton";
import { ToggleThemeButton } from "@/features/theme";
import { cn } from "@/lib";
import { useChatContext } from "../ChatContextProvider";
import { getChatStatusStyles } from "../utils";
import { ShareSessionDialog } from "./ShareSessionDialog";

function ChatHeader() {
  const { chatStatus } = useChatContext();
  const chatStatusStyles = getChatStatusStyles(chatStatus);

  return (
    <div className="flex justify-between px-4 pb-4">
      <span className="flex items-center gap-2">
        <div className={cn("size-3 rounded-full", chatStatusStyles)}></div>
        {chatStatus}
      </span>

      <div className="flex items-center gap-2">
        {chatStatus === "Online" ? (
          <>
            <ShareSessionDialog />
            <ToggleThemeButton />
          </>
        ) : (
          <>
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </>
        )}
      </div>
    </div>
  );
}

export { ChatHeader };
