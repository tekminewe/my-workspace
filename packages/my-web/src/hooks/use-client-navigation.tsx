"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useClientLanguage } from "./use-language";

export const useClientNavigation = () => {
  const router = useRouter();
  const language = useClientLanguage();

  const push = useCallback(
    (...args: Parameters<typeof router.push>) => {
      const [url, ...otherArgs] = args;
      router.push(`/${language}${url}`, ...otherArgs);
    },
    [router, language]
  );

  return { push };
};
