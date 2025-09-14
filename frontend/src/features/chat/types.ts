type ChatSessionUUIDResponse = {
  session_uuid: string;
};

type ChatStatus = "Online" | "Offline" | "Pending";

type CreateChatSession = {
  session_name: string;
  password: string | null;
  expires_in: ExpirationTime;
};

type ExpirationTime = "15m" | "1h" | "6h" | "24h";

export type {
  ChatSessionUUIDResponse,
  ChatStatus,
  CreateChatSession,
  ExpirationTime,
};
