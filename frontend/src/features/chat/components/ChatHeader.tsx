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
      {chatStatus && (
        <span className="flex items-center gap-2">
          <div className={cn("size-3 rounded-full", chatStatusStyles)}></div>
          {chatStatus}
        </span>
      )}
      <div className="flex gap-2">
        <ShareSessionDialog />
        <ToggleThemeButton />
      </div>
    </div>
  );
}

export { ChatHeader };
