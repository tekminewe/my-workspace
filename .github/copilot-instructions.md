# Project Overview

This is a monorepo project for a white label single tenant configurable web application that can deploy as cashback website and potentially ecommerce website in the future in the same codebase.

## Features

### Cashback Website

- User can register and login.
- User can search advertiser (sometimes known as Store for end user).
- User can view the details of a selected advertiser.
- User can click on the link in the advertiser details to visit the advertiser's website. Then, user can earn cashback by making purchases through the advertiser's website.
- When a user makes a purchase, the advertiser system will track the transaction and calculate the cashback amount.
- Advertiser system will callback to our application when a user's cashback is recorded in their system.
- Advertiser system will callback to our application when a user's cashback is confirmed or rejected.
- Once the cashback is confirmed, our application will credit the user's wallet with the cashback amount.
- User can view their cashback balance and cashback history in their account.
- User can withdraw their cashback balance to their bank account if they meet the minimum withdrawal amount.
- User can view their wallet transaction history including deposits, withdrawals, and cashback transactions.

## Workspace Structure

This is a **private monorepo** containing all projects in a unified workspace using pnpm workspaces and Turbo for build orchestration.

### packages/mint-ui

Private UI library with Storybook 9. Previously open source, now part of the private monorepo. Uses workspace linking for hot-reloading during development.

#### Technology Stacks

- Use pnpm for package management.
- Built with React 19 and TypeScript 5.5.3.
- Tailwind CSS v3 for styling.
- Visual tests with Chromatic.
- **Private package** - no longer published to npm registry.

#### Available Mint-UI Components

**Core UI:** Avatar, Badge, Button, Card, Callout, Separator, Skeleton, Spinner  
**Forms:** TextInput, Textarea, Select, MultiSelect, Checkbox, Switch, DateInput, SearchInput, RichTextEditor, FormLabel  
**Navigation:** Link, Breadcrumb, Navbar, Tabs, Sidebar, NavigationMenu  
**Overlays:** Dialog, Drawer, Popover, DropdownMenu, Toast  
**Data Display:** DataTable, Grid, List, Typography  
**Filtering:** FilterSection, FilterChip, FilterGroup, SearchableCheckboxList  
**Admin:** AdminLayout, AdminNavbar, AdminContent  
**Business:** PostItem, ProductItem, ProductList  
**Utilities:** IconButton, ThemeProvider, TailwindPlugin

### packages/my-service

NestJS GraphQL API service for user end and admin end. For development, it is running on http://localhost:3020/graphql.

#### Technology Stacks

- Use pnpm for package management.
- Built with NestJS 9 and TypeScript 5.5.3.
- GraphQL API using NestJS Apollo Server.
- Apollo GraphQL Client for frontend data fetching.
- Prisma ORM 5.20 for database access. Enhanced with Zenstack for Role Based Access Control (RBAC).
- PostgreSQL as the database.
- Deployed on AWS ECS.
- Use AWS X-Ray for tracing and monitoring.
- Use Algolia for search functionality.
- Use mailgun.js for email sending.
- Use AWS Cognito for authentication.

### packages/my-web

Next.js 15 web application with App Router. Contains both user end and admin end. Uses workspace linking to `@tekminewe/mint-ui` for hot-reloading during development.

#### Technology Stacks

- Use pnpm for package management.
- Built with Next.js 15 and TypeScript 5.5.3.
- Tailwind CSS v3 for styling.
- Use mint-ui as the UI library via workspace dependency (`workspace:*`).
- Use Apollo Client for GraphQL data fetching.
- Use React Hook Form for form handling.
- Use next-auth and AWS Cognito Managed Login for authentication. AWS Cognito Managed Login takes care of user management, including sign-up, sign-in, and password recovery.

### packages/my-functions

AWS SAM serverless functions for cashback callbacks, email callbacks, etc.

#### Technology Stacks

- Built with AWS SAM and TypeScript 5.5.3.
- Deployed on AWS Lambda.
- Use NodeJS 20 runtime with TypeScript 5 support.

