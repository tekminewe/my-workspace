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

**File Recovery and Version Control:**

- **Always verify current state** before making changes to any file using `read_file`
- **Handle file reverts gracefully** - when files are accidentally reverted, quickly restore with original patterns
- **Use descriptive commit messages** that explain what was changed and why
- **Test after recovery** - always run build and error checks after restoring files
- **Preserve existing patterns** - when recreating files, maintain consistent naming and structure from previous implementations

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
} from '@tekminewe/mint-ui/dialog';
import { DialogFooter } from '@tekminewe/mint-ui/dialog-footer';
import {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerClose,
} from '@tekminewe/mint-ui/drawer';
import { DrawerFooter } from '@tekminewe/mint-ui/drawer-footer';
import { IconButton } from '@tekminewe/mint-ui/icon-button';
import { RadioGroup, RadioGroupItem } from '@tekminewe/mint-ui/radio-group';
import { Separator } from '@tekminewe/mint-ui/separator';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';
import { Switch } from '@tekminewe/mint-ui/switch';
import { TextInput } from '@tekminewe/mint-ui/text-input';
import { Textarea } from '@tekminewe/mint-ui/textarea';
import { Toast, ToastProvider } from '@tekminewe/mint-ui/toast';
import { Callout } from '@tekminewe/mint-ui/callout';
import { FilterSection } from '@tekminewe/mint-ui/filter-section';
import { FilterChip } from '@tekminewe/mint-ui/filter-chip';
import { SearchableCheckboxList } from '@tekminewe/mint-ui/searchable-checkbox-list';
import { FilterGroup } from '@tekminewe/mint-ui/filter-group';
```

**Component Categories:**

- **Layout & Structure**: Card, Separator, Callout
- **Navigation & Actions**: Button, IconButton, Dialog, Drawer
- **Forms & Inputs**: TextInput, Textarea, Checkbox, RadioGroup, Switch
- **Data Display**: Avatar, Badge, Skeleton
- **Feedback**: Toast
- **Overlays**: Dialog, Drawer
- **Filtering & Search**: FilterSection, FilterChip, SearchableCheckboxList, FilterGroup

---

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

**Development Patterns:**

- Keep functions focused and lightweight
- Use proper error handling
- Implement logging and monitoring
- Follow AWS best practices
- Use environment variables for configuration

**Common Tasks:**

- Build functions: `sam build`
- Local testing: `sam local start-api`
- Deploy: `sam deploy --guided`

---

## Mobile-First Responsive Development Guidelines

### Required Approach for All UI Components

**Mobile-First Development Protocol:**

- **Always start with mobile constraints** when designing new UI components
- **Use responsive utility classes** (`hidden lg:block`, `lg:hidden`) for conditional rendering instead of complex JavaScript
- **Design touch-friendly interfaces** with minimum 44px touch targets and 8px spacing between interactive elements
- **Implement progressive disclosure** for complex interfaces on mobile (drawers, modals, step-by-step flows)
- **Test on actual mobile devices** in addition to browser dev tools during development

### Responsive Component Architecture Standards

**Mobile/Desktop Component Separation:**

```typescript
// ✅ GOOD: Dedicated mobile components for different interaction patterns
<FilterSidebar className="hidden lg:block" {...sharedProps} />        // Desktop
<MobileFilterButton className="lg:hidden" {...mobileProps} />         // Mobile trigger
<MobileFilterDrawer {...sharedProps} />                               // Mobile interface
```

**Component Architecture Patterns:**

- **Create dedicated mobile components** when interaction patterns differ significantly (drawers vs sidebars, mobile buttons vs desktop navigation)
- **Share business logic** between mobile and desktop variants using custom hooks
- **Use conditional rendering** with responsive classes rather than complex JavaScript logic
- **Maintain consistent prop interfaces** between mobile and desktop variants for shared functionality

**State Management for Responsive Components:**

```typescript
// ✅ GOOD: Separate UI state from data state
const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // UI state (mobile-specific)
const selectedCategories = useURLState('categories'); // Data state (shared)
const { filterData } = useBusinessLogic(selectedCategories); // Business logic (shared)

