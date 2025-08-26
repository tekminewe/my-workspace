import { SQSEvent } from "aws-lambda";
import { Api } from "./services/api";
import { EmailServiceProviderType, getAdapter } from "./adapters/adapter";

const Client = new Api({
  baseUrl: process.env.API_BASE_URL,
});

export const handler = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {
      console.log(record);
      const data = JSON.parse(record.body) as {
        provider: EmailServiceProviderType;
        body: object;
      };
      const adapter = getAdapter({
        provider: data.provider,
      });
      const message = adapter.formatEvent(data.body);
      await Client.s2S.updateEmailStatus({
        messageId: message.messageId,
        status: message.eventType,
      });
    }
  } catch (error) {
    console.error(error);
    // throw error;
  }
};
