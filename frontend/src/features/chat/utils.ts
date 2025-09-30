import type { ChatStatus } from "./types";

const chatStatusStyles: Record<ChatStatus, string> = {
  Online: "bg-green-500",
  Offline: "bg-red-500",
  Pending: "bg-yellow-500",
};

function getChatStatusStyles(status: ChatStatus): string {
  return chatStatusStyles[status];
}

export { getChatStatusStyles };
