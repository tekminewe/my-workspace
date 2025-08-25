'use client';

import { BubbleMenu, Editor } from '@tiptap/react';
import { Button } from '../button';
import { DialogRoot, DialogTrigger, DialogClose } from '../dialog';
import { TextInput } from '../text-input';
import { useState } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { SURFACE_COLORS, BORDER_COLORS } from '../utils/component-colors';

interface FigureBubbleMenuProps {
  editor: Editor;
}

export const FigureBubbleMenu = ({ editor }: FigureBubbleMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor }) => {
          return editor.isActive('figure');
        }}
      >
        <DialogRoot open={open} onOpenChange={setOpen}>
          <div
            className={`shadow-lg p-1 space-x-1 rounded-lg ${SURFACE_COLORS.surfaceElevated} ${BORDER_COLORS.default}`}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                Details
              </Button>
            </DialogTrigger>
          </div>
          <RadixDialog.Portal>
            <RadixDialog.Overlay className="fixed inset-0 bg-black/50 z-[99998]" />
            <RadixDialog.Content
              className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-6 rounded-lg shadow-xl max-w-md w-full z-[99999] space-y-4 ${SURFACE_COLORS.surfaceElevated}`}
            >
              <RadixDialog.Title className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
                Image Details
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-neutral-600 dark:text-neutral-700">
                Update the details of the image.
              </RadixDialog.Description>
              <img
                src={editor.getAttributes('figure').src}
                alt="Preview"
                className="max-w-full h-auto rounded"
              />
              <TextInput
                label="Title"
                value={editor.getAttributes('figure').title || ''}
                onChange={(e) => {
                  editor.commands.updateAttributes('figure', {
                    title: e.target.value,
                  });
                }}
              />
              <TextInput
                label="Alt text"
                value={editor.getAttributes('figure').alt || ''}
                onChange={(e) => {
                  editor.commands.updateAttributes('figure', {
                    alt: e.target.value,
                  });
                }}
              />
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="ghost">Close</Button>
                </DialogClose>
              </div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        </DialogRoot>
      </BubbleMenu>
    </>
  );
};
