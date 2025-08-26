import { PreSignUpTriggerEvent } from "aws-lambda";
import { Api } from "./utils/api";

const Client = new Api({
  baseUrl: process.env.API_BASE_URL,
});

export const handler = async (event: PreSignUpTriggerEvent) => {
  console.log("Processing event", event);
  try {
    const res = await Client.s2S.verifyEmail({
      email: event.request.userAttributes.email,
    });

    if (!res.ok) {
      console.error(res.error);
      throw new Error("Failed to verify email");
    }

    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
