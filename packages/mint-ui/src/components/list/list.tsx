import { forwardRef } from "react"

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  return (
    <ul ref={ref} {...props} />
  )
});

List.displayName = "List";
