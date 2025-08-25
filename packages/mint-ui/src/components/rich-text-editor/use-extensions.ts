"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { AnyExtension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { Figure } from "./figure-extensions";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import Link from "@tiptap/extension-link";
import css from "highlight.js/lib/languages/css";
import ts from "highlight.js/lib/languages/typescript";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import makefile from "highlight.js/lib/languages/makefile";
import nginx from "highlight.js/lib/languages/nginx";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import go from "highlight.js/lib/languages/go";
import dts from "highlight.js/lib/languages/dts";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";

const lowlight = createLowlight();
lowlight.register("ts", ts);
lowlight.register("js", js);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("yaml", yaml);
lowlight.register("markdown", markdown);
lowlight.register("makefile", makefile);
lowlight.register("nginx", nginx);
lowlight.register("json", json);
lowlight.register("kotlin", kotlin);
lowlight.register("go", go);
lowlight.register("dts", dts);
lowlight.register("scss", scss);
lowlight.register("bash", shell);

export const useExtensions = ({
  defaultPlaceholder,
}: {
  defaultPlaceholder: string;
}) => {
  return useMemo(
    () => [
      StarterKit.configure({
        codeBlock: false,
      }) as AnyExtension,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `Heading ${node.attrs.level - 1}`;
          }

          return defaultPlaceholder;
        },
      }) as AnyExtension,
      Figure as AnyExtension,
      CodeBlockLowlight.configure({
        lowlight,
      }) as AnyExtension,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: [
          "mailto",
          {
            scheme: "tel",
            optionalSlashes: true,
          },
        ],
      }),
    ],
    [defaultPlaceholder]
  );
};
