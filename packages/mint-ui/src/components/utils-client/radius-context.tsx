'use client';

import { createContext } from 'react';
import { Radius, DEFAULT_RADIUS } from './radius';

export interface RadiusContextValue {
  /**
   * The global default radius for components.
   * @default "md"
   */
  defaultRadius: Radius;
}

export const RadiusContext = createContext<RadiusContextValue>({
  defaultRadius: DEFAULT_RADIUS,
});
