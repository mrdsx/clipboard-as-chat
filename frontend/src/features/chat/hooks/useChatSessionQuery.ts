import { useQuery } from "@tanstack/react-query";
import { getChatSession } from "../services";
import type { ChatSessionResponse } from "../types";

function useChatSessionQuery(sessionUUID: ChatSessionResponse["session_uuid"]) {
  const query = useQuery({
    queryKey: ["get_chat_session"],
    queryFn: () => getChatSession(sessionUUID),
  });

  return query;
}

export { useChatSessionQuery };
