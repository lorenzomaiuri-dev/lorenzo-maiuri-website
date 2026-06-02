import type { Metadata } from "next";
import ChatApp from "@/components/chat/ChatApp";

export const metadata: Metadata = {
  title: "Chat — Lorenzo Maiuri",
  description:
    "LorenzoBot — AI assistant trained on my work, stack, and approach. Ask about projects, availability, or how I approach a problem.",
  alternates: { canonical: "https://lorenzomaiuri.dev/chat" },
};

export default function ChatPage() {
  return <ChatApp />;
}
