"use client";

import { usePathname } from "next/navigation";

export const useClientLanguage = () => {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];

  return lang;
};
