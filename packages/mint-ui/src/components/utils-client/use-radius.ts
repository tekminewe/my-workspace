import { useContext } from 'react';
import { RadiusContext, type RadiusContextValue } from './radius-context';

/**
 * Hook to access the current radius context.
 * Returns the global default radius setting.
 */
export const useRadius = (): RadiusContextValue => {
  return useContext(RadiusContext);
};
