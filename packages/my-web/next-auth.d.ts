import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      providerAccountId: string;
    } & DefaultSession["user"];
    accessToken: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    error?: "RefreshAccessTokenError";
  }
}
