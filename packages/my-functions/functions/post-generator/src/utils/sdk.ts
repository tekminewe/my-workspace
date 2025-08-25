import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Sha256 } from "@aws-crypto/sha256-js";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql";

export const getSignedHeaders = async (endpoint: string, body: string) => {
  const url = new URL(endpoint);

  const host = url.host;
  const params = {
    method: "POST",
    protocol: url.protocol,
    hostname: host,
    path: url.pathname,
    headers: {
      "content-type": "application/json",
      host,
    },
    body,
  };

  const region = process.env.AWS_REGION || "ap-southeast-1";
  const request = new HttpRequest(params);
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region,
    service: "execute-api",
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);
  return signedRequest.headers;
};

export const getGraphQLClient = () => {
  const endpoint = `${process.env.API_BASE_URL}/graphql`;
  const client = new GraphQLClient(endpoint);
  const sdk = getSdk(client);
  return { client, sdk, endpoint };
};
