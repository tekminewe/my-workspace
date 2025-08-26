"use client";

import dayjs from "dayjs";
import { useEffect } from "react";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh";
import { ToastContainer } from "@tekminewe/mint-ui/toast";

export const ClientRoot = ({
  children,
  language,
}: {
  children: React.ReactNode;
  language: string;
}) => {
  useEffect(() => {
    dayjs.locale(language.toLowerCase());
    dayjs.extend(LocalizedFormat);
  }, [language]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
