import { Button } from "@/components/ui/button";
import { SidebarGroup } from "@/components/ui/sidebar";
import {
  type ChatSessionResponse,
  type RecentChatSession,
} from "@/features/chat";
import type { ReactSetState } from "@/lib";
import type { UseMutateFunction } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

type RecentSessionCardProps = {
  isPending: boolean;
  session: RecentChatSession;
  targetSessionUUID: string | null;
  mutate: UseMutateFunction<ChatSessionResponse, Error, string, unknown>;
  setTargetSessionUUID: ReactSetState<string | null>;
};

function RecentSessionCard({
  isPending,
  session,
  targetSessionUUID,
  mutate,
  setTargetSessionUUID,
}: RecentSessionCardProps) {
  function handleConnectToChatSession(): void {
    setTargetSessionUUID(session.uuid);
    mutate(session.uuid);
  }

  return (
    <SidebarGroup className="space-y-4 rounded-md border-1">
      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
        {session.name}
      </span>
      <Button
        onClick={handleConnectToChatSession}
        disabled={isPending}
        aria-disabled={isPending}
      >
        {isPending && session.uuid === targetSessionUUID ? (
          <>
            <LoaderCircle className="animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect"
        )}
      </Button>
    </SidebarGroup>
  );
}

export { RecentSessionCard };
