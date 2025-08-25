"use client";

import { ReactNode, useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { signIn, useSession } from "next-auth/react";
import { fetcher } from "@/utils/request";

export const defaultHeaders: HeadersInit = {};

export const useQuery = (url: string) => useSWR(url, fetcher);

export const useMutation = <T, D>(
  url: string,
  method: (arg: { url: string; body: D; headers: HeadersInit }) => Promise<T>
) =>
  useSWRMutation(url, (url: string, { arg }: { arg: D }) =>
    method({ url, body: arg, headers: defaultHeaders })
  );

export const AccessTokenProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  defaultHeaders["Authorization"] = `Bearer ${value}`;
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("cognito");
    }
  }, [session?.error]);

  return children;
};
