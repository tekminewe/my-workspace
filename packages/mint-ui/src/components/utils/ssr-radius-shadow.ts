/**
 * SERVER-SIDE COMPATIBLE RADIUS AND SHADOW SYSTEM
 *
 * This file provides documentation on how the mint-ui component library
 * handles border radius and shadow in a server-side compatible way.
 *
 * Key points:
 *
 * 1. CSS Variables:
 *    - We define all radius and shadow values as CSS variables in the tailwind plugin
 *    - These variables are mapped to Tailwind classes (rounded-sm, shadow-md, etc.)
 *
 * 2. Static Utility Functions:
 *    - Use getStaticRadiusClass() and getShadowClass() functions to get the Tailwind classes
 *    - These functions work without React context and are server-side compatible
 *
 * 3. Avoid React Context:
 *    - Never use the RadiusProvider or useRadius hooks for server components
 *    - These are kept for backward compatibility but should be avoided in new code
 *
 * 4. Global Default:
 *    - The default radius (md) is defined statically in radius.ts
 *    - This ensures consistent default radius without runtime context
 *
 * 5. Component Props:
 *    - Components should accept a radius prop of type Radius
 *    - If no radius prop is provided, the default is used
 *
 * Using this approach, border radius will not change once the page loads,
 * making it compatible with server components and avoiding hydration issues.
 */

// This file is for documentation purposes only
export const SERVER_SIDE_COMPATIBLE = true;
