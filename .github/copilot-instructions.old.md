# Copilot Instructions for My Workspace

This is a monorepo containing multiple projects. Please follow the project-specific guidelines based on the context of the request.

**For new feature development, refer to the comprehensive workflow in `.github/prompts/new-feature.prompt.md`**

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
- **my-service**: NestJS GraphQL API service (deploys to AWS ECS)
- **my-web**: Next.js 15 web application (deploys to Vercel)
- **my-functions**: AWS SAM serverless functions
- **docs/**: Workspace documentation and guides
- **tasks/**: Task management and tracking files

## Project Management

### GitHub Projects

This workspace uses GitHub Projects for comprehensive project management and feature tracking. **Active project board is fully set up and operational.**

**🎯 Active Project Board:** [Acquisition Strategy & Feature Development](https://github.com/users/tekminewe/projects/1)

**Key Features:**

- **Acquisition Strategy Tracking**: 10 issues created and added to project board
- **Phase-based Development**: Organized implementation roadmap with 4 development phases
- **Cross-platform Coordination**: Links features across my-web, my-service, mint-ui, and my-functions
- **Social Media Integration**: Specialized tracking for Facebook, Instagram, TikTok, and general social features
- **Automated Setup**: Created via GitHub CLI with all issues pre-populated

**Quick Reference:**

- **Project Board**: https://github.com/users/tekminewe/projects/1
- **Setup Complete**: [`docs/project-board-setup-complete.md`](../docs/project-board-setup-complete.md)
- **Backlog Details**: [`docs/acquisition-strategy-backlog.md`](../docs/acquisition-strategy-backlog.md)
- **Setup Automation**: [`scripts/setup-project-board.sh`](../scripts/setup-project-board.sh)
- **Label System**: Priority, type, platform, and phase-based categorization
- **Issue Templates**: Standardized feature requests with technical requirements

## Development Commands by Project

- **mint-ui**: `pnpm dev` (development), `pnpm storybook` (Storybook), `pnpm build` (build)
- **my-service**: `pnpm dev` (development), `pnpm gen:prisma` (generate Prisma), `pnpm build` (build)
- **my-web**: `pnpm dev` (development), `pnpm gen:graphql` (generate GraphQL types), `pnpm build` (build)
- **my-functions**: `sam build` (build SAM functions), `sam local start-api` (local testing), individual function commands: `npm run compile`, `npm run test`, `npm run lint`

## Available Mint-UI Components

All components are available via `@tekminewe/mint-ui/<component>` imports. Key components include:

**Core UI:** Avatar, Badge, Button, Card, Callout, Separator, Skeleton, Spinner  
**Forms:** TextInput, Textarea, Select, MultiSelect, Checkbox, Switch, DateInput, SearchInput, RichTextEditor, FormLabel  
**Navigation:** Link, Breadcrumb, Navbar, Tabs, Sidebar, NavigationMenu  
**Overlays:** Dialog, Drawer, Popover, DropdownMenu, Toast  
**Data Display:** DataTable, Grid, List, Typography  
**Filtering:** FilterSection, FilterChip, FilterGroup, SearchableCheckboxList  
**Admin:** AdminLayout, AdminNavbar, AdminContent  
**Business:** PostItem, ProductItem, ProductList  
**Utilities:** IconButton, ThemeProvider, TailwindPlugin

For complete component APIs and usage examples, refer to the Storybook documentation or component source files.

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

**TypeScript Error Prevention and Resolution:**

- **Meta Object Configuration**: When creating Storybook stories with individual stories (not AllVariants), remove `component` property from meta to avoid TypeScript conflicts
- **Story Type Safety**: Use `satisfies Meta` instead of `satisfies Meta<typeof ComponentName>` for individual stories
- **File Validation**: Always use `get_errors` tool after significant file changes to catch TypeScript issues early
- **Incremental Testing**: Test TypeScript compilation after each major change rather than waiting until the end
- **Component Import Consistency**: Ensure all imported components in stories match actual component exports and interfaces

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

### Current Configuration Status:

**Workspace Level:**

- ✅ `.prettierrc` - Shared Prettier configuration
- ✅ `.eslintrc.js` - Shared ESLint configuration
- ✅ `.env` and `.env.example` - Environment variables
- ✅ `docs/` and `tasks/` - Documentation and task management

**Project Level:**

- ✅ Each project has individual `tsconfig.json` and build configurations
- ✅ Each my-functions Lambda has individual `.eslintrc.js` and `tsconfig.json`

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

**Storybook Story Pattern Exceptions:**

- **Complex Interactive Components**: Components with complex state management (Dialog, Drawer) may benefit from individual stories
- **User Request Override**: When explicitly requested, individual stories can be created for specific demonstration needs
- **Story Conversion Protocol**: When converting from `AllVariants` to individual stories or vice versa:
  1. **Always ask first** before making the conversion
  2. **Preserve all functionality** - ensure no demonstration cases are lost
  3. **Use descriptive names** for individual stories (Basic, WithForm, Interactive, etc.)
  4. **Remove `component` property** from meta object when creating individual stories to avoid TypeScript errors
  5. **Test thoroughly** after conversion to ensure all stories render correctly

**Storybook Meta Configuration Rules:**

- **Default Pattern**: Include `component: ComponentName` in meta for `AllVariants` stories
- **Individual Stories Pattern**: Remove `component` property from meta to avoid TypeScript conflicts
- **Consistent Structure**: Always include `title`, `tags: ['autodocs']`, and `parameters: { layout: 'centered' }`

**Example Meta Patterns:**

```typescript
// ✅ GOOD: AllVariants story meta
const meta = {
  title: 'Common / ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ComponentName>;

// ✅ GOOD: Individual stories meta
const meta = {
  title: 'Common / ComponentName',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta;
```

**Story Recovery and Version Control:**

- **Always verify current state** before making changes to any file using `read_file`
- **Handle file reverts gracefully** - when files are accidentally reverted, quickly restore with original patterns
- **Use descriptive commit messages** that explain what was changed and why
- **Test after recovery** - always run build and error checks after restoring files
- **Preserve existing patterns** - when recreating files, maintain consistent naming and structure from previous implementations

**Accessibility (WCAG 2.1 AA Compliance):**

- Use semantic HTML elements (`button`, `nav`, `main`, `section`, etc.)
- Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text
- Add proper ARIA labels and states
- Ensure keyboard navigation (Tab, Enter, Space, Arrow keys)
- Implement focus management and visible focus indicators
- Associate form inputs with labels using `htmlFor`
- Use `aria-live` regions for dynamic content
- Test with screen readers and keyboard-only navigation

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
} from '../utils/component-colors';
```

### Component Update Process:

1. **Before editing ANY component**: Read `component-colors.ts` and `color-quick-reference.md`
2. **During development**: Use standardized utilities, never hardcode colors
3. **After implementation**: Update `component-standardization-status.md` with status
4. **Testing**: Verify both light and dark modes work correctly

### Color Utility Usage Examples

```typescript
// ✅ GOOD: Using standardized utilities
className={getCardColors()}
className={SURFACE_COLORS.elevated}
className={`${TEXT_COLORS.primary} ${BORDER_COLORS.default}`}

// ❌ BAD: Hardcoded colors
className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
```

### UI/UX Enhancement Guidelines

**Design System Implementation:**

- Follow consistent spacing using Tailwind spacing scale
- Use semantic color tokens for all color decisions
- Maintain component variants (size, state, interaction patterns)
- Implement proper loading states and transitions
- Follow established component composition patterns

**User Experience Standards:**

- Provide clear visual feedback for all interactive elements
- Implement proper error states and validation messaging
- Use consistent animation timing and easing
- Ensure responsive behavior across all screen sizes
- Maintain consistent component behavior patterns

**Component Enhancement Protocol:**

1. **Analyze existing pattern** - check similar components for consistency
2. **Identify improvement opportunities** - UX, performance, accessibility
3. **Propose systematic changes** - don't create one-off solutions
4. **Implement with proper testing** - verify all variants and states
5. **Update documentation** - reflect changes in Storybook and docs

---

## Project-Specific Guidelines

### 2. My-Service (NestJS GraphQL API)

**Technology Stack:**

- NestJS + GraphQL + Prisma
- TypeScript with strict configuration
- Zenstack for enhanced Prisma capabilities

**API Development:**

- Follow GraphQL-first design approach
- Use Prisma schema as single source of truth
- Implement proper error handling and validation
- Use dependency injection patterns
- Follow NestJS module structure

**Language and Localization Standards:**

- **Always use HTTP headers for language detection**: API endpoints should get language from `Accept-Language` header via `AuthService.getAcceptLanguage()`
- **No language parameters in GraphQL queries**: Language should not be passed as GraphQL variables
- **Consistent header handling**: Use `setContext` in Apollo Client to set `Accept-Language` header
- **Backend-driven localization**: Content (like category names) should be localized in the backend using database metadata, not frontend dictionaries
- **Fallback handling**: Always provide fallback to `EN_US` when requested language is unavailable

**GraphQL Best Practices:**

- Remove language parameters from queries when implementing header-based localization
- Use `@Public()` decorator for endpoints that don't require authentication
- Implement proper error handling with meaningful error messages
- Follow consistent naming conventions for resolvers and services

**Common Tasks:**

- Generate Prisma client: `pnpm gen:prisma`
- Database migrations: `pnpm prisma migrate dev`
- Reset database: `pnpm prisma migrate reset`
- Seed database: `pnpm seed`

---

### 3. My-Web (Next.js 15 Application)

**Technology Stack:**

- Next.js 15 with App Router
- TypeScript + Tailwind CSS
- GraphQL Code Generator
- NextAuth.js for authentication

**Development Patterns:**

- Use App Router for all new routes
- Implement proper loading and error states
- Use Server Components where possible
- Follow Next.js performance best practices
- Implement proper SEO optimization

**Admin Console Standard Rules:**

**Layout & Structure:**

- **Full-Width Forms**: Admin forms should use `w-full` instead of constrained widths (e.g., `max-w-4xl`) for better space utilization and modern admin UI aesthetics
- **Consistent Grid Layouts**: Use responsive grid patterns - `lg:grid-cols-2 xl:grid-cols-3` for medium complexity, `lg:grid-cols-3` for simpler layouts
- **Proper Spacing**: Use `space-y-6` between major sections, `space-y-4` between related form groups
- **Card-Based Organization**: Wrap logical sections in cards using mint-ui `Card` component for clear visual separation

**Component Usage Standards:**

- **Page Structure**: Use dedicated page components (e.g., `AdminSitePage`, `AdminAdvertiserListPage`) that wrap specific admin functionality
- **Tab Navigation**: Implement tabs using `AdminSiteTabs` or similar tab components for multi-section admin pages
- **Form Components**: Create dedicated form components (e.g., `SiteForm`, `AdvertiserForm`) for complex forms rather than inline form logic
- **Table Components**: Use dedicated table components (e.g., `AdminAdvertiserTable`) with built-in pagination, sorting, and filtering capabilities

**Form Design Patterns:**

- **Input Sizing**: Use appropriate input widths - `max-w-lg` for medium inputs (domains, URLs), `max-w-md` for shorter inputs
- **Field Grouping**: Group related fields in grid layouts with proper responsive breakpoints
- **Label Association**: Always associate labels with form controls using proper `htmlFor` attributes
- **Validation Display**: Show validation errors consistently using mint-ui form validation patterns
- **Submit Actions**: Place primary actions (Save, Update) in the bottom-right, secondary actions (Cancel, Reset) to the left

**Data Display Standards:**

- **Table Behavior**: Implement consistent table patterns with sorting, pagination, and row selection
- **Status Indicators**: Use badge components for status fields (Active, Inactive, Pending, etc.)
- **Action Buttons**: Use icon buttons for table row actions (Edit, Delete, View) with tooltips
- **Loading States**: Implement skeleton loading for tables and forms during data fetching
- **Empty States**: Show meaningful empty state messages with call-to-action buttons

**Navigation & User Experience:**

- **Breadcrumbs**: Implement breadcrumb navigation for deep admin sections
- **Page Titles**: Use descriptive page titles that indicate current location and action
- **Success Feedback**: Show toast notifications for successful actions (save, delete, update)
- **Error Handling**: Display user-friendly error messages with actionable solutions
- **Confirmation Dialogs**: Use dialog components for destructive actions (delete, archive)

**Responsive Design:**

- **Mobile-First**: Design admin interfaces to work on tablets and smaller screens
- **Collapsible Sidebars**: Use collapsible navigation for admin layouts on smaller screens
- **Adaptive Tables**: Implement responsive table patterns (horizontal scroll, column stacking)
- **Touch-Friendly**: Ensure buttons and interactive elements are appropriately sized for touch

**Performance & Accessibility:**

- **Server Components**: Use React Server Components for admin list pages and static content
- **Client Components**: Use client components only for interactive elements (forms, modals, dynamic tables)
- **Keyboard Navigation**: Ensure all admin interfaces are fully keyboard accessible
- **Screen Reader Support**: Include proper ARIA labels and descriptions for complex interfaces
- **Focus Management**: Implement proper focus management in modals and dynamic content

**Security & Data Handling:**

- **Input Sanitization**: Sanitize all form inputs before displaying or processing
- **Permission Checks**: Implement proper role-based access control for admin features
- **Audit Logging**: Log admin actions for security and compliance requirements
- **Data Validation**: Validate all data on both client and server sides
- **Secure Defaults**: Use secure defaults for all admin configuration options

**Development Best Practices:**

- **Component Reusability**: Create reusable admin components that can be shared across different admin sections
- **Type Safety**: Use TypeScript interfaces for all admin data structures and API responses
- **Testing Strategy**: Write unit tests for complex admin form logic and data transformations
- **Code Organization**: Keep admin-specific components in dedicated directories (`/src/page/admin-*`, `/src/components/admin-*`)
- **Documentation**: Document complex admin workflows and business logic with inline comments

**GraphQL and API Integration:**

- **Header-based language detection**: Use `Accept-Language` header for API language, not query parameters
- **Apollo Client configuration**: Set up `setContext` link to handle dynamic headers for language switching
- **Backend localization**: Leverage backend-driven content localization instead of frontend dictionaries
- **Cache management**: Use `cache-and-network` fetchPolicy for queries that depend on language headers
- **Type generation**: Regenerate GraphQL types after API changes using `pnpm gen:graphql`

**Common Tasks:**

- Generate GraphQL types: `pnpm gen:graphql`
- Development server: `pnpm dev`
- Build production: `pnpm build`

---

### 4. My-Functions (AWS SAM Serverless)

**Technology Stack:**

- AWS Lambda + TypeScript
- AWS SAM for deployment
- Serverless architecture patterns

**Project Structure:**

The my-functions project contains individual Lambda functions in the `functions/` directory:

- `functions/advertisers-pull/` - Advertiser data processing
- `functions/auth/` - Authentication functions
- `functions/email-feedback/` - Email feedback processing
- `functions/post-generator/` - Post generation functionality

Each function has its own:

- `package.json` with individual dependencies
- `tsconfig.json` for TypeScript configuration
- `.eslintrc.js` for ESLint configuration
- Individual source files and tests

**Development Patterns:**

- Keep functions focused and lightweight
- Use proper error handling
- Implement logging and monitoring
- Follow AWS best practices
- Use environment variables for configuration
- Each function manages its own dependencies and build process

**Common Tasks:**

- Build functions: `sam build`
- Local testing: `sam local start-api`
- Deploy: `sam deploy --guided`
- Individual function tasks: `npm run compile`, `npm run test`, `npm run lint` (within each function directory)

---

## Mobile-First Development Guidelines

### Essential Mobile-First Principles:

- **Start with mobile constraints** when designing new UI components
- **Use responsive utility classes** (`hidden lg:block`, `lg:hidden`) for conditional rendering
- **Design touch-friendly interfaces** with minimum 44px touch targets
- **Create dedicated mobile components** for different interaction patterns (drawers vs sidebars)
- **Test on actual mobile devices** during development

### Component Architecture:

```typescript
// Mobile/Desktop component separation
<FilterSidebar className="hidden lg:block" {...sharedProps} />        // Desktop
<MobileFilterButton className="lg:hidden" {...mobileProps} />         // Mobile
```

### Translation:

- **Header-based language switching**: Use `Accept-Language` headers, not query parameters
- **Test text length variations** across supported languages on mobile screens

---
