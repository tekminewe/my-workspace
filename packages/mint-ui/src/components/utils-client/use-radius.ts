import { useContext } from "react";
import { RadiusContext, RadiusContextValue } from "./radius-provider";

/**
 * Hook to access the current radius context.
 * Returns the global default radius setting.
 */
export const useRadius = (): RadiusContextValue => {
  return useContext(RadiusContext);
};
