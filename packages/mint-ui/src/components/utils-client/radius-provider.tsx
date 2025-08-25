"use client";

import { createContext, ReactNode } from "react";
import { Radius, DEFAULT_RADIUS } from "./radius";

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

export interface RadiusProviderProps {
  /**
   * The children components.
   */
  children: ReactNode;

  /**
   * The global default radius for components.
   * @default "md"
   * @example "lg"
   */
  defaultRadius?: Radius;
}

/**
 * Provider component for managing global radius settings.
 * Place this at the root of your application to control the default radius
 * for all components that support the radius prop.
 */
export const RadiusProvider = (props: RadiusProviderProps) => {
  const { children, defaultRadius = DEFAULT_RADIUS } = props;

  return (
    <RadiusContext.Provider value={{ defaultRadius }}>
      {children}
    </RadiusContext.Provider>
  );
};
