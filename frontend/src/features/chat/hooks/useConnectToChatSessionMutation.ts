import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getChatSession } from "../services";
import type { ChatSessionResponse } from "../types";
import { useRecentChatSessionsStorage } from "./useRecentChatSessionsStorage";

function useConnectToChatSessionMutation(): UseMutationResult<
  ChatSessionResponse,
  Error,
  string
> {
  const { setRecentChatSessions } = useRecentChatSessionsStorage();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["connect_to_session"],
    mutationFn: getChatSession,
    onSuccess: ({ session_uuid }) => {
      navigate(`/chat/${session_uuid}`);
    },
    onError: (error: Error, sessionUUID) => {
      toast.error(error.message);
      setRecentChatSessions((prev) =>
        [...prev].filter((s) => s.uuid !== sessionUUID),
      );
    },
  });

  return mutation;
}

export { useConnectToChatSessionMutation };
