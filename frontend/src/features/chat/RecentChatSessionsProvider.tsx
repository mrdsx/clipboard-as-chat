import { createContext, useContext } from "react";
import {
  useRecentChatSessionsStorage,
  type UseRecentChatSessionsStorageProps,
} from "./hooks";

const RecentChatSessionsContext =
  createContext<UseRecentChatSessionsStorageProps | null>(null);

function RecentChatSessionsProvider({ children }: React.PropsWithChildren) {
  const recentChatSessionsStorage = useRecentChatSessionsStorage();

  return (
    <RecentChatSessionsContext.Provider value={recentChatSessionsStorage}>
      {children}
    </RecentChatSessionsContext.Provider>
  );
}

function useRecentChatSessions() {
  const context = useContext(RecentChatSessionsContext);
  if (context === null) {
    throw new Error(
      "useRecentChatSessions must be used inside RecentChatSessionsProvider",
    );
  }

  return context;
}

export { RecentChatSessionsProvider, useRecentChatSessions };
