import type { ChatbotMeta } from "@/lib/types";

export const chatbotMeta: ChatbotMeta = {
  model: "Gemini 2.5 Flash",
  agentType: "multi-agent",
  memory: "session",
  suggestedPrompts: [
    "What's your experience with LangChain?",
    "Show me a production AI project",
    "Are you available for new projects?",
    "What's your typical engagement model?",
    "Can you handle .NET stacks?",
  ],
};