## Coding Standards

### mint-ui

- MUST build the component that support light mode and dark mode.
- MUST only have generic components in the library.
- MUST NOT include business logic or components.

### my-web

- MUST build the business components in this project.
- MUST use `RichTextEditor` from `mint-ui` for rich text editing and `RichTextPreview` from `mint-ui` for displaying rich text.

### Naming Conventions

- MUST use camelCase for variable and function names.
- MUST use PascalCase for React component and class names, interfaces, types and enums.
- MUST use kebab-case for file and folder names.

### TypeScript

- MUST use strict typing and avoid using `any`.
- MUST use named exports instead of default exports.
- MUST use single quotes for strings. Except for React prop values, which should use double quotes.
- MUST use object destructuring for function parameters
- MUST use interfaces for object types and avoid using type assertions.
- MUST use `enum` for fixed sets of values.

### React and NextJS

- MUST use App Router for routing.
- MUST use functional components.
- MUST create one file per component.
- MUST add `Props` suffix to component props interfaces.
- MUST follow the WCAG 2.1 guidelines for accessibility belows:
  - Use semantic HTML elements (`button`, `nav`, `main`, `section`, etc.)
  - Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text
  - Add proper ARIA labels and states
  - Ensure keyboard navigation (Tab, Enter, Space, Arrow keys)
  - Implement focus management and visible focus indicators
  - Associate form inputs with labels using `htmlFor`
  - Use `aria-live` regions for dynamic content.
  - Test with screen readers and keyboard-only navigation.
- MUST use `ControlledForm` and `Controlled*` components for all forms and inputs.

```tsx
'use client';

import { ControlledForm, useFormContext } from '@tekminewe/mint-ui/form';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';
import { ControlledSelect } from '@tekminewe/mint-ui/select';
import { ControlledSwitch } from '@tekminewe/mint-ui/switch';
import { Card } from '@tekminewe/mint-ui/card';
import { toast } from '@tekminewe/mint-ui/toast';
import { useMutation, gql, ApolloError } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useMemo, useCallback } from 'react';
import { object, string, boolean, coerce } from 'zod';

const CREATE_MUTATION = gql(/* GraphQL */ `
  mutation CreateItem($data: CreateItemInput!) {
    createItem(data: $data) {
      id
      title
      status
    }
  }
