'use client';

import { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import Link from '@tiptap/extension-link';
import { Figure } from '../rich-text-editor/figure-extensions';
import css from 'highlight.js/lib/languages/css';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import makefile from 'highlight.js/lib/languages/makefile';
import nginx from 'highlight.js/lib/languages/nginx';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import go from 'highlight.js/lib/languages/go';
import dts from 'highlight.js/lib/languages/dts';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
import { useMemo } from 'react';
import { cn } from '../utils';

// Setup lowlight for code syntax highlighting
const lowlight = createLowlight();
lowlight.register('ts', ts);
lowlight.register('js', js);
lowlight.register('css', css);
lowlight.register('html', html);
lowlight.register('yaml', yaml);
lowlight.register('markdown', markdown);
lowlight.register('makefile', makefile);
lowlight.register('nginx', nginx);
lowlight.register('json', json);
lowlight.register('kotlin', kotlin);
lowlight.register('go', go);
lowlight.register('dts', dts);
lowlight.register('scss', scss);
lowlight.register('bash', shell);

export interface RichTextPreviewPlainProps {
  /**
   * The JSON content to render as HTML.
   * @example { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello!" }] }] }
   */
  content: JSONContent;

  /**
   * Additional CSS class names to apply to the container.
   * @example "p-4 bg-white rounded-lg"
   */
  className?: string;
}

/**
 * A plain HTML preview component for rich text content that uses Tiptap's generateHTML utility
 * to convert JSON content to HTML and renders it using dangerouslySetInnerHTML.
 *
 * This component is useful when you need a lightweight HTML rendering without the full editor
 * functionality, such as in emails, PDFs, or static content displays.
 */
export const RichTextPreviewPlain = ({
  content,
  className,
}: RichTextPreviewPlainProps) => {
  // Define extensions that match the editor configuration
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        codeBlock: false,
      }),
      Figure,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: [
          'mailto',
          {
            scheme: 'tel',
            optionalSlashes: true,
          },
        ],
      }),
    ],
    [],
  );

  // Generate HTML from JSON content using Tiptap's generateHTML utility
  const htmlContent = useMemo(() => {
    try {
      return generateHTML(content, extensions);
    } catch (error) {
      console.error('Failed to generate HTML from content:', error);
      return '<p>Error rendering content</p>';
    }
  }, [content, extensions]);

  return (
    <div
      className={cn(
        // Base styles for rich text content display
        'prose prose-neutral dark:prose-invert max-w-none',
        // Text and heading styles
        'prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100',
        'prose-p:text-neutral-700 dark:prose-p:text-neutral-300',
        // Link styles
        'prose-a:text-primary-600 dark:prose-a:text-primary-400',
        'prose-a:no-underline hover:prose-a:underline',
        // Code styles
        'prose-code:text-neutral-800 dark:prose-code:text-neutral-200',
        'prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800',
        'prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        // Pre/code block styles
        'prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950',
        'prose-pre:text-neutral-100',
        // List styles
        'prose-ul:text-neutral-700 dark:prose-ul:text-neutral-300',
        'prose-ol:text-neutral-700 dark:prose-ol:text-neutral-300',
        'prose-li:text-neutral-700 dark:prose-li:text-neutral-300',
        // Quote styles
        'prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-400',
        'prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-700',
        // Table styles
        'prose-table:text-neutral-700 dark:prose-table:text-neutral-300',
        'prose-thead:text-neutral-900 dark:prose-thead:text-neutral-100',
        'prose-th:border-neutral-300 dark:prose-th:border-neutral-700',
        'prose-td:border-neutral-300 dark:prose-td:border-neutral-700',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
