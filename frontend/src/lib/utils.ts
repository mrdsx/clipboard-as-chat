import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function scrollToBottom(element: HTMLElement | null): void {
  element?.scrollIntoView({ behavior: "smooth", block: "end" });
}

export { cn, scrollToBottom };