`);

interface ItemFormState {
  title: string;
  description: string;
  category: string;
  status: boolean;
  sortOrder: number;
}

const getDefaultValues = (defaultFormValues?: Partial<ItemFormState>) => ({
  title: defaultFormValues?.title ?? '',
  description: defaultFormValues?.description ?? '',
  category: defaultFormValues?.category ?? '',
  status: defaultFormValues?.status ?? false,
  sortOrder: defaultFormValues?.sortOrder ?? 0,
});

const mapCategoriesToOptions = (categories: { id: string; name: string }[]) =>
  categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

export const ItemForm = ({
  language,
  defaultFormValues,
  categories,
  dictionary,
}: {
  language: string;
  defaultFormValues?: Partial<ItemFormState>;
  categories: { id: string; name: string }[];
  dictionary: {
    titleLabel: string;
    titlePlaceholder: string;
    titleEmptyError: string;
    descriptionLabel: string;
    categoryLabel: string;
    statusLabel: string;
    sortOrderLabel: string;
    createSuccessMessage: string;
  };
}) => {
  const session = useSession();
  const [create] = useMutation(CREATE_MUTATION);

  // MUST validate form schema
  const schema = useMemo(() => {
    return object({
      title: string().min(1, dictionary.titleEmptyError),
      description: string().min(1, 'Description is required'),
      category: string().min(1, 'Category is required'),
      status: boolean(),
      sortOrder: coerce.number().min(0, 'Sort order must be positive'),
    });
  }, [dictionary.titleEmptyError]);

  const defaultValues = useMemo(
    () => getDefaultValues(defaultFormValues),
    [defaultFormValues],
  );

  const categoryOptions = useMemo(
    () => mapCategoriesToOptions(categories),
    [categories],
  );

  const handleSubmit = useCallback(
    async (values: ItemFormState) => {
      const createData = {
        title: values.title,
        description: values.description,
        category: values.category,
        status: values.status ? 'Active' : 'Inactive',
        sortOrder: values.sortOrder,
      };

      const requestContext = {
        headers: {
          Authorization: `Bearer ${session?.data?.accessToken}`,
          'Accept-Language': language,
        },
      };

      const successToastConfig = {
        type: 'success' as const,
      };

      const errorToastConfig = {
        type: 'error' as const,
      };

      try {
        await create({
          variables: {
            data: createData,
          },
          context: requestContext,
        });

        toast(dictionary.createSuccessMessage, successToastConfig);
      } catch (error) {
        toast((error as ApolloError).message, errorToastConfig);
      }
    },
    [
      create,
      session?.data?.accessToken,
      language,
      dictionary.createSuccessMessage,
    ],
  );

  return (
    <Card>
      <ControlledForm<ItemFormState>
        schema={schema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <ControlledTextInput
          required
          name="title"
          label={dictionary.titleLabel}
          placeholder={dictionary.titlePlaceholder}
        />
        <ControlledTextInput
          required
          name="description"
          label={dictionary.descriptionLabel}
        />
        <ControlledSelect
          required
          clearable={false}
          name="category"
          label={dictionary.categoryLabel}
          options={categoryOptions}
        />
        <ControlledSwitch label={dictionary.statusLabel} name="status" />
        <ControlledTextInput
          type="number"
          name="sortOrder"
          label={dictionary.sortOrderLabel}
        />
      </ControlledForm>
    </Card>
  );
};
```

- MUST include translation for all the text. Get the translation in the server components and pass it down to the client components.

```tsx
export default async function ProtectedLayout(
  props: ServerComponentProps<{
    children: React.ReactNode;
  }>,
) {
  const params = await props.params;

  const { children } = props;

  // Get the translation dictionary in the server component
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="container mx-auto flex my-6">
      {/** Pass the translation dictionary to
      the Sidebar */}
      <Sidebar dictionary={dictionary} />
      {children}
    </div>
  );
}
```

- MUST add type when using `DataTable` component.

