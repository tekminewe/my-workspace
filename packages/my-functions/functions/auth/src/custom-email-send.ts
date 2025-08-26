import { CustomEmailSenderTriggerEvent } from "aws-lambda";
import { Api } from "./utils/api";

const Client = new Api({
  baseUrl: process.env.API_BASE_URL,
});

export const handler = async (event: CustomEmailSenderTriggerEvent) => {
  console.log("Processing event", event);

  if (
    event.triggerSource === "CustomEmailSender_SignUp" ||
    event.triggerSource === "CustomEmailSender_ResendCode"
  ) {
    const { request } = event;
    const { userAttributes, code } = request;
    const { email, sub } = userAttributes;

    const res = await Client.s2S.sendUserSignUpWelcomeEmail({
      email,
      providerAccountId: sub,
      encryptedCode: code ?? "",
    });
    if (!res.ok) {
      console.error(res.error);
      throw new Error("Failed to send user sign up email");
    }
  } else if (event.triggerSource === "CustomEmailSender_ForgotPassword") {
    const { request } = event;
    const { userAttributes, code } = request;
    const { email, sub } = userAttributes;

    const res = await Client.s2S.sendForgotPasswordEmail({
      email,
      providerAccountId: sub,
      encryptedCode: code ?? "",
    });
    if (!res.ok) {
      console.error(res.error);
      throw new Error("Failed to send forgot password email");
    }
  } else {
    throw new Error("Not implemented");
  }

  return;
};
