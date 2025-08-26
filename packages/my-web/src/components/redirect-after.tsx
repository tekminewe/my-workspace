"use client";

import { useEffect } from "react";

export const RedirectAfter = ({
  url,
  delay,
}: {
  url: string;
  delay: number;
}) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(url);
    }, delay);
  }, [delay, url]);

  return null;
};
