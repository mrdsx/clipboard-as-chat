import { Skeleton } from "@/components/ui/skeleton";
import { ToggleThemeButton } from "@/features/theme";
import { cn } from "@/lib";
import { useChatContext } from "../ChatContextProvider";
import { getChatStatusStyles } from "../utils";
import { ShareSessionDialog } from "./ShareSessionDialog";

function ChatHeader() {
  const {
    chatStatus,
    chatSessionQuery: { data, isPending },
  } = useChatContext();
  const chatStatusStyles = getChatStatusStyles(chatStatus);

  return (
    <header className="flex justify-between px-4">
      <div className="flex items-center gap-8">
        <span className="flex items-center gap-2">
          <div className={cn("size-3 rounded-full", chatStatusStyles)}></div>
          {chatStatus}
        </span>
        {!isPending && chatStatus === "Online" && (
          <span className="hidden truncate sm:block sm:w-[40ch] md:w-[50ch] lg:w-[80ch]">
            {data?.session_name}
          </span>
        )}
      </div>

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
    </header>
  );
}

export { ChatHeader };