// ❌ BAD: Mixing UI and data state
const [mobileFilters, setMobileFilters] = useState({
  open: false,
  categories: [],
});
```

### Responsive Grid and Layout Standards

**Grid System Rules:**

- **Use semantic breakpoints**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for optimal content scaling
- **Avoid cramped mobile layouts** - single column is often better than forced multi-column on small screens
- **Test all grid layouts** at mobile (375px), tablet (768px), and desktop (1024px+) sizes during development
- **Design for content, not devices** - let content determine breakpoints rather than specific device sizes

**Container and Spacing Patterns:**

```typescript
// ✅ GOOD: Progressive spacing that scales with screen size
<div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

// ❌ BAD: Fixed spacing that doesn't adapt
<div className="container mx-auto py-6 px-4">
  <div className="grid grid-cols-2 gap-4">
```

### Mobile-Optimized Component Usage

**Touch Interface Requirements:**

- **Minimum touch target size**: 44px x 44px for all interactive elements
- **Adequate spacing**: 8px minimum between touch targets to prevent accidental taps
- **Visual feedback**: Proper hover/active states that work on both mouse and touch devices
- **Gesture support**: Implement expected mobile gestures (swipe to dismiss, pull to refresh)

**Drawer and Modal Patterns:**

```typescript
// ✅ GOOD: Mobile drawer implementation
<DrawerRoot open={isMobileOpen} onOpenChange={setIsMobileOpen} direction="left">
  <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
  <Drawer className="w-80 max-w-[90vw]">
    {' '}
    // Responsive width
    <div className="flex items-center justify-between p-4">
      {' '}
      // Touch-friendly header
      <DrawerTitle>{title}</DrawerTitle>
      <Button onClick={() => setIsMobileOpen(false)}>
        {' '}
        // Clear close action
        <LuX className="w-4 h-4" />
      </Button>
    </div>
  </Drawer>
</DrawerRoot>
```

### Component File Organization

**File Structure for Responsive Components:**

```
components/
├── feature-name/
│   ├── feature-sidebar.tsx           # Desktop-only component
│   ├── mobile-feature-button.tsx     # Mobile-only component
│   ├── mobile-feature-drawer.tsx     # Mobile-only component
│   ├── shared-feature-logic.tsx      # Shared component
│   └── feature-container.tsx         # Container that manages both variants
```

**Naming Conventions:**

- **Prefix mobile-only components** with `Mobile` (e.g., `MobileFilterButton`, `MobileNavDrawer`)
- **Use descriptive suffixes** for desktop variants when needed (e.g., `FilterSidebar`, `DesktopNavMenu`)
- **Keep shared components** without prefixes (e.g., `CategoryFilter`, `SearchInput`)

### Translation and Internationalization

**Mobile Translation Considerations:**

- **Test text length variations** across all supported languages on mobile screens
- **Avoid text truncation** in critical UI elements like navigation labels and filter options
- **Use consistent translation keys** between mobile and desktop variants
- **Plan for variable text lengths** in responsive layouts (German text can be 30% longer than English)

```typescript
// ✅ GOOD: Flexible layout that accommodates text length
<Button className="min-w-[120px] px-4 py-2">
  {dictionary.filters.title}
</Button>

// ❌ BAD: Fixed width that may truncate text
<Button className="w-20">
  {dictionary.filters.title}
