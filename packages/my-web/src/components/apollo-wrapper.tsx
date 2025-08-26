"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { createApolloClient } from "../services/apollo-client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
