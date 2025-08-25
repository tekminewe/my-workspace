import { EmailEvent } from "../services/event";
import { MailgunEventAdapter } from "./mailgun-adapter";
import { SesEventAdapter } from "./ses-adapter";

export interface EmailEventAdapter {
  formatEvent(event: object): EmailEvent;
}

export type EmailServiceProviderType = "ses" | "mailgun";

export const getAdapter = ({
  provider,
}: {
  provider: EmailServiceProviderType;
}) => {
  switch (provider) {
    case "ses":
      return new SesEventAdapter();

    case "mailgun":
      return new MailgunEventAdapter();

    default:
      throw new Error("Invalid provider");
  }
};
