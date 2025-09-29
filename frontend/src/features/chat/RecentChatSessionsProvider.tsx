import { createContext, useContext } from "react";
import {
  useRecentChatSessionsStorage,
  type UseRecentChatSessionsStorageProps,
} from "./hooks";

type RecentChatSessionsContextType = UseRecentChatSessionsStorageProps;

const RecentChatSessionsContext =
  createContext<RecentChatSessionsContextType | null>(null);

function RecentChatSessionsContextProvider({
  children,
}: React.PropsWithChildren) {
  const recentChatSessionsStorage = useRecentChatSessionsStorage();

  return (
    <RecentChatSessionsContext.Provider value={recentChatSessionsStorage}>
      {children}
    </RecentChatSessionsContext.Provider>
  );
}

function useRecentChatSessionsContext() {
  const context = useContext(RecentChatSessionsContext);
  if (context === null) {
    throw new Error(
      "useRecentChatSessionsContext must be used inside RecentChatSessionsContextProvider",
    );
  }

  return context;
}

export { RecentChatSessionsContextProvider, useRecentChatSessionsContext };
