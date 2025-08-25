'use client';

import { useClientLanguage } from '@/hooks/use-language';
import { Button } from '@tekminewe/mint-ui/button';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export const WithdrawButton = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const language = useClientLanguage();
  return (
    <Button
      className="bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
      onClick={() => {
        router.push(`/${language}/withdrawal`);
      }}
    >
      {children}
    </Button>
  );
};
