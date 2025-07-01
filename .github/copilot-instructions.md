# Copilot Instructions for My Workspace

This is a monorepo containing multiple projects. Please follow the project-specific guidelines based on the context of the request.

## Rule Management and Conflict Resolution

### When to Ask for Rule Updates

If you ask me to do something that could be beneficial as a general rule but isn't currently documented in these instructions, I will:

1. **Suggest the new rule**: Explain what the new rule would be and why it would be beneficial
2. **Ask for permission**: Request confirmation before adding it to the instructions
3. **Provide context**: Explain how this rule would improve consistency, quality, or efficiency across the workspace

**Example**: "I notice you're asking me to always add error boundaries to React components. This seems like a good practice that could be added as a rule. Should I update the instructions to include 'Always wrap components with error boundaries for better error handling'?"

### When to Challenge Conflicting Requests

If you ask me to do something that conflicts with or doesn't comply with the existing rules, I will:

1. **Point out the conflict**: Clearly explain which rule(s) would be violated
2. **Suggest alternatives**: Offer compliant approaches that achieve your goal
3. **Ask for clarification**: Determine if you want to proceed anyway or update the rules

**Example**: "You're asking me to use default exports, but our TypeScript rules specify 'Always use named exports instead of default exports'. Would you like me to use named exports instead, or should we update this rule?"

### Rule Override Protocol

- **Temporary override**: If you need to break a rule for a specific case, explicitly say "override the rule" and I'll comply while noting the exception
- **Permanent change**: If you want to change a rule permanently, ask me to update the instructions document

---

## Workspace Structure

This workspace contains the following projects:

- **mint-ui**: React UI library with Storybook
- **my-service**: NestJS GraphQL API service
- **my-web**: Next.js 15 web application
- **my-functions**: AWS SAM serverless functions

## General Rules (All Projects)

### Package Management

- Always use `pnpm` as the package manager
- Check `package.json` for dependencies before suggesting solutions
- Always give answers based on the actual dependencies in package.json
- Clean up code and files when finished

### Code Quality

- Fix TypeScript errors immediately after each iteration
- Fix ESLint errors immediately after each iteration
- Fix Prettier errors immediately after each iteration
- Never use `any` type - always use specific types or interfaces
- Always use object destructuring for function parameters
- Do not break existing functionality

### Naming Conventions

- Use kebab-case for folders and files
- Use camelCase for variables and functions
- Use PascalCase for classes, interfaces, types and enums
- Use React/Next.js/NestJS recommended coding styles and conventions

### TypeScript Rules

- Always use named exports instead of default exports
- Maintain consistent typing throughout the codebase

### Code Formatting & Linting Configuration

- **Prettier**: Uses workspace-level `.prettierrc` with `singleQuote: true` and `trailingComma: "all"`
- **ESLint**: Should use shared workspace-level configuration for consistency across all projects
- **TypeScript**: Each project has its own `tsconfig.json` but should extend shared base configuration

### Recommended Shared Configuration Structure:

```
workspace-root/
├── .prettierrc                 # ✅ Already implemented
├── .eslintrc.js               # 📝 Should be implemented
├── tsconfig.base.json         # 📝 Should be implemented
└── projects/
    ├── mint-ui/
    │   ├── .eslintrc.js       # extends workspace config
    │   └── tsconfig.json      # extends tsconfig.base.json
    ├── my-service/
    │   ├── .eslintrc.js       # extends workspace config
    │   └── tsconfig.json      # extends tsconfig.base.json
    ├── my-web/
    │   ├── .eslintrc.js       # extends workspace config
    │   └── tsconfig.json      # extends tsconfig.base.json
    └── my-functions/
        ├── .eslintrc.js       # extends workspace config
        └── tsconfig.json      # extends tsconfig.base.json
```

---

## Project-Specific Guidelines

### 1. Mint-UI (React UI Library)

**Technology Stack:**

- React 19 + TypeScript + Storybook
- Tailwind CSS v3 for styling
- Development and Storybook servers running

**Component Development:**

- Always use functional components
- Create one file per component
- Document props with JSDoc comments and examples:

```typescript
interface MyComponentProps {
  /**
   * The description of the prop.
   * @default undefined
   * @example "John Doe"
   */
  myProps: string;
}
```

**Storybook Requirements:**

- Create only ONE story per component: the `AllVariants` story
- The `AllVariants` story must combine all component states, variants, sizes, and use cases into a single comprehensive showcase
- DO NOT include both light and dark mode variants in the story - Storybook provides built-in theme switching capabilities
- Use single theme (light mode by default) and let Storybook's theme addon handle dark mode testing
- Optimize for Chromatic snapshot cost by having a single story instead of multiple individual stories
- The story should be well-organized with clear sections and headings for different variants

**Accessibility (WCAG 2.1 AA Compliance):**

