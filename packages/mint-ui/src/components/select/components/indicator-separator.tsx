'use client';

export const IndicatorSeparator = ({ innerProps }: any) => {
  return (
    <span
      {...innerProps}
      className="bg-neutral-300 dark:bg-neutral-600 my-2 w-px"
    />
  );
};
