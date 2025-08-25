"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from '@apollo/client/link/context';

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  });

  // Create auth link to handle headers
  const authLink = setContext((_, { headers, ...context }) => {
    return {
      headers: {
        ...headers,
        // Merge context headers (like Accept-Language) with default headers
        ...context.headers,
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};
