# Copilot Instructions for My Workspace

This is a monorepo containing multiple projects. Please follow the project-specific guidelines based on the context of the request.

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

- Create stories for each component variant and state
- Include both dark and light mode variants in stories
- Show all variants/states in the same storybook

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

**Component Update Process:**

- Update available components list when adding/removing components
- Ensure components work in both light and dark themes
- Test theme switching functionality after component changes

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
- Do not use `@tekminewe/mint-ui/box` (deprecated)
- One React component per file
- Keep components small and focused
- Avoid inline functions in React components

**GraphQL Client:**

- Use Apollo GraphQL for queries and mutations
- Create queries/mutations in `src/graphqls` folder
- Run `pnpm gen:graphql` to generate types
- Add proper dynamic typing to `query<T>` calls

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
