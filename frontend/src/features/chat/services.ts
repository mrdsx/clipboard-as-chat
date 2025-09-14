import { apiFetch } from "@/lib/api";
import type { ChatSessionUUIDResponse, CreateChatSession } from "./types";

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

export { postChatSession };