```tsx
'use client';

import { Badge } from '@tekminewe/mint-ui/badge';
import { DataTable } from '@tekminewe/mint-ui/data-table';
import { IconButton } from '@tekminewe/mint-ui/icon-button';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import { LuPen } from 'react-icons/lu';

interface AdvertiserRow {
  id: string;
  name: string;
  logo?: {
    url: string;
  };
  statusId: 'Active' | 'Inactive';
  commission?: {
    commission: number;
  };
  categories: {
    id: string;
    name: string;
  }[];
  createdAt: string;
}

const DUMMY_DATA: AdvertiserRow[] = [
  {
    id: '1',
    name: 'Amazon',
    logo: { url: '/images/amazon-logo.png' },
    statusId: 'Active',
    commission: { commission: 5.5 },
    categories: [
      { id: '1', name: 'E-commerce' },
      { id: '2', name: 'Electronics' },
    ],
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Nike',
    logo: { url: '/images/nike-logo.png' },
    statusId: 'Active',
    commission: { commission: 7.0 },
    categories: [{ id: '3', name: 'Sports' }],
    createdAt: '2024-02-20T14:45:00Z',
  },
];

const renderCategoriesCell = ({ value }: { value: AdvertiserRow }) => {
  return value.categories && value.categories.length > 0 ? (
    <div className="flex flex-wrap gap-1">
      {value.categories.map((category) => (
        <Badge key={category.id} variant="soft">
          {category.name}
        </Badge>
      ))}
    </div>
  ) : (
    <span className="text-neutral-500">-</span>
  );
};

const renderLogoCell = ({ value }: { value: AdvertiserRow }) => {
  return value.logo?.url ? (
    <Image
      src={value.logo.url}
      alt={value.name}
      width={50}
      height={50}
      className="object-contain"
    />
  ) : (
    <span className="text-neutral-500">-</span>
  );
};

const renderCommissionCell = ({ value }: { value: AdvertiserRow }) => {
  return value.commission?.commission
    ? `${value.commission.commission}%`
    : 'N/A';
};

const renderDateCell = ({ value }: { value: AdvertiserRow }) => {
  return new Date(value.createdAt).toLocaleDateString();
};

const renderStatusCell = ({
  value,
  dictionary,
}: {
  value: AdvertiserRow;
  dictionary: {
    active: string;
    inactive: string;
  };
}) => {
  return (
    <Badge>
      {value.statusId === 'Active' ? dictionary.active : dictionary.inactive}
    </Badge>
  );
};

const renderActionCell = ({
  value,
  lang,
}: {
  value: AdvertiserRow;
  lang: string;
}) => {
  return (
    <Link href={`/${lang}/admin/advertiser/${value.id}/edit`}>
      <IconButton aria-label="Edit advertiser">
        <LuPen />
      </IconButton>
    </Link>
  );
};

export const AdminAdvertiserTable = ({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: {
    nameLabel: string;
    categoriesLabel: string;
    logoLabel: string;
    commissionLabel: string;
    createdAtLabel: string;
    statusLabel: string;
    actionLabel: string;
    active: string;
    inactive: string;
  };
}) => {
  const [page, setPage] = useState(1);
  const [isLoading] = useState(false);

  const handlePaginationChange = useCallback(({ page }: { page: number }) => {
    setPage(page);
  }, []);

  const columns = useMemo(
    () => [
      {
        label: dictionary.nameLabel,
        dataKey: 'name' as keyof AdvertiserRow,
      },
      {
        label: dictionary.categoriesLabel,
        dataKey: undefined,
        renderCell: renderCategoriesCell,
      },
      {
        label: dictionary.logoLabel,
        dataKey: undefined,
        renderCell: renderLogoCell,
      },
      {
        label: dictionary.commissionLabel,
        dataKey: undefined,
        renderCell: renderCommissionCell,
      },
      {
        label: dictionary.createdAtLabel,
        dataKey: undefined,
        renderCell: renderDateCell,
      },
      {
        label: dictionary.statusLabel,
        dataKey: undefined,
        renderCell: (props: { value: AdvertiserRow }) =>
          renderStatusCell({ ...props, dictionary }),
      },
      {
        label: dictionary.actionLabel,
        dataKey: undefined,
        renderCell: (props: { value: AdvertiserRow }) =>
          renderActionCell({ ...props, lang }),
      },
    ],
    [dictionary, lang],
  );

  return (
    <DataTable<AdvertiserRow, keyof AdvertiserRow>
      data={DUMMY_DATA}
      isLoading={isLoading}
      totalCount={DUMMY_DATA.length}
      pageSize={10}
      page={page}
      onPaginationChange={handlePaginationChange}
      columns={columns}
    />
  );
};
```

- SHOULD use `dayjs(date).format("lll")` for date formatting.
- SHOULD use `server` components for data fetching and rendering.
- SHOULD use `client` components for interactive UI elements.
- SHOULD document props with JSDoc comments and examples:

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

- SHOULD create skeleton loaders for loading states.

### Storybook

- MUST create a story for each component.
- MUST use the `AllVariants` story pattern to showcase all states and variations. Unless the components have complex interactions that require individual stories like Dialog and Drawer.
- SHOULD document the component's props and usage examples within the story.
- SHOULD be well-organized with clear sections and headings for different variants.

### CSS Styling

- MUST use Tailwind CSS for styling.
- MUST use responsive design principles and utility classes.
- MUST use the `@apply` directive for complex styles in `src/styles/globals.css`.
- MUST use the centralized color system in `src/components/utils/component-colors.ts`.

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
  CARD_COLORS,
  BUTTON_COLORS
} from '../utils/component-colors';

