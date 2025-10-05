import {
  getChatSession,
  useRecentChatSessions,
  type ChatSessionResponse,
} from "@/features/chat";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
function useConnectToChatSessionMutation(): UseMutationResult<
  ChatSessionResponse,
  Error,
  string
> {
  const { setRecentChatSessions } = useRecentChatSessions();

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
