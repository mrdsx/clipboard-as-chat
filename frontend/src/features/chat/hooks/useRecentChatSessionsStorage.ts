import type { ReactSetState } from "@/lib";
import { useEffect, useState } from "react";
import type { RecentChatSession } from "../types";

type UseRecentChatSessionsStorageProps = {
  recentChatSessions: RecentChatSession[];
  setRecentChatSessions: ReactSetState<RecentChatSession[]>;
};

const LOCAL_STORAGE_KEY = "recent-chat-sessions";
const RECENT_SESSIONS_MAX_LENGTH = 10;

function useRecentChatSessionsStorage(): UseRecentChatSessionsStorageProps {
  const [recentChatSessions, setRecentChatSessions] = useState<
    RecentChatSession[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (recentChatSessions.length > RECENT_SESSIONS_MAX_LENGTH) {
      setRecentChatSessions((prev) =>
        [...prev].slice(0, RECENT_SESSIONS_MAX_LENGTH),
      );
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentChatSessions));
  }, [recentChatSessions]);

  return { recentChatSessions, setRecentChatSessions };
}

export { useRecentChatSessionsStorage, type UseRecentChatSessionsStorageProps };
