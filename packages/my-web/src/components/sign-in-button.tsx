'use client';

import { Button } from '@tekminewe/mint-ui/button';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

export const SignInButton = ({ children }: { children: ReactNode }) => {
  const handleSignIn = () => {
    return signIn('cognito');
  };

  return <Button onClick={handleSignIn}>{children}</Button>;
};
