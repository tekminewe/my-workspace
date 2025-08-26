"use client";

import { JSONContent } from "@tiptap/core";
import { RichTextEditor } from "../rich-text-editor";

export interface RichTextPreviewProps {
  content: JSONContent;
}

export const RichTextPreview = ({ content }: RichTextPreviewProps) => {
  return (
    <RichTextEditor
      content={content}
      editable={false}
      containerClassName="p-0"
    />
  );
};
