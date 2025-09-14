import type { MessageResponse } from "@/features/message";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function useChatMessagesQuery(sessionUUID: string | undefined) {
  const query = useQuery({
    queryKey: ["messages"],
    queryFn: async ({ signal }) => {
      return apiFetch<MessageResponse[]>(`/chat/${sessionUUID}/messages`, {
        requestInit: { signal },
      });
    },
    retry: false,
  });

  return query;
}

export { useChatMessagesQuery };
