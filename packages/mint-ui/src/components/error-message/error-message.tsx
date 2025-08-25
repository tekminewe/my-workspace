import { forwardRef, HTMLAttributes } from 'react';
import { BiSolidErrorCircle } from 'react-icons/bi';
import { cn } from '../utils';

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ title, message, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center', props.className)}
      >
        <BiSolidErrorCircle size={64} className="text-error mb-4" />
        <div className="card-title text-center">{title}</div>
        <div className="caption text-center">{message}</div>
      </div>
    );
  },
);
