import { Command } from 'cmdk';
import { MouseEventHandler, ReactNode } from 'react';
import { SURFACE_COLORS, TEXT_COLORS } from '../utils/component-colors';
import { cn } from '../utils';

interface NodeCommandItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const NodeCommandItem = ({
  icon,
  title,
  description,
  onClick,
}: NodeCommandItemProps) => {
  return (
    <Command.Item>
      <div
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 cursor-pointer px-2 py-2',
          `hover:${SURFACE_COLORS.surfaceElevated}`,
          SURFACE_COLORS.surface,
        )}
      >
        {icon}
        <div>
          <p className="text-sm">{title}</p>
          <p className={`text-xs ${TEXT_COLORS.muted}`}>{description}</p>
        </div>
      </div>
    </Command.Item>
  );
};
