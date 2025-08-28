import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

/** @type {import('./src/components/types').PluginCreator} */
export default () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { handler, config } = typography();

  return plugin(
    (args) => {
      const { addBase, addUtilities, theme } = args;
      addBase({
        ':root': {
          '--mt-w-drawer': '350px',

          // === COLOR PALETTE ===
          //
          // 🎨 MINT-UI COLOR SYSTEM GUIDE
          //
          // This color system is designed for CONSISTENCY and ACCESSIBILITY across all components.
          // Each color is carefully chosen to work in both light and dark modes with proper contrast ratios.
          //
          // 📋 QUICK REFERENCE FOR COMPONENTS:
          //
          // 🔲 SURFACES (Backgrounds):
          //   • Cards/Panels: bg-white dark:bg-neutral-100
          //   • Page background: bg-neutral-50 dark:bg-neutral-50
          //   • Elevated surfaces: bg-white dark:bg-neutral-200
          //   • Subtle surfaces: bg-neutral-50 dark:bg-neutral-50
          //
          // 📝 TEXT:
          //   • Primary text: text-neutral-900 dark:text-neutral-900
          //   • Secondary text: text-neutral-700 dark:text-neutral-700
          //   • Muted text: text-neutral-500 dark:text-neutral-500
          //   • Disabled text: text-neutral-400 dark:text-neutral-400
          //
          // 🔳 BORDERS:
          //   • Default borders: border-neutral-200 dark:border-neutral-300
          //   • Strong borders: border-neutral-300 dark:border-neutral-400
          //   • Subtle borders: border-neutral-100 dark:border-neutral-200
          //
          // 💡 USAGE TIP: Use the utilities in /utils/component-colors.ts for automatic combinations:
          //   • getCardColors('default') - Complete card styling
          //   • SURFACE_COLORS.surface - Individual surface colors
          //   • TEXT_COLORS.primary - Individual text colors
          //   • BORDER_COLORS.default - Individual border colors
          //

          // PRIMARY: Main brand color (yellow-based)
          // Use for: Buttons, links, focus states, selections, and primary actions
          '--color-primary-50':
            '255 254 240' /* Lightest - backgrounds, hover states */,
          '--color-primary-100':
            '254 249 195' /* Very light - backgrounds, borders */,
          '--color-primary-200':
            '254 240 138' /* Light - hover states, subtle UI */,
          '--color-primary-300':
            '253 224 71' /* Medium light - borders, focus rings */,
          '--color-primary-400':
            '250 204 21' /* Medium - secondary buttons, icons */,
          '--color-primary-500':
            '234 179 8' /* Base - main brand color, primary buttons */,
          '--color-primary-600':
            '202 138 4' /* Medium dark - hover states, active states */,
          '--color-primary-700': '161 98 7' /* Dark - active states, text */,
          '--color-primary-800':
            '133 77 14' /* Very dark - text, concentrated UI */,
          '--color-primary-900':
            '113 63 18' /* Darkest - text against light backgrounds */,

          // NEUTRAL: Gray scale for UI framework
          // Use for: Text, backgrounds, dividers, cards, secondary UI elements
          //
          // ⭐ COMPONENT USAGE GUIDE:
          // • Cards/Surfaces: bg-white (elevated white backgrounds)
          // • Page backgrounds: bg-neutral-50 (subtle off-white backgrounds)
          // • Elevated surfaces: bg-white (dropdowns, modals, popovers)
          // • Primary text: text-neutral-900 (high contrast)
          // • Secondary text: text-neutral-700 (medium contrast)
          // • Muted text: text-neutral-500 (low contrast, less important)
          // • Disabled text: text-neutral-400 (very low contrast)
          // • Default borders: border-neutral-200 (subtle but visible)
          // • Strong borders: border-neutral-300 (more prominent)
          // • Subtle borders: border-neutral-100 (barely visible divisions)
          //
          '--color-neutral-50':
            '252 252 252' /* PAGE BACKGROUNDS: Subtle page backgrounds, slightly off-white */,
          '--color-neutral-100':
            '245 245 245' /* ELEVATED SURFACES: Subtle backgrounds, very light dividers */,
          '--color-neutral-200':
            '229 229 229' /* DEFAULT BORDERS: Standard borders, dividers, disabled states */,
          '--color-neutral-300':
            '212 212 212' /* STRONG BORDERS: Emphasized borders, disabled elements */,
          '--color-neutral-400':
            '163 163 163' /* DISABLED TEXT: Disabled text, placeholders, very low contrast */,
          '--color-neutral-500':
            '115 115 115' /* MUTED TEXT: Secondary text, icons, less important content */,
          '--color-neutral-600':
            '82 82 82' /* MEDIUM TEXT: Medium emphasis text, subheadings */,
          '--color-neutral-700':
            '64 64 64' /* SECONDARY TEXT: Important secondary text, descriptions */,
          '--color-neutral-800':
            '38 38 38' /* HIGH CONTRAST: Very important text, heavy emphasis */,
          '--color-neutral-900':
            '23 23 23' /* PRIMARY TEXT: Main text color, highest contrast, headings */,

          // SUCCESS: Indicates successful actions or validation
          // Use for: Confirmation messages, completed states, positive feedback
          '--color-success-50':
            '250 253 251' /* Very subtle success - barely visible tint */,
          '--color-success-100':
            '240 253 244' /* Light success - success backgrounds */,
          '--color-success-200':
            '187 247 208' /* Medium light success - hover states */,
          '--color-success-400':
            '74 222 128' /* Medium success - icons, secondary elements */,
          '--color-success-500':
            '34 197 94' /* Base success - success buttons, text, icons */,
          '--color-success-600':
            '22 163 74' /* Medium dark success - borders, outlines */,
          '--color-success-700':
            '21 128 61' /* Deep success - text on light backgrounds */,
          '--color-success-800':
            '22 101 52' /* Very dark success - dark mode backgrounds */,
          '--color-success-900':
            '14 63 28' /* Darkest success - highest contrast */,

          // ERROR: Indicates errors or destructive actions
          // Use for: Error messages, destructive actions, validation errors
          '--color-error-50':
            '254 252 252' /* Very subtle error - barely visible tint */,
          '--color-error-100':
            '254 242 242' /* Light error - error backgrounds, alerts */,
          '--color-error-200':
            '254 202 202' /* Medium light error - hover states */,
          '--color-error-400':
            '248 113 113' /* Medium error - icons, secondary elements */,
          '--color-error-500':
            '239 68 68' /* Base error - error messages, destructive buttons */,
          '--color-error-600':
            '220 38 38' /* Medium dark error - borders, outlines */,
          '--color-error-700':
            '185 28 28' /* Deep error - text on light backgrounds */,
          '--color-error-800':
            '153 27 27' /* Very dark error - dark mode backgrounds */,
          '--color-error-900':
            '127 29 29' /* Darkest error - highest contrast */,

          // WARNING: Indicates caution or attention needed
          // Use for: Warning messages, pending states, attention-requiring elements
          '--color-warning-50':
            '255 254 248' /* Very subtle warning - barely visible tint */,
          '--color-warning-100':
            '255 251 235' /* Light warning - warning backgrounds, alerts */,
          '--color-warning-200':
            '254 240 138' /* Medium light warning - hover states */,
          '--color-warning-400':
            '254 228 102' /* Medium warning - icons, secondary elements */,
          '--color-warning-500':
            '255 193 7' /* Base warning - warning indicators, icons (target color) */,
          '--color-warning-600':
            '212 159 6' /* Medium dark warning - borders, outlines */,
          '--color-warning-700':
            '163 123 5' /* Deep warning - text on light backgrounds */,
          '--color-warning-800':
            '130 98 4' /* Very dark warning - dark mode backgrounds */,
          '--color-warning-900':
            '97 74 3' /* Darkest warning - highest contrast */,

          // INFO: Indicates information or help
          // Use for: Informational messages, help text, neutral status indicators
          '--color-info-50':
            '250 252 254' /* Very subtle info - barely visible tint */,
          '--color-info-100':
            '240 249 255' /* Light info - informational backgrounds, alerts */,
          '--color-info-200':
            '186 230 253' /* Medium light info - hover states */,
          '--color-info-400':
            '34 211 238' /* Medium info - icons, secondary elements */,
          '--color-info-500':
            '6 182 212' /* Base info - informational messages, icons */,
          '--color-info-600':
            '8 145 178' /* Medium dark info - borders, outlines */,
          '--color-info-700':
            '14 116 144' /* Deep info - text on light backgrounds */,
          '--color-info-800':
            '22 78 99' /* Very dark info - dark mode backgrounds */,
          '--color-info-900': '12 74 110' /* Darkest info - highest contrast */,

          // === BORDER RADIUS ===
          // Consistent radius scale for components
          '--radius-sm':
            '0.25rem' /* 4px - Small buttons, inputs, small cards */,
          '--radius-md': '0.5rem' /* 8px - Default for most components */,
          '--radius-lg': '0.75rem' /* 12px - Large cards, modals */,
          '--radius-xl': '1rem' /* 16px - Hero sections, prominent cards */,
          '--radius-2xl':
            '1.5rem' /* 24px - Extra large cards, hero sections */,
          '--radius-full': '9999px' /* Fully rounded - Pills, avatars */,

          // === BOX SHADOWS ===
          // Consistent shadow scale for elevations
          '--shadow-1':
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' /* Subtle shadow */,
          '--shadow-2':
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' /* Light shadow */,
          '--shadow-3':
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' /* Medium shadow */,
          '--shadow-4':
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' /* Heavy shadow */,
        },

        // === DARK MODE COLOR SYSTEM ===
        //
        // 🌙 DARK MODE STRATEGY EXPLANATION:
        //
        // Our dark mode uses a "SMART INVERSION" approach where neutral colors are carefully
        // mapped (not simply inverted) to maintain proper contrast and readability.
        //
        // 🔄 NEUTRAL COLOR MAPPING:
        // Light Mode → Dark Mode
        // neutral-50 (very light) → neutral-50 (very dark) - Page backgrounds
        // neutral-100 (light) → neutral-100 (dark) - Card backgrounds
        // neutral-200 (borders) → neutral-300 (stronger borders for dark)
        // neutral-900 (dark text) → neutral-900 (light text)
        //
        // ⚠️  IMPORTANT: This means the SAME Tailwind class name produces DIFFERENT colors
        // in light vs dark mode, which is why bg-neutral-800 was "too white" in dark mode
        // (it becomes 245,245,245 instead of the expected dark color).
        //
        // 💡 SOLUTION: Always test in both modes and use our standardized color utilities
        // from /utils/component-colors.ts to ensure consistent results.
        //
        '.dark': {
          // PRIMARY: Brighter in dark mode for better visibility
          '--color-primary-50':
            '113 63 18' /* Reversed from 900 for dark mode */,
          '--color-primary-100':
            '133 77 14' /* Reversed from 800 for dark mode */,
          '--color-primary-200':
            '161 98 7' /* Reversed from 700 for dark mode */,
          '--color-primary-300':
            '202 138 4' /* Reversed from 600 for dark mode */,
          '--color-primary-400':
            '234 179 8' /* Reversed from 500 for dark mode */,
          '--color-primary-500': '250 204 21' /* Brighter in dark mode */,
          '--color-primary-600':
            '253 224 71' /* Reversed from 300 for dark mode */,
          '--color-primary-700':
            '254 240 138' /* Reversed from 200 for dark mode */,
          '--color-primary-800':
            '254 249 195' /* Reversed from 100 for dark mode */,
          '--color-primary-900':
            '255 254 240' /* Reversed from 50 for dark mode */,

          // NEUTRAL: Inverted for dark mode
          //
          // ⭐ DARK MODE COMPONENT USAGE GUIDE:
          // • Cards/Surfaces: bg-neutral-50 → dark:bg-neutral-100 (dark but readable background)
          // • Page backgrounds: bg-white → dark:bg-neutral-50 (darkest background)
          // • Elevated surfaces: bg-white → dark:bg-neutral-200 (lighter dark surfaces)
          // • Primary text: text-neutral-900 → dark:text-neutral-900 (light text on dark)
          // • Secondary text: text-neutral-700 → dark:text-neutral-700 (medium light text)
          // • Muted text: text-neutral-500 → dark:text-neutral-500 (muted but visible)
          // • Disabled text: text-neutral-400 → dark:text-neutral-400 (low contrast)
          // • Default borders: border-neutral-200 → dark:border-neutral-300 (visible on dark)
          // • Strong borders: border-neutral-300 → dark:border-neutral-400 (emphasized)
          // • Subtle borders: border-neutral-100 → dark:border-neutral-200 (subtle on dark)
          //
          '--color-neutral-50':
            '23 23 23' /* PAGE BACKGROUNDS: Darkest background for dark mode */,
          '--color-neutral-100':
            '38 38 38' /* CARDS & SURFACES: Main card/panel backgrounds in dark mode */,
          '--color-neutral-200':
            '64 64 64' /* ELEVATED SURFACES: Elevated backgrounds, subtle borders */,
          '--color-neutral-300':
            '82 82 82' /* DEFAULT BORDERS: Standard borders visible on dark backgrounds */,
          '--color-neutral-400':
            '115 115 115' /* DISABLED TEXT: Disabled text, low contrast in dark mode */,
          '--color-neutral-500':
            '163 163 163' /* MUTED TEXT: Secondary text, muted but readable in dark mode */,
          '--color-neutral-600':
            '212 212 212' /* MEDIUM TEXT: Medium emphasis text in dark mode */,
          '--color-neutral-700':
            '229 229 229' /* SECONDARY TEXT: Important secondary text in dark mode */,
          '--color-neutral-800':
            '245 245 245' /* HIGH CONTRAST: Very important text in dark mode */,
          '--color-neutral-900':
            '250 250 250' /* PRIMARY TEXT: Main text color, highest contrast in dark mode */,

          // STATUS COLORS: Brighter in dark mode for better visibility
          '--color-success-50': '14 63 28' /* Dark mode success darkest */,
          '--color-success-100': '21 128 61' /* Dark mode success background */,
          '--color-success-200': '22 101 52' /* Dark mode success hover */,
          '--color-success-400': '187 247 208' /* Dark mode success medium */,
          '--color-success-500':
            '74 222 128' /* Brighter success for dark mode */,
          '--color-success-600': '134 239 172' /* Dark mode success borders */,
          '--color-success-700':
            '220 252 231' /* Success text for dark backgrounds */,
          '--color-success-800':
            '187 247 208' /* Light success for dark mode text */,
          '--color-success-900':
            '248 250 248' /* Very subtle success for dark mode */,

          '--color-error-50': '127 29 29' /* Dark mode error darkest */,
          '--color-error-100': '185 28 28' /* Dark mode error background */,
          '--color-error-200': '153 27 27' /* Dark mode error hover */,
          '--color-error-400': '254 202 202' /* Dark mode error medium */,
          '--color-error-500': '248 113 113' /* Brighter error for dark mode */,
          '--color-error-600': '252 165 165' /* Dark mode error borders */,
          '--color-error-700':
            '254 226 226' /* Error text for dark backgrounds */,
          '--color-error-800':
            '254 202 202' /* Light error for dark mode text */,
          '--color-error-900':
            '253 248 248' /* Very subtle error for dark mode */,

          '--color-warning-50': '97 74 3' /* Dark mode warning darkest */,
          '--color-warning-100': '163 123 5' /* Dark mode warning background */,
          '--color-warning-200': '130 98 4' /* Dark mode warning hover */,
          '--color-warning-400': '254 240 138' /* Dark mode warning medium */,
          '--color-warning-500':
            '254 228 102' /* Brighter warning for dark mode */,
          '--color-warning-600': '255 225 102' /* Dark mode warning borders */,
          '--color-warning-700':
            '254 249 195' /* Warning text for dark backgrounds */,
          '--color-warning-800':
            '254 240 138' /* Light warning for dark mode text */,
          '--color-warning-900':
            '255 254 240' /* Very subtle warning for dark mode */,

          '--color-info-50': '12 74 110' /* Dark mode info darkest */,
          '--color-info-100': '14 116 144' /* Dark mode info background */,
          '--color-info-200': '22 78 99' /* Dark mode info hover */,
          '--color-info-400': '186 230 253' /* Dark mode info medium */,
          '--color-info-500': '34 211 238' /* Brighter info for dark mode */,
          '--color-info-600': '103 232 249' /* Dark mode info borders */,
          '--color-info-700':
            '224 242 254' /* Info text for dark backgrounds */,
          '--color-info-800': '186 230 253' /* Light info for dark mode text */,
          '--color-info-900':
            '248 251 253' /* Very subtle info for dark mode */,
        },
        body: {
          fontSize: theme('fontSize.base'),
          lineHeight: theme('leading.5'),
        },
      });

      // Add custom utilities
      addUtilities({
        '.bg-transparent': {
          'background-color': 'transparent',
        },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      handler(args);
    },
    {
      darkMode: 'class', // Enable class-based dark mode for mint-ui components
      ...config,
      theme: {
        ...config.theme,
        colors: {
          ...config.colors,
          'panel-solid': 'var(--color-panel-solid)',

          // Basic color utilities
          white: '#ffffff', // Pure white for elevated surfaces and backgrounds

          // Main color palettes with semantic naming
          primary: {
            50: 'rgb(var(--color-primary-50) / <alpha-value>)', // Use for: Subtle backgrounds, hover states
            100: 'rgb(var(--color-primary-100) / <alpha-value>)', // Use for: Light backgrounds, subtle UI
            200: 'rgb(var(--color-primary-200) / <alpha-value>)', // Use for: Hover states, selected items
            300: 'rgb(var(--color-primary-300) / <alpha-value>)', // Use for: Focus rings, borders
            400: 'rgb(var(--color-primary-400) / <alpha-value>)', // Use for: Secondary buttons, icons
            500: 'rgb(var(--color-primary-500) / <alpha-value>)', // Use for: Primary buttons, key UI elements
            600: 'rgb(var(--color-primary-600) / <alpha-value>)', // Use for: Hover states, active elements
            700: 'rgb(var(--color-primary-700) / <alpha-value>)', // Use for: Text, active states
            800: 'rgb(var(--color-primary-800) / <alpha-value>)', // Use for: Text on light backgrounds
            900: 'rgb(var(--color-primary-900) / <alpha-value>)', // Use for: High contrast text
            DEFAULT: 'rgb(var(--color-primary-500) / <alpha-value>)',
          },

          neutral: {
            50: 'rgb(var(--color-neutral-50) / <alpha-value>)', // Use for: Page backgrounds, subtle surfaces
            100: 'rgb(var(--color-neutral-100) / <alpha-value>)', // Use for: Card backgrounds, subtle UI
            200: 'rgb(var(--color-neutral-200) / <alpha-value>)', // Use for: Borders, dividers, disabled elements
            300: 'rgb(var(--color-neutral-300) / <alpha-value>)', // Use for: Strong borders, disabled elements
            400: 'rgb(var(--color-neutral-400) / <alpha-value>)', // Use for: Placeholder text, disabled text
            500: 'rgb(var(--color-neutral-500) / <alpha-value>)', // Use for: Secondary text, icons
            600: 'rgb(var(--color-neutral-600) / <alpha-value>)', // Use for: Primary text, headings
            700: 'rgb(var(--color-neutral-700) / <alpha-value>)', // Use for: Strong text, primary headings
            800: 'rgb(var(--color-neutral-800) / <alpha-value>)', // Use for: High contrast text
            900: 'rgb(var(--color-neutral-900) / <alpha-value>)', // Use for: Highest contrast text, dark backgrounds
            DEFAULT: 'rgb(var(--color-neutral-600) / <alpha-value>)',
          },

          // Status colors for feedback and notifications
          success: {
            50: 'rgb(var(--color-success-50) / <alpha-value>)', // Use for: Very light success backgrounds
            100: 'rgb(var(--color-success-100) / <alpha-value>)', // Use for: Success backgrounds, subtle indicators
            200: 'rgb(var(--color-success-200) / <alpha-value>)', // Use for: Success hover states
            400: 'rgb(var(--color-success-400) / <alpha-value>)', // Use for: Success icons, secondary elements
            500: 'rgb(var(--color-success-500) / <alpha-value>)', // Use for: Success messages, icons, buttons
            600: 'rgb(var(--color-success-600) / <alpha-value>)', // Use for: Success borders, outlines
            700: 'rgb(var(--color-success-700) / <alpha-value>)', // Use for: Text on light backgrounds
            800: 'rgb(var(--color-success-800) / <alpha-value>)', // Use for: Dark mode backgrounds and text
            900: 'rgb(var(--color-success-900) / <alpha-value>)', // Use for: Darkest success for high contrast
            DEFAULT: 'rgb(var(--color-success-500) / <alpha-value>)',
          },

          error: {
            50: 'rgb(var(--color-error-50) / <alpha-value>)', // Use for: Very light error backgrounds
            100: 'rgb(var(--color-error-100) / <alpha-value>)', // Use for: Error backgrounds, subtle indicators
            200: 'rgb(var(--color-error-200) / <alpha-value>)', // Use for: Error hover states
            400: 'rgb(var(--color-error-400) / <alpha-value>)', // Use for: Error icons, secondary elements
            500: 'rgb(var(--color-error-500) / <alpha-value>)', // Use for: Error messages, destructive buttons
            600: 'rgb(var(--color-error-600) / <alpha-value>)', // Use for: Error borders, outlines
            700: 'rgb(var(--color-error-700) / <alpha-value>)', // Use for: Text on light backgrounds
            800: 'rgb(var(--color-error-800) / <alpha-value>)', // Use for: Dark mode backgrounds and text
            900: 'rgb(var(--color-error-900) / <alpha-value>)', // Use for: Darkest error for high contrast
            DEFAULT: 'rgb(var(--color-error-500) / <alpha-value>)',
          },

          warning: {
            50: 'rgb(var(--color-warning-50) / <alpha-value>)', // Use for: Very light warning backgrounds
            100: 'rgb(var(--color-warning-100) / <alpha-value>)', // Use for: Warning backgrounds, notices
            200: 'rgb(var(--color-warning-200) / <alpha-value>)', // Use for: Warning hover states
            400: 'rgb(var(--color-warning-400) / <alpha-value>)', // Use for: Warning icons, secondary elements
            500: 'rgb(var(--color-warning-500) / <alpha-value>)', // Use for: Warning indicators, icons
            600: 'rgb(var(--color-warning-600) / <alpha-value>)', // Use for: Warning borders, outlines
            700: 'rgb(var(--color-warning-700) / <alpha-value>)', // Use for: Text on light backgrounds
            800: 'rgb(var(--color-warning-800) / <alpha-value>)', // Use for: Dark mode backgrounds and text
            900: 'rgb(var(--color-warning-900) / <alpha-value>)', // Use for: Darkest warning for high contrast
            DEFAULT: 'rgb(var(--color-warning-500) / <alpha-value>)',
          },

          info: {
            50: 'rgb(var(--color-info-50) / <alpha-value>)', // Use for: Very light info backgrounds
            100: 'rgb(var(--color-info-100) / <alpha-value>)', // Use for: Info backgrounds, help notices
            200: 'rgb(var(--color-info-200) / <alpha-value>)', // Use for: Info hover states
            400: 'rgb(var(--color-info-400) / <alpha-value>)', // Use for: Info icons, secondary elements
            500: 'rgb(var(--color-info-500) / <alpha-value>)', // Use for: Info messages, icons
            600: 'rgb(var(--color-info-600) / <alpha-value>)', // Use for: Info borders, outlines
            700: 'rgb(var(--color-info-700) / <alpha-value>)', // Use for: Text on light backgrounds
            800: 'rgb(var(--color-info-800) / <alpha-value>)', // Use for: Dark mode backgrounds and text
            900: 'rgb(var(--color-info-900) / <alpha-value>)', // Use for: Darkest info for high contrast
            DEFAULT: 'rgb(var(--color-info-500) / <alpha-value>)',
          },
        },
        screens: {
          xs: '520px',
          sm: '768px',
          md: '1024px',
          lg: '1280px',
          xl: '1640px',
        },
        borderRadius: {
          none: '0',
          sm: 'var(--radius-sm)',
          md: 'var(--radius-md)',
          lg: 'var(--radius-lg)',
          xl: 'var(--radius-xl)',
          '2xl': 'var(--radius-2xl)',
          full: 'var(--radius-full)',
          // Legacy support for existing numbered classes
          '1': 'var(--radius-sm)',
          '2': 'var(--radius-sm)',
          '3': 'var(--radius-md)',
          '4': 'var(--radius-lg)',
          '5': 'var(--radius-xl)',
          '6': 'var(--radius-xl)',
        },
        boxShadow: {
          '1': 'var(--shadow-1)',
          '2': 'var(--shadow-2)',
          '3': 'var(--shadow-3)',
          '4': 'var(--shadow-4)',
          none: 'none',
          sm: 'var(--shadow-1)',
          md: 'var(--shadow-2)',
          lg: 'var(--shadow-3)',
          xl: 'var(--shadow-4)',
        },
      },
    },
  );
};
