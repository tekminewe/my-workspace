'use client';

import { IndicatorsContainerProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';

export const IndicatorsContainer = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
}: IndicatorsContainerProps<SelectOption, IsMulti, Group>) => {
  return (
    <div {...innerProps} className="flex items-center">
      {children}
    </div>
  );
};
