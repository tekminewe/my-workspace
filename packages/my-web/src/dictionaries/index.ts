import "server-only";
import en from "./en-US.json";

export type Dictionary = typeof en;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  "en-US": () => import("./en-US.json").then((module) => module.default),
  "en-MY": () => import("./en-MY.json").then((module) => module.default),
  "zh-MY": () => import("./zh-MY.json").then((module) => module.default),
};

export const getDictionary = async (language: string) =>
  dictionaries[language]();
