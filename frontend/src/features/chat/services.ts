import { apiFetch } from "@/lib/api";
import type {
  ChatSessionResponse,
  ChatSessionUUIDResponse,
  CreateChatSession,
} from "./types";

async function getChatSession(
  sessionUUID: ChatSessionResponse["session_uuid"],
): Promise<ChatSessionResponse> {
  return await apiFetch(`/chat/${sessionUUID}`, {
    errorMessage: "Chat session doesn't exist or has expired",
  });
}

function postChatSession(
  payload: CreateChatSession,
): Promise<ChatSessionUUIDResponse> {
  return apiFetch<ChatSessionUUIDResponse>("/chat", {
    requestInit: {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
    errorMessage: "Failed to create chat session",
  });
}

export { getChatSession, postChatSession };
