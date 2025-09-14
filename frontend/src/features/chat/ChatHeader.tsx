import { ToggleThemeButton } from "@/features/theme";
import { cn } from "@/lib";
import { useChatContext } from "./ChatContextProvider";
import { getChatStatusStyles } from "./utils";

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
      <ToggleThemeButton />
    </div>
  );
}

export { ChatHeader };
