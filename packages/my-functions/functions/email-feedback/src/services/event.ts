import { UpdateEmailStatusDto } from "./api";

export interface EmailEvent {
  messageId: string;
  eventType: UpdateEmailStatusDto["status"];
}