// ✅ GOOD: Using standardized utilities
className={getCardColors()}
className={SURFACE_COLORS.elevated}
className={`${TEXT_COLORS.primary} ${BORDER_COLORS.default}`}

// ❌ BAD: Hardcoded colors
className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
```

- MUST use available colours only as shown below.

```markdown
- **Primary Colors** (Blue-based brand colors):
  - `primary-50` to `primary-900` - Use for buttons, links, focus states, selections
  - Main brand color: `primary-500` (`bg-primary-500`, `text-primary-500`)

- **Neutral Colors** (Gray scale for UI framework):

  **Light Mode Values (RGB):**
  - `neutral-50` (252, 252, 252) - Page backgrounds, subtle off-white surfaces (`bg-neutral-50`)
  - `neutral-100` (245, 245, 245) - Elevated surfaces, very light dividers (`bg-neutral-100`)
  - `neutral-200` (229, 229, 229) - Default borders, dividers, disabled states (`border-neutral-200`)
  - `neutral-300` (212, 212, 212) - Strong borders, emphasized borders (`border-neutral-300`)
  - `neutral-400` (163, 163, 163) - Disabled text, placeholders, very low contrast (`text-neutral-400`)
  - `neutral-500` (115, 115, 115) - Muted text, secondary text, icons (`text-neutral-500`)
  - `neutral-600` (82, 82, 82) - Medium emphasis text, subheadings (`text-neutral-600`)
  - `neutral-700` (64, 64, 64) - Secondary text, descriptions (`text-neutral-700`)
  - `neutral-800` (38, 38, 38) - High contrast text, heavy emphasis (`text-neutral-800`)
  - `neutral-900` (23, 23, 23) - Primary text, highest contrast, headings (`text-neutral-900`)

  **Dark Mode Values (RGB) - Smart Inversion:**
  - `neutral-50` (23, 23, 23) - Darkest background for page backgrounds (`bg-neutral-50`)
  - `neutral-100` (38, 38, 38) - Main card/panel backgrounds in dark mode (`bg-neutral-100`)
  - `neutral-200` (64, 64, 64) - Elevated backgrounds, subtle borders (`bg-neutral-200`)
  - `neutral-300` (82, 82, 82) - Default borders visible on dark backgrounds (`border-neutral-300`)
  - `neutral-400` (115, 115, 115) - Disabled text, low contrast in dark mode (`text-neutral-400`)
  - `neutral-500` (163, 163, 163) - Muted text, readable secondary text (`text-neutral-500`)
  - `neutral-600` (212, 212, 212) - Medium emphasis text in dark mode (`text-neutral-600`)
  - `neutral-700` (229, 229, 229) - Important secondary text in dark mode (`text-neutral-700`)
  - `neutral-800` (245, 245, 245) - High contrast text in dark mode (`text-neutral-800`)
  - `neutral-900` (250, 250, 250) - Primary text, highest contrast in dark mode (`text-neutral-900`)

  **Usage Guidelines:**
  - Same Tailwind class produces different colors in light vs dark mode (smart inversion)
  - Always test components in both themes using centralized color utilities
  - Use `SURFACE_COLORS`, `TEXT_COLORS`, `BORDER_COLORS` from `component-colors.ts` for consistency

- **Status Colors**:
  - **Success**: `success-100` (backgrounds), `success-500` (buttons/text), `success-600` (borders)
  - **Error**: `error-100` (backgrounds), `error-500` (destructive actions), `error-600` (borders)
  - **Warning**: `warning-100` (backgrounds), `warning-500` (indicators), `warning-600` (borders)
  - **Info**: `info-100` (backgrounds), `info-500` (informational), `info-600` (borders)