</Button>
```

### Performance Rules for Mobile

**Mobile Performance Standards:**

- **Lazy load mobile-specific components** when they're not immediately needed
- **Minimize bundle size** by reusing existing components in mobile variants
- **Optimize touch interactions** to minimize delay (avoid 300ms click delay)
- **Test performance** on lower-end mobile devices, not just high-end smartphones

### Testing and Quality Assurance

**Mobile-Specific Testing Protocol:**

1. **Test on actual mobile devices** in addition to browser dev tools
2. **Verify touch interactions** work correctly (tap, swipe, pinch, long press)
3. **Test orientation changes** and ensure layouts adapt properly
4. **Validate accessibility** with mobile screen readers (VoiceOver, TalkBack)
5. **Check URL state persistence** when switching between mobile and desktop views

**Responsive Debugging Checklist:**

- **Use browser dev tools** mobile simulation for initial testing
- **Test edge cases** like very long text, high numbers of items, slow networks
- **Verify responsive layout shifts** don't occur during loading states
- **Check component state synchronization** between mobile and desktop variants

### Error Prevention Rules

**Common Mobile Development Pitfalls to Avoid:**

- **Don't assume desktop interaction patterns** work on mobile (hover states, right-click, complex multi-step flows)
- **Don't use fixed widths** that don't scale on small screens (`w-64` without responsive variants)
- **Don't forget to test** state synchronization between mobile and desktop components
- **Don't skip** accessibility testing with actual screen readers on mobile devices

**Build-Time Validation:**

- **Run builds after responsive changes** to catch TypeScript type mismatches early
- **Test all language files** when adding new translation keys for mobile components
- **Verify responsive layouts** don't break existing desktop functionality
- **Check bundle size impact** of new mobile-specific components

### Documentation Standards

**Component Documentation for Responsive Features:**

```typescript
/**
 * FilterSidebar - Desktop filter interface
 *
 * @description Desktop-only sidebar for filtering content. Hidden on mobile screens.
 * On mobile, use MobileFilterButton + MobileFilterDrawer for the same functionality.
 *
 * @responsive Hidden below lg breakpoint (< 1024px)
 * @mobileAlternative MobileFilterDrawer
 */
export const FilterSidebar = ({ ... }) => {
  // Component implementation
};
```

**Required Documentation Elements:**

- **Document responsive behavior** in component JSDoc comments
- **Include usage examples** for both mobile and desktop variants
- **Specify breakpoint behavior** and mobile alternatives
- **Document touch interaction patterns** for mobile components

### Filter System Implementation Pattern

**Comprehensive Mobile Filter Architecture:**

Based on the successful mobile filter implementation, use this proven pattern for responsive filtering interfaces:

**1. Component Structure:**

```typescript
// Desktop-only sidebar (hidden on mobile)
<FilterSidebar className="hidden lg:block" {...filterProps} />

// Mobile-only components (hidden on desktop)
<div className="lg:hidden">
  <MobileFilterButton
    activeFiltersCount={selectedFilters.length}
    onClick={() => setIsMobileFilterOpen(true)}
  />
</div>

<MobileFilterDrawer
  open={isMobileFilterOpen}
  onOpenChange={setIsMobileFilterOpen}
  {...filterProps}
/>
```

**2. State Management Pattern:**

```typescript
// Mobile UI state (component-specific)
const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

// Filter data state (shared, URL-persisted)
const selectedCategories = useURLState('categories');
const { filterData, updateFilter } = useFilterLogic(selectedCategories);
```

**3. Mobile Button with Active Count:**

```typescript
<MobileFilterButton
  activeFiltersCount={activeFilters.length}
  onClick={() => setIsMobileFilterOpen(true)}
  dictionary={{ filters: dictionary.filters.title }}
/>
```

**4. Mobile Drawer Implementation:**

```typescript
<MobileFilterDrawer
  open={isMobileFilterOpen}
  onOpenChange={setIsMobileFilterOpen}
  categoryItems={categoryItems}
  selectedCategories={selectedCategories}
  onCategoryChange={updateCategoryFilter}
  dictionary={dictionary}
  trigger={<div />} // Not used when controlling open state
/>
```

**5. Responsive Grid for Results:**

```typescript
// Single column mobile, progressive enhancement for larger screens
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {results.map((item) => (
    <ResultItem key={item.id} {...item} />
  ))}
</div>
```

This pattern ensures:

- ✅ Consistent filter state between mobile and desktop
- ✅ Optimal UX for each device type
- ✅ Shared business logic with device-specific UI
- ✅ Proper URL state persistence
- ✅ Touch-friendly mobile interactions
- ✅ Professional desktop experience
