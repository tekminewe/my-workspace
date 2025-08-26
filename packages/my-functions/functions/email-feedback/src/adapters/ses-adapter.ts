import { EmailEvent } from "../services/event";
import { EmailEventAdapter } from "./adapter";

export type SesEvent =
  | {
      eventType: "Bounce";
      bounce: {
        bounceType: string;
      };
      mail: {
        commonHeaders: {
          messageId: string;
        };
      };
    }
  | {
      eventType: "Complaint";
      mail: {
        commonHeaders: {
          messageId: string;
        };
      };
    }
  | {
      eventType: "Delivery";
      mail: {
        commonHeaders: {
          messageId: string;
        };
      };
    }
  | {
      eventType: "Send";
      mail: {
        commonHeaders: {
          messageId: string;
        };
      };
    }
  | {
      eventType: "Reject";
      mail: {
        commonHeaders: {
          messageId: string;
        };
      };
    };

export class SesEventAdapter implements EmailEventAdapter {
  formatEvent(event: object): EmailEvent {
    const sesEvent = event as SesEvent;
    return {
      messageId: sesEvent.mail.commonHeaders.messageId,
      eventType: this.mapEventType(sesEvent),
    };
  }

  private mapEventType(event: SesEvent): EmailEvent["eventType"] {
    switch (event.eventType) {
      case "Send":
        return "ACCEPTED";
      case "Bounce": {
        if (event.bounce.bounceType === "Transient") {
          return "SOFT_BOUNCED";
        }
        return "BOUNCED";
      }
      case "Complaint":
        return "COMPLAINT";
      case "Delivery":
        return "DELIVERED";
      case "Reject":
        return "REJECTED";
      default:
        throw new Error("Unknown event type");
    }
  }
}
