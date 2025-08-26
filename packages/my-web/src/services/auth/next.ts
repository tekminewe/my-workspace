import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

export const {
  handlers: nextAuthHandlers,
  auth: getSessionServer,
  signOut: signOutWithNextAuth,
} = NextAuth({
  providers: [Cognito],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt(args) {
      const { token, account } = args;
      // First login, save the `access_token`, `refresh_token`, and other
      if (account) {
        return {
          ...token,
          sub: account.providerAccountId,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
        // @ts-ignore
      } else if (Date.now() < token.expiresAt * 1000) {
        return token;
      } else {
        if (!token.refreshToken) {
          throw new Error("Missing refresh token");
        }

        try {
          const secretHash = Base64.stringify(
            hmacSHA256(
              `${token.sub}${process.env.AUTH_COGNITO_ID}`,
              process.env.AUTH_COGNITO_SECRET ?? ""
            )
          );
          const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
              REFRESH_TOKEN: `${token.refreshToken}`,
              SECRET_HASH: secretHash,
            },
            ClientId: process.env.AUTH_COGNITO_ID ?? "",
          });
          const client = new CognitoIdentityProviderClient({
            region: process.env.AUTH_COGNITO_REGION,
          });
          const response = await client.send(command);
          token.accessToken = response.AuthenticationResult?.AccessToken;
          token.expiresAt = Math.floor(
            Date.now() / 1000 + (response.AuthenticationResult?.ExpiresIn ?? 0)
          );
          return token;
        } catch (e) {
          console.error(e);
          token.error = "RefreshAccessTokenError";
          return token;
        }
      }
    },
    async session(args) {
      const { session, token } = args;
      session.user.providerAccountId = token.sub ?? "";
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.error = token.error;

      return session;
    },
  },
});
