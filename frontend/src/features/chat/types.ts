type ChatSessionResponse = {
  id: number;
  session_uuid: string;
  session_name: string;
  created_at: string;
  expires_at: string;
};

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

type RecentChatSession = {
  name: string;
  uuid: string;
  lastConnectionTime: string;
};

export type {
  ChatSessionResponse,
  ChatSessionUUIDResponse,
  ChatStatus,
  CreateChatSession,
  ExpirationTime,
  RecentChatSession,
};
