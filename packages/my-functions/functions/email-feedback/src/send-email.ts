import { SQSEvent } from "aws-lambda";
import { Api, SendEmailDto } from "./services/api";

const Client = new Api({
  baseUrl: process.env.API_BASE_URL,
});

export const handler = async (event: SQSEvent) => {
  console.log("Processing event", event);
  try {
    for (const record of event.Records) {
      const body: SendEmailDto = JSON.parse(record.body);
      console.log("Processing email", body);
      const res = await Client.s2S.processEmailQueue(body);
      if (!res.ok) {
        console.error("Failed to send email", res);
        throw res.error;
      }
      console.log("Email sent", res.data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
