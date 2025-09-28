import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  useConnectToChatSessionMutation,
  useRecentChatSessionsStorage,
} from "@/features/chat";
import { X } from "lucide-react";
import { useState } from "react";
import { RecentSessionCard } from "./RecentSession";

function HomeSidebar() {
  const { isMobile, setOpen, setOpenMobile } = useSidebar();
  const { recentChatSessions } = useRecentChatSessionsStorage();

  const [targetSessionUUID, setTargetSessionUUID] = useState<string | null>(
    null,
  );
  const { mutate, isPending } = useConnectToChatSessionMutation();

  return (
    <Sidebar>
      <SidebarHeader className="justify-between">
        <span className="font-semibold">Recent sessions</span>
        <Button
          className="size-7"
          variant="ghost"
          size="icon"
          onClick={() => (isMobile ? setOpenMobile(false) : setOpen(false))}
        >
          <X />
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {recentChatSessions.map((session) => (
          <RecentSessionCard
            isPending={isPending}
            session={session}
            targetSessionUUID={targetSessionUUID}
            mutate={mutate}
            setTargetSessionUUID={setTargetSessionUUID}
            key={session.uuid}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export { HomeSidebar };
