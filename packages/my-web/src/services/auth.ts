"use server";

import { notFound } from "next/navigation";
import { getSessionServer, signOutWithNextAuth } from "./auth/next";

export const signOut = async () => signOutWithNextAuth();

export const getCurrentUser = async () => {
  const session = await getSessionServer();
  if (!session?.user) {
    return notFound();
  }

  return session.user;
};
