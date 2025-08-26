"use server";

import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

export const isMobile = async () => {
  const headersList = await headers();
  const userAgentString = headersList.get("user-agent");
  const agent = userAgentFromString(userAgentString ?? "");

  return agent.device.type === "mobile";
};
