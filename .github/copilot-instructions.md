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

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Complex Component Story Patterns:**

For components requiring special setup (Dialog, Drawer, Popover):

- **Container Management**: Use `useState` and `useCallback` for container refs when components need portal attachment
- **State Management**: Keep state handling consistent across all stories in the same file
- **Story Naming**: Use descriptive names that clearly indicate functionality (Basic, WithForm, WithCloseButton, Interactive)
- **Demo Content**: Include realistic content that demonstrates actual use cases (forms, settings, confirmations)
- **Interactive Examples**: Always include at least one story with trigger functionality for user testing

**Example Complex Story Pattern:**

```typescript
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <ComponentRoot open>
          <Component
            title="Story Title"
            container={ref}
            // ... component props
          >
            {/* Realistic content */}
          </Component>
        </ComponentRoot>
      </div>
    );
  },
};
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

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Complex Component Story Patterns:**

For components requiring special setup (Dialog, Drawer, Popover):

- **Container Management**: Use `useState` and `useCallback` for container refs when components need portal attachment
- **State Management**: Keep state handling consistent across all stories in the same file
- **Story Naming**: Use descriptive names that clearly indicate functionality (Basic, WithForm, WithCloseButton, Interactive)
- **Demo Content**: Include realistic content that demonstrates actual use cases (forms, settings, confirmations)
- **Interactive Examples**: Always include at least one story with trigger functionality for user testing

**Example Complex Story Pattern:**

```typescript
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <ComponentRoot open>
          <Component
            title="Story Title"
            container={ref}
            // ... component props
          >
            {/* Realistic content */}
          </Component>
        </ComponentRoot>
      </div>
    );
  },
};
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

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Complex Component Story Patterns:**

For components requiring special setup (Dialog, Drawer, Popover):

- **Container Management**: Use `useState` and `useCallback` for container refs when components need portal attachment
- **State Management**: Keep state handling consistent across all stories in the same file
- **Story Naming**: Use descriptive names that clearly indicate functionality (Basic, WithForm, WithCloseButton, Interactive)
- **Demo Content**: Include realistic content that demonstrates actual use cases (forms, settings, confirmations)
- **Interactive Examples**: Always include at least one story with trigger functionality for user testing

**Example Complex Story Pattern:**

```typescript
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <ComponentRoot open>
          <Component
            title="Story Title"
            container={ref}
            // ... component props
          >
            {/* Realistic content */}
          </Component>
        </ComponentRoot>
      </div>
    );
  },
};
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

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Complex Component Story Patterns:**

For components requiring special setup (Dialog, Drawer, Popover):

- **Container Management**: Use `useState` and `useCallback` for container refs when components need portal attachment
- **State Management**: Keep state handling consistent across all stories in the same file
- **Story Naming**: Use descriptive names that clearly indicate functionality (Basic, WithForm, WithCloseButton, Interactive)
- **Demo Content**: Include realistic content that demonstrates actual use cases (forms, settings, confirmations)
- **Interactive Examples**: Always include at least one story with trigger functionality for user testing

**Example Complex Story Pattern:**

```typescript
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <ComponentRoot open>
          <Component
            title="Story Title"
            container={ref}
            // ... component props
          >
            {/* Realistic content */}
          </Component>
        </ComponentRoot>
      </div>
    );
  },
};
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

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Complex Component Story Patterns:**

For components requiring special setup (Dialog, Drawer, Popover):

- **Container Management**: Use `useState` and `useCallback` for container refs when components need portal attachment
- **State Management**: Keep state handling consistent across all stories in the same file
- **Story Naming**: Use descriptive names that clearly indicate functionality (Basic, WithForm, WithCloseButton, Interactive)
- **Demo Content**: Include realistic content that demonstrates actual use cases (forms, settings, confirmations)
- **Interactive Examples**: Always include at least one story with trigger functionality for user testing

**Example Complex Story Pattern:**

```typescript
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <ComponentRoot open>
          <Component
            title="Story Title"
            container={ref}
            // ... component props
          >
            {/* Realistic content */}
          </Component>
        </ComponentRoot>
      </div>
    );
  },
};
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

**Component Structure:**

```
src/components/<component>/
├── index.ts              # Exports
├── <ComponentName>.tsx   # Component
└── <ComponentName>.stories.tsx # Storybook
```

**Complex Component Story Patterns:**

For components requiring special setup (Dialog, Drawer, Popover):

- **Container Management**: Use `useState` and `useCallback` for container refs when components need portal attachment
- **State Management**: Keep state handling consistent across all stories in the same file
- **Story Naming**: Use descriptive names that clearly indicate functionality (Basic, WithForm, WithCloseButton, Interactive)
- **Demo Content**: Include realistic content that demonstrates actual use cases (forms, settings, confirmations)
- **Interactive Examples**: Always include at least one story with trigger functionality for user testing

**Example Complex Story Pattern:**

```typescript
export const Basic: Story = {
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef}>
        <ComponentRoot open>
          <Component
            title="Story Title"
            container={ref}
            // ... component props
          >
            {/* Realistic content */}
          </Component>
        </ComponentRoot>
      </div>
    );
  },
};
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
