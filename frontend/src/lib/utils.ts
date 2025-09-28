import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function getIsScrolledToBottom(element: HTMLElement): boolean {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= 1;
}

function scrollToBottom(element: HTMLElement | null): void {
  element?.scrollIntoView({ behavior: "smooth", block: "end" });
}

export { cn, getIsScrolledToBottom, scrollToBottom };