- **White**: `white` - Pure white for elevated surfaces and backgrounds
```

- SHOULD avoid introducing new arbitrary colors unless first added to the centralized color system.
- SHOULD avoid using custom CSS unless absolutely necessary.

### Dark Mode Third-Party Component Styling

When styling third-party components (like react-day-picker) that have their own dark mode classes, avoid mixing `dark:` variants with component-specific dark mode selectors.

**❌ WRONG - Mixed dark mode contexts:**

```css
.rdp-dark-mode .rdp-day {
  @apply text-neutral-900 dark:text-neutral-200; /* Conflict: already in dark mode */
}
```

**✅ CORRECT - Direct colors for component dark mode:**

```css
.rdp-dark-mode .rdp-day {
  @apply text-neutral-200; /* Direct color, no dark: variant needed */
}

.rdp-dark-mode .rdp-day:hover:not(.rdp-disabled):not(.rdp-selected) {
  @apply bg-neutral-700 text-white;
}
```

**Key Principles:**

- Third-party dark mode classes (`.rdp-dark-mode`, `.dark-theme`, etc.) are already dark contexts
- Use direct colors (e.g., `text-neutral-200`) instead of `dark:text-neutral-200`
- Test thoroughly in both light and dark modes
- Reference the neutral color values above to ensure proper contrast

### GraphQL

- MUST add `Resolver` suffix for all resolver classes.
- MUST add `Input` suffix for all input types.
- MUST add `Args` suffix for all argument types.
- MUST use `@Permission` decorator for all admin routes to enforce access control.

```typescript
import { PermissionEnum } from '@prisma/client';
import { Permission } from 'src/role/role.decorator';
import { UpdateAdvertiserInput } from './advertiser.input';
import { Advertiser } from './advertiser.model';

@Resolver(() => Advertiser)
class AdvertiserResolver {
  @Mutation(() => Advertiser)
  @Permission(PermissionEnum.ManageAdvertiser) // MUST include permission check
  async updateAdvertiser(
    @Args('input') updateAdvertiserInput: UpdateAdvertiserInput,
  ): Promise<Advertiser> {
    // Implementation
    return {} as Advertiser;
  }
}
```

- MUST use `PrismaClient` for all database interactions.
- MUST not use `PrismaService` in resolvers.
- MUST use `AuthService.getAcceptLanguage()` to get the user's preferred language.
- MUST use `AuthService.getCurrentUser()` to get the current user that is making the request. The user has type of `ISessionUser`.

```typescript
// ✅ GOOD: Complete resolver implementation
@Resolver(() => UserReferral)
export class ReferralResolver {
  constructor(
    private readonly referralService: ReferralService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserReferral)
  async generateReferralCode(): Promise<UserReferral> {
    const user = this.authService.getCurrentUser(); // ✅ GOOD: Getting current user of type ISessionUser
    const language = this.authService.getAcceptLanguage(); // ✅ GOOD: Getting user's preferred language
    return this.referralService.generateReferralCode(user.id, language);
  }
}
```

```typescript
import { Permission, PermissionEnum, Role } from '@prisma/client';

