import { PreSignUpTriggerEvent } from "aws-lambda";
import { Api } from "./utils/api";

const Client = new Api({
  baseUrl: process.env.API_BASE_URL,
});

export const handler = async (event: PreSignUpTriggerEvent) => {
  console.log("Processing event", event);
  try {
    const res = await Client.s2S.createUser({
      email: event.request.userAttributes.email,
      firstName: event.request.userAttributes.given_name,
      lastName: event.request.userAttributes.family_name,
      providerAccountId: event.userName,
    });
    if (!res.ok) {
      console.error(res.error);
      throw new Error("Failed to create user");
    }

    return {
      ...event,
      response: {
        autoConfirmUser: false, // Set to true if you want to auto-confirm users
        autoVerifyEmail: false, // Set to true if you want to auto-verify email
        autoVerifyPhone: false, // Set to true if you want to auto-verify phone
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
