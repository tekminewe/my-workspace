import { forwardRef } from 'react';
import { cn } from '../utils';

export interface ListGroupProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * The title of the group.
   */
  title?: string;
}

export const ListGroup = forwardRef<HTMLLIElement, ListGroupProps>(
  ({ className, children, title, ...props }, ref) => {
    return (
      <li ref={ref} {...props} className={cn('list-group', className)}>
        {title && <h3 className="list-group-title">{title}</h3>}
        <ul>{children}</ul>
      </li>
    );
  },
);

ListGroup.displayName = 'ListGroup';