export interface ISessionUser {
  id: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  referrer: string;
  company?: {
    id: string;
  };
  roles: (Role & { permissions: Permission[] })[];
  permissions: PermissionEnum[];
}
```

- MUST write unit tests for the service layer using Jest.
- SHOULD use `@ResolveField` decorator for all field resolvers.
- SHOULD use `@Public()` decorator for endpoints that don't require authentication

### Prisma (Zenstack)

- MUST design all models with localization in mind.
- MUST use `LanguageEnum` for all language fields.
- MUST use `CurrencyEnum` for all currency fields.
- MUST use `cuid()` for all ID fields.
- MUST use RBAC (Role-Based Access Control) for all data access.

```
model MyModel {
  id                     String          @id @default(cuid())
  userId                 String
  user                   User            @relation("UserMultiplierLogs", fields: [userId], references: [id])
  userEligibilityId      String
  userEligibility        UserEligibility @relation(fields: [userEligibilityId], references: [id])
  purchaseId             String           // References UserCashback.id
  purchase               UserCashback    @relation("CashbackMultiplierLogs", fields: [purchaseId], references: [id])
  multiplierRuleId       String
  multiplierRule         MultiplierRule  @relation(fields: [multiplierRuleId], references: [id])
  originalCashbackAmount Float
  multipliedAmount       Float
  multiplierValue        Float            // Store actual multiplier used (for historical accuracy)
  merchantCallbackId     String?          // For callback correlation
  appliedAt              DateTime        @default(now())
  metadata               Json?            // Store additional context/debugging info

  @@unique([userId, purchaseId]) // Prevent duplicate multiplier applications per user per purchase
  @@index([userId])
  @@index([purchaseId])
  @@index([multiplierRuleId])
  @@index([appliedAt])
  @@index([appliedAt, userId])        // For date-based user reporting
  @@index([userId, appliedAt])        // For user activity timeline queries
  @@index([multiplierRuleId, appliedAt]) // For rule usage analytics

  // Permission rules: Users can only access their own multiplier logs unless they have admin permissions
  @@allow('read',
  // Users can read their own logs
    auth() != null && auth().id == userId
    ||
  // Users with ViewUserEligibility permission can read any log
    auth() != null && auth().roles?[permissions?[name == ViewUserEligibility]]
  )

  @@allow('create,update',
  // Only users with ManageUserEligibility permission can create/update logs
    auth() != null && auth().roles?[permissions?[name == ManageUserEligibility]]
  )
}
```

- MUST create `<Model>Metadata` for storing multilingual fields.

```
model UserWalletStatus {
  id          UserWalletStatusEnum       @id
  description String?
  metadatas   UserWalletStatusMetadata[]
  userWallets UserWallet[]

  @@allow('read', auth() != null)
}

model UserWalletStatusMetadata {
  statusId   UserWalletStatusEnum
  status     UserWalletStatus     @relation(fields: [statusId], references: [id])
  languageId LanguageEnum
  name       String

  @@id([statusId, languageId])
  @@allow('read', auth() != null)
}
```

### Search Engine Optimization

- MUST include meta tags for title, description, and keywords, including language-specific variations.
- MUST use semantic HTML elements
- MUST implement structured data (e.g., JSON-LD)

### Apollo Client

- MUST use Apollo Client for all GraphQL data fetching.
- MUST use `query` to fetch data in server components.

```tsx
// MUST use query for data fetching in server components
import { query } from '@/services/apollo-client-server';
import { GET_EXAMPLE_DATA } from '@/graphql/queries/example-query';

export const ExamplePage = async ({ params }: ServerComponentProps<any>) => {
  const { lang, bonusTypeId } = await params;
  const dictionary = await getDictionary(lang);

  // Fetch supported languages from the backend
  const { data } = await query<ExampleQuery>({
    query: GET_EXAMPLE_DATA,
  });

  return (
    <ExampleClientComponent
      dictionary={dictionary}
      lang={lang}
      data={data.languages}
    />
  );
};
```

- MUST implement proper error handling and loading states.
- MUST use hooks (e.g., `useQuery`, `useMutation`) for data fetching in functional components.
- MUST add `Accept-Language` header to all requests.
- MUST add `Authorization` header with Bearer token for authenticated requests.
- MUST include type definitions for all GraphQL queries and mutations.

```typescript
'use client';

import { gql, useQuery } from '@apollo/client';
import {
  AdminAdvertiserLogoQuery,
  AdminAdvertiserLogoQueryVariables,
} from '@/services/graphql';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

// Define the GraphQL query
const ADVERTISER_QUERY = gql(/* GraphQL */ `
  query AdminAdvertiserLogo($advertiserId: String!) {
    advertiser(advertiserId: $advertiserId) {
      id
      name
      logo {
        url
      }
    }
  }
`);

