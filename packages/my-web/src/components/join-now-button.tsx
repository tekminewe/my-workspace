'use client';

import { Button } from '@tekminewe/mint-ui/button';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

export const JoinNowButton = ({ children }: { children: ReactNode }) => {
  const handleSignIn = () => {
    return signIn('cognito');
  };

  return (
    <Button size="lg" className="mt-4" onClick={handleSignIn}>
      {children}
    </Button>
  );
};
