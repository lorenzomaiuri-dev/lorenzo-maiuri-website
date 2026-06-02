import type { ActionEventData } from "@/lib/types/chat-protocol";

type ActionHandlers = {
  openModal: () => void;
  router: { push: (href: string) => void };
};

export function executeAction(action: ActionEventData, handlers: ActionHandlers): void {
  switch (action.action_type) {
    case "open_contact_modal":
      handlers.openModal();
      break;

    case "scroll_to": {
      const selector = action.payload.selector;
      if (typeof selector === "string") {
        document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
      }
      break;
    }

    case "show_projects": {
      const filter = action.payload.filter;
      handlers.router.push(typeof filter === "string" ? `/work?category=${filter}` : "/work");
      break;
    }
  }
}
