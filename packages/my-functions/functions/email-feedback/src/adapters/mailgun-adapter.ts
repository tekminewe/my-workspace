import { EmailEvent } from "../services/event";
import { EmailEventAdapter } from "./adapter";

export type MailgunEventType =
  | "delivered"
  | "complained"
  | "failed"
  | "accepted"
  | "rejected";

export type MailgunEvent = {
  "event-data": {
    event: MailgunEventType;
    timestamp: number;
    id: string;
    severity: "temporary" | "permanent";
  };
};

export class MailgunEventAdapter implements EmailEventAdapter {
  formatEvent(event: object): EmailEvent {
    console.log(event);
    const mailgunEvent = event as MailgunEvent;
    return {
      messageId: mailgunEvent["event-data"].id,
      eventType: this.mapEventType(mailgunEvent),
    };
  }

  private mapEventType(event: MailgunEvent): EmailEvent["eventType"] {
    switch (event["event-data"].event) {
      case "accepted":
        return "ACCEPTED";
      case "delivered":
        return "DELIVERED";
      case "complained":
        return "COMPLAINT";
      case "failed":
        return "FAILED";
      case "rejected":
        return "REJECTED";
      default:
        throw new Error("Invalid event type");
    }
  }
}
