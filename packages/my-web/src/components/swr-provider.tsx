"use client";

import { SWRConfig } from "swr";

export const SwrProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) => {
  return <SWRConfig value={value}>{children}</SWRConfig>;
};
