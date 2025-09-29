import { useChatContext, useRecentChatSessionsContext } from "@/features/chat";
import { useEffect } from "react";

function ChatContainer({ children }: React.PropsWithChildren) {
  const {
    chatSessionQuery: { data: chatSession },
  } = useChatContext();
  const { recentChatSessions, setRecentChatSessions } =
    useRecentChatSessionsContext();

  useEffect(handleUpdateRecentChatSessions, [chatSession]);

  function handleUpdateRecentChatSessions(): void {
    if (!chatSession) return;

    const isRecentSession = recentChatSessions.find(
      (session) => session.uuid === chatSession.session_uuid,
    );

    if (isRecentSession) {
      setRecentChatSessions((prev) =>
        [...prev].filter((s) => s.uuid !== chatSession.session_uuid),
      );
    }
    setRecentChatSessions((prev) => [
      {
        name: chatSession.session_name,
        uuid: chatSession.session_uuid,
        lastConnectionTime: String(Date.now()),
      },
      ...prev,
    ]);
  }

  return (
    <div className="flex h-screen flex-col justify-between gap-4 p-6">
      {children}
    </div>
  );
}

export { ChatContainer };