export const AdminAdvertiserLogo = ({
  advertiserId,
  lang,
}: {
  advertiserId: string;
  lang: string;
}) => {
  const [isError, setIsError] = useState(false);
  const session = useSession();

  const { data, loading } = useQuery<
    AdminAdvertiserLogoQuery, // MUST include Query result type
    AdminAdvertiserLogoQueryVariables // SHOULD include Query variables type
  >(ADVERTISER_QUERY, {
    variables: {
      advertiserId,
    },
    context: {
      headers: {
        'Accept-Language': lang, // MUST add Accept-Language header
        Authorization: `Bearer ${session?.data?.accessToken}`, // MUST add Authorization header
      },
    },
    onError: () => setIsError(true), // MUST implement error handling
  });

  if (loading)
    return <div className="w-6 h-6 bg-neutral-200 rounded animate-pulse" />; // MUST implement loading state
  if (isError || !data?.advertiser?.logo?.url)
    return <div className="w-6 h-6 bg-neutral-100 rounded" />; // MUST implement error state

  return (
    <div className="flex items-center justify-center">
      <Image
        src={data.advertiser.logo.url}
        alt={data.advertiser.name}
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
  );
};
```

### Environment Variables

- MUST update the `.env.template` in `/packages/my-service` if any new environment variables are introduced.
- MUST update the `.env.example` file in `/packages/my-web` if any new environment variables are introduced.

### Localisation

- MUST get supported languages from the database from the server component.
- MUST get default language from the database from the server component.

## Commonly Used CLI Commands

### Workspace Root (Monorepo)

```bash
pnpm install           # Install all workspace dependencies
pnpm build             # Build all packages in correct order (uses Turbo)
pnpm dev               # Start all development servers concurrently
pnpm lint              # Lint all packages
pnpm typecheck         # Type check all packages
pnpm test              # Run tests in all packages
pnpm clean             # Clean build artifacts in all packages
pnpm fresh-install     # Clean install (removes node_modules and reinstalls)
```

### packages/my-web

```bash
cd packages/my-web
pnpm dev              # Next.js development server
pnpm gen:graphql      # Generate GraphQL types after GraphQL changes
pnpm build            # Production build
pnpm typecheck        # Type check
pnpm lint             # Lint code
```

### packages/my-service

```bash
cd packages/my-service
pnpm dev              # Start NestJS development server
pnpm gen:prisma       # Generate Prisma client after *.zmodel changes
pnpm build            # Production build
pnpm test             # Run unit tests
pnpm typecheck        # Type check
pnpm lint             # Lint code
```

### packages/mint-ui

```bash
cd packages/mint-ui
pnpm dev              # Start Storybook development server
pnpm build            # Build library (required before using in my-web)
pnpm typecheck        # Type check
pnpm lint             # Lint code
pnpm chromatic        # Run visual tests
```

### packages/my-functions

```bash
cd packages/my-functions
sam build             # Build SAM application
sam local start-api   # Start local API Gateway
sam deploy            # Deploy to AWS
```

## Development Workflow

You are a principal software engineer experienced in building scalable web applications using modern technologies. You follow best practices and design patterns to ensure code quality and maintainability. The development server all projects will be run manually, you do not need to run the development server for each project.

When working on a new feature or bug fix, follow these steps:

1. Identify the problem or feature request. Clarify the requirements and gather any necessary information. Use research tool like `perplexity` to assist with gathering information. When planning for frontend, you must consider the user interface and user experience for both desktop and mobile.
2. Create a new branch from `main` using `feature/<feature-name>` format.
3. Update the database schema (if any changes are needed) in `/packages/my-service/zenstack/*.zmodel`.
4. Run `pnpm gen:prisma` to generate Prisma client.
5. Develop the backend GraphQL API to support the new feature or changes.
6. After implementing the backend, run `pnpm test:service` to ensure all tests pass for backend GraphQL API. All tests must be passing before proceeding.
7. After implementing the backend, run `pnpm typecheck:all` to ensure all types are correct.
8. (If necessary) Make the changes in `packages/my-functions`.
9. (If necessary) Create a new generic UI component in `packages/mint-ui` to support the new feature or changes.
10. Make changes to the `packages/my-web` for the new feature or changes.
11. When updating any GraphQL queries or mutations, run `pnpm gen:graphql` inside `/packages/my-web` to generate GraphQL types. Make sure the `my-service` development server is running before running the command.
