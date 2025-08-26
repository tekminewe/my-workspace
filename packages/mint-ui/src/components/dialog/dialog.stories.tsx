import { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, DialogRoot, DialogTrigger, DialogClose } from './dialog';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useCallback, useState } from 'react';
import { TextInput } from '../text-input';
import { Button } from '../button';
import { DialogFooter } from './dialog-footer';
import { LuX } from 'react-icons/lu';

const meta = {
  title: 'Common / Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dialog
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <DialogRoot open>
          <Dialog container={ref}>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
                Basic Dialog
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-muted-foreground">
                This is a basic dialog with title and description.
              </RadixDialog.Description>
            </div>
            <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <LuX className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </RadixDialog.Close>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Simple dialog content goes here.
            </p>
          </Dialog>
        </DialogRoot>
      </div>
    );
  },
};

// Dialog with Form
export const WithForm: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <DialogRoot open>
          <Dialog container={ref}>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
                Reset Password
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-muted-foreground">
                Enter your email to receive password reset instructions.
              </RadixDialog.Description>
            </div>
            <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <LuX className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </RadixDialog.Close>
            <form className="space-y-4">
              <TextInput
                id="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <DialogFooter>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Send Reset Link</Button>
              </DialogFooter>
            </form>
          </Dialog>
        </DialogRoot>
      </div>
    );
  },
};

// Dialog with Long Content (demonstrates height constraints)
export const WithLongContent: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    const longContent = Array.from({ length: 50 }, (_, i) => (
      <p
        key={i}
        className="text-sm text-neutral-600 dark:text-neutral-400 mb-2"
      >
        This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    ));

    return (
      <div ref={callbackRef}>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button>Open Long Content Dialog</Button>
          </DialogTrigger>
          <Dialog container={ref}>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
                Dialog with Long Content
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-muted-foreground">
                This dialog has a lot of content to demonstrate height
                constraints (max 80vh on desktop, full height on mobile).
              </RadixDialog.Description>
            </div>
            <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <LuX className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </RadixDialog.Close>
            <div className="overflow-y-auto flex-1 pr-2">{longContent}</div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </Dialog>
        </DialogRoot>
      </div>
    );
  },
};

// Interactive Dialog with Trigger
export const Interactive: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <Dialog container={ref}>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
                Interactive Dialog
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-muted-foreground">
                This dialog can be opened and closed interactively.
              </RadixDialog.Description>
            </div>
            <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <LuX className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </RadixDialog.Close>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              You can interact with this dialog by opening and closing it.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </Dialog>
        </DialogRoot>
      </div>
    );
  },
};