- Use semantic HTML elements (`button`, `nav`, `main`, `section`, etc.)
- Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text
- Add proper ARIA labels and states
- Ensure keyboard navigation (Tab, Enter, Space, Arrow keys)
- Implement focus management and visible focus indicators
- Associate form inputs with labels using `htmlFor`
- Use `aria-live` regions for dynamic content
- Test with screen readers and keyboard-only navigation

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Theme System:**

- Custom theme implementation (no external dependencies)
- Supports light/dark modes with system preference detection
- Theme persistence via localStorage (`mint-ui-theme`)
- CSS variables for theming located in `src/globals.css`
- ThemeProvider automatically detects user system preferences
- Built-in ThemeToggle component for switching themes

**Color Standards & Consistency:**

### Required Files for React Component Development

When building React components in mint-ui, you **MUST** reference these files:

1. **`mint-ui/src/components/utils/component-colors.ts`** - Centralized color system (USE THESE)
2. **`mint-ui/docs/component-standardization-status.md`** - Implementation patterns and examples
3. **`mint-ui/docs/color-quick-reference.md`** - Copy/paste ready color combinations
4. **`mint-ui/src/components/tailwind-plugin/index.ts`** - Tailwind config with detailed color usage comments

### Component Color System (CRITICAL)

- **MANDATORY**: Use standardized color utilities from `mint-ui/src/components/utils/component-colors.ts`
- **NEVER**: Write hardcoded color combinations like `bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800`
- **ALWAYS**: Import and use appropriate color constants and helper functions
- **CHECK FIRST**: Review existing utilities before creating new color patterns
- **EXTEND SYSTEM**: Add new patterns to `component-colors.ts` when needed (don't create one-off solutions)

### Standard Color Imports

```typescript
import {
  // Helper functions for complex components
  getCardColors,
  getButtonColors,
  getIconButtonColors,

  // Semantic color constants
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  INTERACTION_COLORS,
  SKELETON_COLORS,
  NAVIGATION_COLORS,
} from '../utils/component-colors';
```

### Component-Specific Usage Patterns

- **Buttons**: Use `getButtonColors(variant, color)` for all button styling
- **IconButtons**: Use `getIconButtonColors(variant, color)` for all icon button styling
- **Cards/Surfaces**: Use `getCardColors(variant)` or individual `SURFACE_COLORS.*`
- **Navigation Items**: Use `NAVIGATION_COLORS.item` and `NAVIGATION_COLORS.itemDisabled`
- **Loading States**: Use `SKELETON_COLORS.primary` for all skeleton animations
- **Interactive Elements**: Use `INTERACTION_COLORS.hover`, `INTERACTION_COLORS.focus`
- **Individual Elements**: Mix semantic constants like `SURFACE_COLORS.surface`, `TEXT_COLORS.primary`

### Component Color Standardization Process

When creating or updating components:

1. **Search existing patterns** in `component-colors.ts` for similar use cases
2. **Use helper functions** (`getButtonColors`, `getCardColors`) for complex styling
3. **Import semantic constants** (`INTERACTION_COLORS`, `SURFACE_COLORS`) for simple cases
4. **Extend the system** if new patterns are needed (add to `component-colors.ts`)
5. **Update documentation** (`component-standardization-status.md`) when adding new patterns
6. **Test thoroughly** in both light and dark themes

### Example Implementations

```typescript
// ✅ Button component
<button className={cn(baseStyles, getButtonColors('solid', 'primary'))}>

// ✅ Card component
<div className={cn('rounded-lg p-4', getCardColors('elevated'))}>

// ✅ Interactive list item
<li className={cn('p-2 rounded', NAVIGATION_COLORS.item)}>

// ✅ Loading skeleton
<div className={cn('animate-pulse rounded', SKELETON_COLORS.primary)}>

// ✅ Hover interactions
<div className={cn('p-4', INTERACTION_COLORS.hover, TEXT_COLORS.primary)}>

// ❌ WRONG - Manual colors that break theming
className="bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
```

### Critical Requirements

- **Test in both light and dark modes** - Colors behave differently due to smart inversion
- **Follow established patterns** - Check `docs/component-standardization-status.md` for examples
- **Maintain consistency** with existing standardized components
- **Never hardcode** color combinations that should use the centralized system
- **ALWAYS VERIFY COLOR AVAILABILITY** - Before using any Tailwind color class, check `mint-ui/src/components/tailwind-plugin/index.ts` to confirm the color exists in the design system

**Component Update Process:**

- Update available components list when adding/removing components
- Ensure components work in both light and dark themes
- Test theme switching functionality after component changes

## Component Styling Synchronization Rules

- **TextInput and SearchDialog Input Synchronization**: When updating TextInput component styles, always ensure the SearchDialog input (Command.Input) uses identical styling. Both components should use the same:
  - SURFACE_COLORS.surface for background
  - TEXT_COLORS.primary for text color
  - BORDER_COLORS.default for borders
  - Focus states (focus:ring-2 focus:ring-primary-500 focus:border-transparent)
  - Sizing and padding (py-2 px-3)
  - Appearance settings (appearance-none)
  - This ensures consistent form input experience across the component library.

### 2. My-Service (NestJS GraphQL API)

**Technology Stack:**

- NestJS + TypeScript + Apollo GraphQL
- Prisma ORM with ZenStack
- CUID for all entity IDs

**Database & ORM:**

- Use Prisma Client for all database operations
- Use Prisma nested writes for related entities
- Run `pnpm gen:prisma` after updating `zenstack/*.zmodel` files

**GraphQL Development:**

- Handle errors in the resolver layer
- Add descriptions to queries, mutations, fields, and arguments
- Combine multiple GraphQL queries in the same function when possible

**Module Structure:**

```
src/<module>/
├── <module>.resolver.ts    # GraphQL Resolver
├── <module>.args.ts       # GraphQL Arguments
├── <module>.input.ts      # GraphQL Input
├── <module>.service.ts    # Business Logic
├── <module>.module.ts     # NestJS Module
├── <module>.guard.ts      # Auth Guards
└── <module>.interceptor.ts # Interceptors
```

### 3. My-Web (Next.js Application)

**Technology Stack:**

- Next.js 15 + TypeScript (App Router)
- Apollo GraphQL client
- Internationalization (i18n)
- `@tekminewe/mint-ui` components

**Development Rules:**

- Must translate all text in the code
- Use `@tekminewe/mint-ui/*` for UI components
- One React component per file
- Keep components small and focused
- Avoid inline functions in React components

**Component Architecture & Prop Threading:**

- **PROPS-BASED ARCHITECTURE**: Design components to receive data as props rather than fetching internally
- **CLEAR DATA FLOW**: Layout → Page → Components with explicit prop passing
- **TYPED INTERFACES**: Always define proper TypeScript interfaces for component props
- **PROP THREADING**: When components need data from parent layouts, pass it through the component tree
- **AVOID PROP DRILLING**: For deeply nested components, consider React Context or state management
- **INTERFACE CONSISTENCY**: When multiple components need the same data shape, use shared type definitions

**Client Component Wrapper Rule:**

- **CRITICAL**: When using client components from mint-ui (components that use React context like `ThemeToggle`, `useTheme`, etc.) in server components, always create a wrapper client component
- **WHY**: Prevents "React context not found" errors when server components try to use client-side context
- **EXAMPLE**: Create `src/components/theme-toggle.tsx` as a client wrapper:

  ```tsx
  'use client';

  import { ThemeToggle as MintThemeToggle } from '@tekminewe/mint-ui/theme';

  export interface ThemeToggleProps {
    /**
     * Class name for the toggle button
     * @default undefined
     * @example "mr-2"
     */
    className?: string;
  }

  export const ThemeToggle = ({ className }: ThemeToggleProps) => {
    return <MintThemeToggle className={className} />;
  };
  ```

- **USAGE**: Import the wrapper instead of the mint-ui component directly in server components
- **BEST PRACTICE**: Define proper TypeScript interfaces and JSDoc comments for wrapper components to maintain type safety and documentation consistency

**Color & UI Consistency:**

### Mint-UI Component Usage & Custom Component Development

- **USE** `@tekminewe/mint-ui/*` components which handle theming automatically
- **REFERENCE** `mint-ui/docs/color-quick-reference.md` when building custom components
- **FOLLOW** mint-ui color patterns for consistency across the application
- **TEST** in both light and dark modes when building custom UI elements

### When Building Custom Components (Beyond mint-ui)

If you need to build custom UI elements not covered by mint-ui:

1. **REFERENCE** `mint-ui/docs/color-quick-reference.md` for copy/paste ready color combinations
2. **FOLLOW** mint-ui color patterns documented in `mint-ui/src/components/tailwind-plugin/index.ts`
3. **UNDERSTAND** color inversion strategy from `mint-ui/docs/component-color-standards.md`
4. **TEST** in both light and dark modes for consistency with mint-ui components
5. **NEVER** manually write color combinations like `bg-white dark:bg-neutral-900`

### Reference Files for Custom Development

- **`mint-ui/src/components/utils/component-colors.ts`** - Color utility functions (reference for patterns)
- **`mint-ui/docs/color-quick-reference.md`** - Ready-to-use color combinations
- **`mint-ui/src/components/tailwind-plugin/index.ts`** - Tailwind config with color usage comments
- **`mint-ui/docs/component-color-standards.md`** - Complete color system documentation

**GraphQL Client:**

- Use Apollo GraphQL for queries and mutations
- Create queries/mutations in `src/graphqls` folder
- Run `pnpm gen:graphql` to generate types
- Add proper dynamic typing to `query<T>` calls

**Server-Side Data Fetching Rules:**

- **PREFER server-side data fetching** in layouts and page components over client-side queries
- **FETCH ONCE, PASS DOWN**: Fetch data in layouts/pages and pass as props to child components
- **ELIMINATE redundant client queries**: Remove client-side queries when data can be fetched server-side
- **USE comprehensive queries**: Prefer queries that fetch related data (e.g., `GET_SITE_WITH_METADATA` vs `GET_SITE`)
- **PASS data as props**: Navigation and reusable components should accept data as props instead of doing their own queries
- **COMPONENT REFACTORING**: When converting client components to accept server data:
  1. Add data types to component props interface
  2. Remove client-side query hooks (`useQuery`, `useSession` for data)
  3. Remove GraphQL imports that are no longer needed
  4. Update parent components to pass the data
  5. Keep client-side hooks only for UI state (theme, user interactions)

**Example Pattern:**

```tsx
// ✅ GOOD: Layout fetches data server-side
const { data } = await query<GetSiteWithMetadataQuery>({
  query: GET_SITE_WITH_METADATA,
  context: { headers: { 'Accept-Language': lang } },
});

// ✅ GOOD: Pass data to components
<Navbar site={data.site} languages={data.languages} />;

// ✅ GOOD: Component accepts data as props
export const SiteLogo = ({ site, languages, currentLanguage }: Props) => {
  const { theme } = useTheme(); // Only client state
  // Use server data for logo selection
};

// ❌ AVOID: Client components doing their own data queries
export const SiteLogo = ({ currentLanguage }: Props) => {
  const { data } = useQuery(GET_SITE_WITH_METADATA); // Redundant query
};
```

**Error Handling:**

- Handle GraphQL errors appropriately in components
- Use try-catch blocks for async operations
- Display user-friendly error messages using ErrorMessage component
- Log errors for debugging purposes

**Performance Considerations:**

- Use React.memo for expensive components when needed
- Implement proper loading states with Skeleton components
- Avoid unnecessary re-renders by memoizing functions and objects
- Use Suspense boundaries for code splitting where appropriate
- **PREFER server-side data fetching**: Reduces client-side loading states and improves initial page load
- **ELIMINATE redundant queries**: Multiple components should not query for the same data independently
- **BATCH related data**: Use comprehensive queries to fetch related data in a single request
- **MINIMIZE client-side effects**: Keep `useEffect` and client queries to a minimum for better performance

**Internationalization:**

- Update types in `src/dictionaries/index.ts`
- Update `src/dictionaries/en-*.json` for English
- Update `src/dictionaries/zh-*.json` for Chinese

**Naming Conventions:**

- Admin components use `admin-` prefix
- Page components use `Page` suffix

**Project Structure:**

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── [lang]/           # Localized routes
│   ├── (protected)/      # Auth-required routes
│   └── (standard)/       # Standard layout routes
├── components/           # React components
├── graphql/             # GraphQL operations
├── layouts/             # Layout components
├── services/            # Service layer
└── dictionaries/        # Localization files
```

**Application Sitemap:**

```
/[lang]                                    # Localized routes (en, zh)
├── (protected)                            # Auth-required sections
│   ├── admin/                            # Admin dashboard
│   │   ├── /                            # Admin home
│   │   ├── advertiser/                  # Advertiser management
│   │   │   ├── /                        # List advertisers
│   │   │   └── [advertiserId]/edit      # Edit advertiser
│   │   ├── advertiser-campaign/         # Campaign management
│   │   │   └── [id]/edit               # Edit campaign
│   │   ├── blog/                        # Blog management
│   │   │   ├── /                        # List blog posts
│   │   │   └── [postId]                # View/edit post
│   │   ├── campaign/                    # Campaign overview
│   │   ├── carousel/                    # Carousel management
│   │   │   ├── /                        # List carousels
│   │   │   ├── create                   # Create carousel
│   │   │   └── [carouselId]/edit       # Edit carousel
│   │   └── site/                        # Site settings
│   └── store/
│       └── [slug]/redirect              # Store redirect page
├── (standard)                           # Standard layout
│   ├── (protected)                      # Auth-required user pages
│   │   ├── dashboard/                   # User dashboard
│   │   ├── profile/                     # User profile
│   │   └── withdrawal/                  # Withdrawal requests
│   └── (public)                         # Public pages
│       ├── /                            # Homepage
│       ├── all-stores/                  # Store directory
│       ├── blog/                        # Public blog
│       │   ├── /                        # Blog listing
│       │   └── [slug]                   # Blog post detail
│       ├── store/
│       │   └── [slug]                   # Store detail page
│       ├── privacy-policy/              # Privacy policy
│       └── terms-and-conditions/        # Terms and conditions
└── api/                                 # API endpoints
    ├── auth/                            # Authentication endpoints
    ├── webhooks/                        # Webhook handlers
    └── sitemap.ts                       # Dynamic sitemap generation
```

### 4. My-Functions (AWS SAM)

**Technology Stack:**

- AWS SAM + TypeScript
- GraphQL client integration

**Function Development:**

- Use the existing folder structure
- Combine multiple GraphQL queries into single requests when possible
- Create GraphQL operations in `functions/<function>/src/graphqls`
- Run `npm run gen:graphql` to generate types and SDK

**Function Structure:**

```
functions/<function>/
├── src/
│   ├── graphqls/         # GraphQL operations
│   ├── index.ts          # Handler
│   └── types.ts          # Type definitions
└── package.json          # Function dependencies
```

---

## GraphQL Best Practices (Cross-Project)

- Always add descriptions to schema definitions
- Use proper error handling in resolvers
- Combine multiple queries when called in the same context
- Generate types after schema changes
- Use strongly typed GraphQL clients
- **PREFER comprehensive queries**: Use queries that fetch all related data needed (e.g., `GET_SITE_WITH_METADATA` over `GET_SITE` when logos are needed)
- **AVOID N+1 queries**: Design queries to fetch related data in a single request rather than multiple separate queries

### Comprehensive Query Guidelines

**CREATE queries that fetch all related data needed by components:**

```graphql
# ✅ GOOD: Comprehensive query with all related data
query GetSiteWithMetadata {
  site {
    id
    domain
    logo {
      id
      url
    }
    metadatas {
      languageId
      name
      description
      logo {
        id
        url
      }
      darkLogo {
        id
        url
      } # Include ALL related fields
    }
  }
  languages {
    id
    name
    code
    shortName
    isSupported
    isDefault
  }
}

# ❌ AVOID: Incomplete queries that require additional requests
query GetSiteBasic {
  site {
    id
    name # Missing related data like logos, metadata
  }
}
```

**Query Naming Conventions:**

- Use descriptive names: `GET_SITE_WITH_METADATA` vs `GET_SITE`
- Include data scope: `GET_ADVERTISER_WITH_CAMPAIGNS` vs `GET_ADVERTISER`
- Follow consistent patterns across the codebase

## Testing Requirements

- Test accessibility with screen readers
- Verify keyboard navigation functionality
- Check color contrast ratios
- Validate focus indicators
- Ensure all interactive elements have accessible names

## Development Workflow

### Before Starting Development:

1. Check if development/Storybook servers are running for mint-ui
2. Verify you have the correct Node.js version and dependencies installed
3. Run `pnpm install` in the specific project directory if needed
4. Check for any existing TypeScript/ESLint errors before making changes

### During Development:

1. Make small, incremental changes and test frequently
2. Run type checking and linting after each significant change
3. Test components in both light and dark themes (for mint-ui)
4. Verify GraphQL types are generated when schema changes (for my-service and my-web)
5. Test responsive behavior on different screen sizes

### After Development:

1. Run full build process to ensure no build errors
2. Update documentation if component APIs changed
3. Update component import lists if new components were added
4. Commit changes with clear, descriptive commit messages

### Common Commands by Project:

- **mint-ui**: `pnpm dev` (development), `pnpm storybook` (Storybook), `pnpm build` (build)
- **my-service**: `pnpm dev` (development), `pnpm gen:prisma` (generate Prisma), `pnpm build` (build)
- **my-web**: `pnpm dev` (development), `pnpm gen:graphql` (generate GraphQL types), `pnpm build` (build)
- **my-functions**: `npm run gen:graphql` (generate GraphQL), `sam build` (build SAM functions)

---

## Available Mint-UI Components

Import these components from `@tekminewe/mint-ui/<component>`:

```typescript
import { Avatar } from '@tekminewe/mint-ui/avatar';
import { Badge } from '@tekminewe/mint-ui/badge';
import { Button } from '@tekminewe/mint-ui/button';
import { Card } from '@tekminewe/mint-ui/card';
import { Checkbox } from '@tekminewe/mint-ui/checkbox';
import {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@tekminewe/mint-ui/dialog';
import {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerTitle,
} from '@tekminewe/mint-ui/drawer';
import { Grid } from '@tekminewe/mint-ui/grid';
import { Navbar, NavbarBrand } from '@tekminewe/mint-ui/navbar';
import {
  Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from '@tekminewe/mint-ui/popover';
import { Select, ControlledSelect } from '@tekminewe/mint-ui/select';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
} from '@tekminewe/mint-ui/sidebar';
import { Switch, ControlledSwitch } from '@tekminewe/mint-ui/switch';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tekminewe/mint-ui/tabs';
import { DataTable } from '@tekminewe/mint-ui/data-table';
import { ProductList } from '@tekminewe/mint-ui/product-list';
import { TextInput, ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { ProductItem } from '@tekminewe/mint-ui/product-item';
import {
  SearchDialog,
  SearchRoot,
  SearchInput,
  SearchResultList,
  SearchResultListGroup,
  SearchResultListItem,
} from '@tekminewe/mint-ui/search-input';
import { IconButton } from '@tekminewe/mint-ui/icon-button';
import { PostItem } from '@tekminewe/mint-ui/post-item';
import { RichTextPreview } from '@tekminewe/mint-ui/rich-text-preview';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@tekminewe/mint-ui/breadcrumb';
import { Command, CommandItem } from '@tekminewe/mint-ui/command';
import {
  MobileNavigationMenu,
  MobileNavigationMenuItem,
} from '@tekminewe/mint-ui/mobile-navigation-menu';
import { RichTextEditor } from '@tekminewe/mint-ui/rich-text-editor';
import { List, ListItem, ListGroup } from '@tekminewe/mint-ui/list';
import {
  Theme,
  ThemeProvider,
  useTheme,
  ThemeToggle,
} from '@tekminewe/mint-ui/theme';
import { Link } from '@tekminewe/mint-ui/link';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { Callout } from '@tekminewe/mint-ui/callout';
import { SmallText } from '@tekminewe/mint-ui/small-text';
import {
  ImageInput,
  ControlledImageInput,
} from '@tekminewe/mint-ui/image-input';
import { Spinner } from '@tekminewe/mint-ui/spinner';
import { MultiSelect } from '@tekminewe/mint-ui/multi-select';
import { AdminNavbar } from '@tekminewe/mint-ui/admin-navbar';
import { SuccessCard } from '@tekminewe/mint-ui/success-card';
import { ToastContainer, toast } from '@tekminewe/mint-ui/toast';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';
import { Separator } from '@tekminewe/mint-ui/separator';
import { AdminContent } from '@tekminewe/mint-ui/admin-content';
import { SubMenu, SubMenuItem } from '@tekminewe/mint-ui/sub-menu';
import { DateInput, ControlledDateInput } from '@tekminewe/mint-ui/date-input';
import {
  FormLabel,
  ControlledForm,
  useFormContext,
} from '@tekminewe/mint-ui/form';
import { AdminLayout } from '@tekminewe/mint-ui/admin-layout';
import { InfoCard } from '@tekminewe/mint-ui/info-card';
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@tekminewe/mint-ui/navigation-menu';
```

---

## Theme Override System:

### How My-Web Overrides Mint-UI Colors

My-web uses a CSS custom property override system to customize mint-ui's theme colors. This is the **ONLY** correct way to theme mint-ui components from consuming applications.

### Key Principles:

1. **NEVER modify mint-ui directly** - Keep it generic and reusable
2. **ALWAYS override via CSS custom properties** in my-web's `globals.css`
3. **USE primary color system** - Override `--color-primary-XXX` variables (NOT accent colors)
4. **INCLUDE dark mode overrides** - Define both `:root` and `.dark` variants
5. **TEST in both themes** - Ensure colors work in light and dark modes

### Override Implementation:

```css
/* my-web/src/app/[lang]/globals.css */
:root {
  /* Override mint-ui primary colors with brand-specific theme */
  --color-primary-50: 255 247 237; /* Lightest backgrounds */
  --color-primary-500: 245 158 11; /* Main brand color */
  --color-primary-600: 217 119 6; /* Hover states */
  /* ... complete palette 50-900 */
}

.dark {
  /* Dark mode color overrides - usually inverted */
  --color-primary-50: 120 53 15; /* Darkest for dark mode */
  --color-primary-500: 251 146 60; /* Brighter for dark backgrounds */
  /* ... complete inverted palette */
}
```

### Component Usage:

All mint-ui components automatically use overridden colors:

```tsx
// ✅ CORRECT - Mint-UI components use overridden primary colors
<Button>Auto-themed CTA</Button>
<Card>Auto-themed card</Card>

// ✅ CORRECT - Manual usage for custom elements
<div className="bg-primary-500 text-white">Custom branded element</div>
<span className="text-primary-600">Branded text</span>

// ❌ WRONG - Don't use hardcoded colors that break theming
<div className="bg-orange-500">This won't follow theme overrides</div>
```

### Color Psychology for Affiliate Marketing:

- **Orange (#f59e0b)**: Optimal for affiliate conversions - creates urgency without aggression
- **Red**: Too aggressive, can create anxiety
- **Blue**: Professional but less action-oriented
- **Green**: Good for success states, less urgency
- **Purple**: Premium feel but lower conversion rates

### Documentation Location:

- **Theme documentation**: `my-web/docs/theme-override.md`
- **Implementation details**: CSS overrides in `my-web/src/app/[lang]/globals.css`
- **Color reference**: Use mint-ui's existing color documentation as reference for structure

---

## Code Cleanup Rules

When completing any task, always clean up:

1. **Remove unused CSS classes** - Search for usage before keeping utility classes
2. **Remove outdated documentation** - Delete files with incorrect/obsolete information
3. **Consolidate redundant files** - Don't keep multiple docs saying the same thing
4. **Verify build passes** - Always test build after cleanup
5. **Search for consistency** - Use grep to find inconsistent naming/approaches

### Documentation Standards

- **Keep it minimal**: One accurate file is better than multiple outdated ones
- **Match implementation**: Documentation should reflect actual code, not aspirational code
- **Use consistent terminology**: If code uses "primary", docs should use "primary" (not "accent")
- **Include examples**: Show actual usage patterns, not theoretical ones

## Backend-Frontend Data Consistency Rules

### Critical Debugging Practices

**ALWAYS verify Prisma includes when debugging missing data:**

1. **Check backend Prisma includes FIRST** when frontend data is missing or null
2. **Test GraphQL queries directly** using curl/Postman before blaming frontend code
3. **Use `console.log` in development** to verify data shape at each layer
4. **Regenerate Prisma client** after schema changes with `pnpm gen:prisma`

### Backend Service Data Fetching Rules (My-Service)

**Prisma Include Consistency:**

- **ALWAYS include ALL related fields** that the frontend expects
- **VERIFY includes match GraphQL schema** - if schema returns `darkLogo`, service must include it
- **CONSISTENT includes across methods** - if `getSite` includes `darkLogo`, so should `updateSite` and `getSiteMetadatas`
- **TEST with direct GraphQL queries** to verify backend returns expected data

**Common Prisma Include Patterns:**

```typescript
// ✅ GOOD: Complete includes for all expected data
include: {
  metadatas: {
    include: {
      logo: true,
      darkLogo: true, // Don't forget related fields!
    },
    where: { languageId: language },
  },
}

// ❌ BAD: Missing includes cause null/undefined on frontend
include: {
  metadatas: {
    include: {
      logo: true,
      // Missing darkLogo: true - causes frontend issues!
    },
  },
}
```

**Backend Testing Commands:**

```bash
# Test GraphQL directly when debugging
curl -X POST http://localhost:3020/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ site { metadatas { darkLogo { url } } } }"}'

# Regenerate Prisma after schema changes
pnpm gen:prisma
```

### Frontend Data Flow Verification (My-Web)

**Server-Side Data Debugging:**

```typescript
// ✅ GOOD: Debug server data in development
if (process.env.NODE_ENV === 'development') {
  console.log('Layout data:', {
    metadatas: data.site?.metadatas?.map((m) => ({
      languageId: m.languageId,
      hasExpectedField: !!m.expectedField, // Verify data presence
    })),
  });
}
```

**Component Prop Verification:**

```typescript
// ✅ GOOD: Verify props contain expected data
export const MyComponent = ({ site, languages }: Props) => {
  // Debug in development to catch missing data early
  if (process.env.NODE_ENV === 'development' && !site.metadatas?.length) {
    console.warn('MyComponent: Missing metadatas in site prop');
  }
};
```

### Debugging Workflow for Missing Data

1. **Frontend reports missing data** → Check browser console logs
2. **Verify frontend props** → Add debug logging to component
3. **Check GraphQL query** → Test query directly with curl
4. **Inspect backend service** → Verify Prisma includes are complete
5. **Check schema consistency** → Ensure schema matches service includes
6. **Regenerate types** → Run `pnpm gen:prisma` and `pnpm gen:graphql`
7. **Test end-to-end** → Verify fix with browser

### Schema-Service Alignment Rules

**GraphQL Schema and Prisma Service Must Match:**

- If GraphQL schema defines `darkLogo: Media`, Prisma service MUST include `darkLogo: true`
- If frontend expects nested data, backend MUST include the full relationship chain
- Update ALL service methods when adding new relationships
- Test with real data, not just TypeScript compilation

**Example - Logo Management:**

```typescript
// GraphQL Schema defines:
type SiteMetadata {
  logo: Media
  darkLogo: Media  # ← Frontend expects this
}

// Backend service MUST include both:
include: {
  logo: true,
  darkLogo: true,  # ← Required for schema compliance
}
```

---

## UI/UX Improvement Guidelines

When tasked with improving user interfaces, follow this systematic approach:

### Analysis Phase
1. **Identify Specific Issues**: Pinpoint exact problems (confusing buttons, poor layout, accessibility issues, inconsistent styling)
2. **Understand User Flow**: Analyze how users interact with the interface
3. **Check Current Implementation**: Review existing code patterns and dependencies
4. **Assess Impact Scope**: Determine if changes affect foundational components (mint-ui) or application-level components

### Implementation Strategy
1. **Component Hierarchy Approach**: 
   - Fix foundational components first (ImageInput, Button, Form components in mint-ui)
   - Then improve application-level layouts and pages
   - This prevents cascading fixes and ensures consistency
2. **Maintain Backward Compatibility**: Don't break existing component usage
3. **Follow Design System**: Always use existing color utilities, spacing, and patterns from `component-colors.ts`

### Visual Design Principles
- **Clear Visual Hierarchy**: Use proper heading sizes (h1, h2, h3) and semantic structure
- **Logical Content Grouping**: Group related form fields and separate different content types
- **Consistent Spacing**: Use systematic spacing patterns (space-y-4, space-y-6, etc.)
- **Responsive Design**: Implement responsive grids (md:grid-cols-2) and mobile-first approach
- **Semantic HTML**: Use proper HTML elements for better accessibility and SEO

### Quality Assurance
1. **Multi-Theme Testing**: Verify appearance in both light and dark themes
2. **Responsive Testing**: Check layout on mobile, tablet, and desktop sizes
3. **Accessibility Validation**: Ensure proper focus management, ARIA labels, and keyboard navigation
4. **Cross-Browser Testing**: Test in different browsers for consistency

---

## Component Enhancement Process

When enhancing existing components in mint-ui or my-web:

### Pre-Enhancement Analysis
1. **Read Current Implementation**: Understand existing patterns, props interfaces, and dependencies
2. **Check Usage Patterns**: Search codebase for how component is currently used
3. **Review Related Components**: Look for similar components that might need consistent updates
4. **Identify Breaking Changes**: Plan to avoid breaking existing implementations

### Enhancement Workflow
1. **Update Base Component**: Make changes to the core component (e.g., ImageInput in mint-ui)
2. **Update Storybook Stories**: Modify stories to demonstrate new functionality with `AllVariants` pattern
3. **Build and Test mint-ui**: Run `pnpm build` to ensure no compilation errors
4. **Update Application Usage**: Modify consuming applications (my-web) to use enhanced features
5. **Build Application**: Test that consuming applications still build and function correctly

### Documentation Requirements
1. **Update Component Props**: Add JSDoc comments for new props with examples
2. **Create Implementation Docs**: Document the changes and reasoning (like site-form-improvements.md)
3. **Update Available Components List**: Add new components to copilot-instructions.md import list
4. **Version Documentation**: Note which version introduced new features

### Testing Checklist
- [ ] Component builds without TypeScript errors
- [ ] Storybook stories render correctly
- [ ] Works in both light and dark themes
- [ ] Responsive design functions properly
- [ ] Consuming applications build successfully
- [ ] Existing functionality remains intact
- [ ] New features work as expected

---

## Self-Learning and Continuous Improvement Process

After completing any significant development task, perform this self-evaluation:

### Post-Task Analysis Questions
1. **Pattern Recognition**: "What systematic approach did I follow that could benefit future similar tasks?"
2. **Problem-Solving Process**: "What debugging or troubleshooting workflow proved effective?"
3. **Quality Improvements**: "What practices ensured high-quality outcomes?"
4. **Efficiency Gains**: "What steps could be streamlined or automated for future tasks?"
5. **Knowledge Gaps**: "What information would have made this task faster or better?"

### Rule Evaluation Criteria
**Update copilot-instructions.md when you identify:**
- **Systematic approaches** that apply to multiple similar tasks
- **Best practices** that prevent common issues or bugs
- **Quality assurance processes** that catch problems early
- **Debugging workflows** that save significant time
- **Design patterns** that improve consistency across the codebase

### Examples of Update-Worthy Patterns
**From our recent site form improvements:**
- UI/UX improvement methodology (analyze → implement → test → document)
- Component enhancement process (base component → stories → build → application → test)
- Form layout design patterns (section grouping, responsive grids, semantic structure)
- File input UX patterns (clear buttons, image previews, proper labeling)

### Documentation Standards for Learnings
1. **Be Specific**: Include exact steps, code patterns, and command sequences
2. **Provide Context**: Explain why the approach works and when to use it
3. **Include Examples**: Show both correct (✅) and incorrect (❌) implementations
4. **Reference Files**: Point to specific files and line numbers when relevant
5. **Cross-Reference**: Link related guidelines and patterns within the instructions

### Continuous Improvement Workflow
1. **Immediate Reflection**: After each task, ask "Should this process be documented?"
2. **Pattern Recognition**: Look for recurring approaches across multiple tasks
3. **Quality Enhancement**: Identify practices that consistently improve outcomes
4. **Knowledge Capture**: Document insights that aren't obvious from code alone
5. **Validation**: Test new guidelines on subsequent tasks to ensure effectiveness

This creates a self-improving system where each development task contributes to better accuracy and efficiency in future work.
