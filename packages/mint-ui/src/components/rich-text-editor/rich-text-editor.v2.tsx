'use client';

import {
  FloatingMenu,
  JSONContent,
  useEditor,
  EditorContent,
  Editor,
} from '@tiptap/react';
import styles from './rich-text-editor.module.scss';
import './atom-one-dark.min.css';
import { NodeCommand, OnItemClickHandler } from './node-command';
import { useDebouncedCallback } from 'use-debounce';
import { useExtensions } from './use-extensions';
import { LinkBubbleMenu } from './link-bubble-menu';
import { cn } from '../utils';
import { FigureBubbleMenu } from './figure-bubble-menu';

export type OnChangeHandler = (params: { content: JSONContent }) => void;

export interface RichTextEditorProps {
  /**
   * The content of the editor.
   * @example { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello!" }] }] }
   */
  content?: JSONContent;

  /**
   * The placeholder text to show when the editor is empty.
   * @default "Write something..."
   * @example "Write a blog post..."
   */
  placeholder?: string;

  /**
   * Callback function that is called when the editor content changes.
   * @example ({ content }) => console.log(content)
   */
  onChange?: OnChangeHandler;

  /**
   * The time to delay in miliseconds before callback for updating the editor content
   * @default 2000
   * @example 5000
   */
  changeDelay?: number;

  /**
   * The maximum time to delay in miliseconds before callback for updating the editor content
   * @example 5000
   * @default 10000
   */
  maxChangeDelay?: number;

  /**
   * Callback function that is called when an image is uploaded.
   * @param file
   * @returns
   */
  onImageUpload?: (file: File) => Promise<{ src: string; caption?: string }>;

  /**
   * Whether the editor is editable or not.
   * @default true
   * @example false
   */
  editable?: boolean;

  /**
   * Additional class name for the container.
   * @example "my-custom-class"
   * @default ""
   */
  containerClassName?: string;
}

export const RichTextEditor = ({
  onChange,
  maxChangeDelay = 5000,
  changeDelay = 2000,
  content,
  placeholder = 'Write something...',
  onImageUpload,
  editable = true,
  containerClassName = '',
}: RichTextEditorProps) => {
  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: { editor: Editor }) => {
      const content = editor.getJSON();
      onChange?.({ content });
    },
    changeDelay,
    { maxWait: maxChangeDelay },
  );

  const extensions = useExtensions({ defaultPlaceholder: placeholder });
  const editor = useEditor({
    onUpdate: debouncedUpdates,
    extensions,
    content,
    immediatelyRender: false,
    editable,
  });

  const handleItemClick: OnItemClickHandler = ({ id }) => {
    if (!editor) {
      return;
    }
    switch (id) {
      case 'heading-1':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'heading-2':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'heading-3':
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case 'image': {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0];
            try {
              const { src } = (await onImageUpload?.(file)) ?? {
                src: undefined,
              };
              if (!src) {
                return;
              }
              editor.chain().focus().setFigure({ src, caption: '' }).run();
            } catch (e) {
              console.error(e);
              // Silent error
            }
          }
        };
        input.click();
        break;
      }
      case 'code-block':
        editor.chain().focus().toggleCodeBlock().run();
        break;
    }
  };

  return (
    <div className={cn(styles.rte, 'p-8', containerClassName)}>
      <EditorContent
        className={'prose prose-figcaption:text-center'}
        editor={editor}
      />
      <FloatingMenu
        shouldShow={({ editor, state }) => {
          return (
            editor.isActive('paragraph') &&
            state.selection.$from.node().textContent.length === 0
          );
        }}
        editor={editor}
        tippyOptions={{ duration: 250, placement: 'top-start' }}
      >
        <NodeCommand onItemClick={handleItemClick} />
      </FloatingMenu>
      {editor && editable && <LinkBubbleMenu editor={editor} />}
      {editor && editable && <FigureBubbleMenu editor={editor} />}
    </div>
  );
};
