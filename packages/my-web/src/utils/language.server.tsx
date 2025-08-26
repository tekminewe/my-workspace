"use server";
import { headers } from "next/headers";

export const getLanguage = async () => {
  const h = await headers();
  return h.get("x-locale") ?? "en-US";
};
