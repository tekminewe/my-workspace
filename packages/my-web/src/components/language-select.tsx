'use client';

import { Select } from '@tekminewe/mint-ui/select';
import { usePathname, useRouter } from 'next/navigation';

export const LanguageSelect = ({ language }: { language: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Select
      value={language}
      options={[
        { label: 'EN', value: 'en-MY' },
        { label: '中文', value: 'zh-MY' },
      ]}
      className="shadow-0 focus:outline-none w-[85px]"
      clearable={false}
      onChange={(value) => {
        router.replace(pathname.replace(/^\/[^/]+/, `/${value}`));
      }}
    />
  );
};
