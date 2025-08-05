# Product Requirements Document: Welcome Bonus System

## Document Information

- **Feature Name**: Welcome Bonus System
- **Document Version**: 1.1
- **Created Date**: August 3, 2025
- **Last Updated**: August 4, 2025
- **Product Manager**: [TBD]
- **Engineering Lead**: [TBD]
- **GitHub Issue**: [#2](https://github.com/tekminewe/my-workspace/issues/2)

## Executive Summary

The Welcome Bonus System is a foundational user acquisition feature that provides new users with an achievement-based bonus that they can claim after earning equivalent cashback through actual platform usage. This gamified approach encourages genuine engagement, reduces fraud, and ensures users understand the platform's value before receiving rewards. The feature transforms from immediate gratification to earned achievement, creating better user quality and retention.

## Background & Context

### Problem Statement

New users joining cashback platforms often experience hesitation about making their first purchase due to uncertainty about the service's legitimacy and value proposition. Traditional immediate bonuses can be abused by fraudulent signups and don't ensure genuine user engagement. Without earned value demonstration, users may claim bonuses without understanding the platform's core benefits, leading to low retention and high acquisition costs.

### Current State

- Users must complete signup and make a purchase before seeing any cashback value
- No immediate incentive for new user activation
- High drop-off rates between signup and first purchase
- Limited tools for acquisition campaigns
- Risk of bonus abuse from fraudulent signups
- No requirement for users to understand platform value before receiving rewards

### Strategic Goals

- Reduce time-to-value for new users
- Increase signup-to-first-purchase conversion rates
- Establish trust and credibility early in user journey
- Create viral growth through positive early experiences

## Product Vision & Objectives

### Vision Statement

Provide every new user with immediate, tangible value that demonstrates our platform's benefits while incentivizing meaningful engagement and first purchases through an achievement-based reward system.

### Success Criteria

- **Primary**: 25% increase in signup-to-first-purchase conversion rate
- **Secondary**: 15% improvement in 30-day user retention
- **Operational**: Maintain fraud rate below 2% of total bonuses granted
- **Engagement**: 80% of users who earn the threshold amount proceed to claim their bonus

### Key Performance Indicators (KPIs)

- Bonus utilization rate (target: >60%)
- Time from signup to first purchase (target: <7 days)
- User lifetime value for bonus recipients vs. non-recipients
- Cost per acquisition reduction (target: 20%)

## User Personas & Use Cases

### Primary Persona: Deal-Seeking Sarah

- **Demographics**: 25-45, budget-conscious, shops online 2-3x/month
- **Behavior**: Compares prices, seeks deals, shares savings with friends
- **Pain Points**: Skeptical of new platforms, wants immediate value proof
- **Use Case**: Signs up after seeing referral link, needs immediate confidence boost

### Secondary Persona: Cautious Carl

- **Demographics**: 35-55, methodical decision-maker, values security
- **Behavior**: Researches thoroughly before committing, prefers known brands
- **Pain Points**: Concerned about legitimacy, wants risk-free trial
- **Use Case**: Discovers platform through advertising, needs trust-building

## Feature Requirements

### Core Functionality

#### Welcome Bonus Grant System

- **Requirement**: Grant achievement-based bonus when user earns equivalent cashback amount
- **Acceptance Criteria**:
  - Bonus amount configurable via admin console
  - Uses site's default currency setting
  - User must earn cashback equal to bonus amount before claiming
  - Bonus displays as "unlocked" achievement when threshold reached
  - Direct wallet credit upon claiming (no voucher system)
  - Wallet transaction log entry created for audit trail
- **Priority**: Must Have

#### Fraud Prevention

- **Requirement**: Prevent abuse through multiple accounts or fake signups
- **Acceptance Criteria**:
  - One bonus per email address
  - Device fingerprinting to detect duplicate devices
  - Email domain validation to block disposable emails
  - IP-based geographic restrictions (if applicable)
- **Priority**: Must Have

#### Bonus Expiration Management

- **Requirement**: Welcome bonuses have unlimited expiration (no time limit)
- **Acceptance Criteria**:
  - Welcome bonuses never expire automatically
  - Clear indication in UI that bonus does not expire
  - Admin can manually revoke bonuses if needed
  - Future expiration functionality can be added via admin configuration
- **Priority**: Must Have

#### Admin Configuration

- **Requirement**: Allow administrators to configure bonus parameters
- **Acceptance Criteria**:
  - Bonus amount configuration
  - Expiration period settings (future feature)
  - Enable/disable bonus program
  - Fraud prevention threshold adjustments
- **Priority**: Should Have

### User Experience Requirements

#### Dedicated Bonus Page

- **Requirement**: Create a centralized bonus page where users can view and claim all available bonuses
- **Acceptance Criteria**:
  - Dedicated `/bonuses` route displaying all user bonuses
  - Welcome bonus prominently featured with progress tracking
  - Clear bonus status indicators (Active, Eligible, Claimed)
  - One-click bonus claiming functionality
  - Bonus history and transaction records
  - Mobile-responsive design with intuitive navigation
  - Future-ready for multiple bonus types (referral, seasonal, etc.)
- **Priority**: Must Have

#### In-App Notification System

- **Requirement**: Implement in-app notification center for bonus-related updates
- **Acceptance Criteria**:
  - Notification center accessible from main navigation
  - Welcome bonus notification created automatically on user signup
  - Notification shows bonus amount and earning requirement
  - Clicking notification navigates to bonus page
  - Notification marked as read when clicked
  - Push-style notifications for bonus eligibility and milestones
  - Notification persistence across user sessions
  - Unread notification count indicator
- **Priority**: Must Have

#### Onboarding Integration

- **Requirement**: Seamlessly integrate bonus achievement into new user flow
- **Acceptance Criteria**:
  - Bonus achievement announcement during signup process
  - Clear explanation of earning requirement
  - Progress tracking prominently displayed in dashboard
  - Celebration UI when bonus becomes claimable
  - Integration with existing onboarding steps
  - Automatic notification creation on signup
- **Priority**: Must Have

#### Visual Design

- **Requirement**: Create engaging achievement-based bonus presentation
- **Acceptance Criteria**:
  - Progress bar showing cashback earned toward bonus threshold
  - Achievement badge system for unlocked bonus
  - Clear monetary value display with site currency
  - Celebratory animation when bonus becomes claimable
  - Trust indicators and clear terms
  - Mobile-responsive design
- **Priority**: Must Have

## Technical Requirements

### Frontend Implementation (my-web)

#### GraphQL Code Generation

Update your `codegen.ts` to include the new welcome bonus types:

**codegen.ts** (ensure schema includes welcome bonus operations)

```yaml
generates:
  src/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withHOC: false
      withComponent: false
```

#### GraphQL Queries and Mutations

**graphql/welcome-bonus.graphql**

```graphql
query GetUserWelcomeBonus($userId: String!) {
  userWelcomeBonus(userId: $userId) {
    id
    bonusAmount
    currencyId
    thresholdAmount
    earnedAmount
    grantedAt
    eligibleAt
    claimedAt
    expiresAt
    statusId
  }
}

query GetWelcomeBonusSettings {
  welcomeBonusSettings {
    id
    bonusAmount
    currencyId
    expirationDays
    enabled
    fraudDetectionEnabled
    maxDailyGrants
  }
}

mutation ClaimWelcomeBonus($input: ClaimWelcomeBonusInput!) {
  claimWelcomeBonus(input: $input) {
    id
    bonusAmount
    currencyId
    claimedAt
    statusId
  }
}

mutation UpdateWelcomeBonusSettings($input: UpdateWelcomeBonusSettingsInput!) {
  updateWelcomeBonusSettings(input: $input) {
    id
    bonusAmount
    currencyId
    expirationDays
    enabled
  }
}
```

#### React Components

**components/welcome-bonus/WelcomeBonusAchievement.tsx**

```typescript
'use client';

import { useGetUserWelcomeBonusQuery } from '@/graphql/generated';
import { useSession } from 'next-auth/react';
import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';
import { BonusProgressBar } from './BonusProgressBar';
import { BonusClaimModal } from './BonusClaimModal';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import { WelcomeBonusStatusEnum } from '@/graphql/generated';

export function WelcomeBonusAchievement() {
  const { data: session } = useSession();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const { data, loading, error } = useGetUserWelcomeBonusQuery({
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
  });

  if (loading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-2 w-full mb-4" />
        <Skeleton className="h-10 w-32" />
      </Card>
    );
  }

  if (error || !data?.userWelcomeBonus) {
    return null; // No bonus or error loading
  }

  const bonus = data.userWelcomeBonus;
  const progressPercentage = Math.min(
    (bonus.earnedAmount / bonus.thresholdAmount) * 100,
    100,
  );

  const getStatusBadge = () => {
    switch (bonus.statusId) {
      case WelcomeBonusStatusEnum.Active:
        return <Badge variant="secondary">In Progress</Badge>;
      case WelcomeBonusStatusEnum.Eligible:
        return <Badge variant="success">Ready to Claim!</Badge>;
      case WelcomeBonusStatusEnum.Claimed:
        return <Badge variant="default">Claimed</Badge>;
      case WelcomeBonusStatusEnum.Expired:
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return null;
    }
  };

  const isExpiringSoon = () => {
    const daysUntilExpiry = Math.ceil(
      (new Date(bonus.expiresAt).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  return (
    <>
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Welcome Bonus Challenge
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Earn {formatCurrency(bonus.thresholdAmount, bonus.currencyId)} to
              unlock your {formatCurrency(bonus.bonusAmount, bonus.currencyId)}{' '}
              bonus!
            </p>
          </div>
          {getStatusBadge()}
        </div>

        <BonusProgressBar
          earnedAmount={bonus.earnedAmount}
          thresholdAmount={bonus.thresholdAmount}
          currency={bonus.currencyId}
          progressPercentage={progressPercentage}
        />

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {bonus.statusId === WelcomeBonusStatusEnum.Claimed ? (
              `Claimed on ${new Date(bonus.claimedAt!).toLocaleDateString()}`
            ) : (
              <>
                Expires {new Date(bonus.expiresAt).toLocaleDateString()}
                {isExpiringSoon() && (
                  <span className="text-amber-600 dark:text-amber-400 ml-2">
                    ⚠️ Expiring soon!
                  </span>
                )}
              </>
            )}
          </div>

          {bonus.statusId === WelcomeBonusStatusEnum.Eligible && (
            <Button
              onClick={() => setIsClaimModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Claim {formatCurrency(bonus.bonusAmount, bonus.currencyId)}
            </Button>
          )}
        </div>
      </Card>

      <BonusClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        bonus={bonus}
      />
    </>
  );
}
```

**components/welcome-bonus/BonusProgressBar.tsx**

```typescript
import { formatCurrency } from '@/lib/utils';
import { CurrencyEnum } from '@/graphql/generated';

interface BonusProgressBarProps {
  earnedAmount: number;
  thresholdAmount: number;
  currency: CurrencyEnum;
  progressPercentage: number;
}

export function BonusProgressBar({
  earnedAmount,
  thresholdAmount,
  currency,
  progressPercentage,
}: BonusProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">Progress</span>
        <span className="font-medium">
          {formatCurrency(earnedAmount, currency)} /{' '}
          {formatCurrency(thresholdAmount, currency)}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="text-right text-xs text-gray-500 dark:text-gray-400">
        {progressPercentage.toFixed(1)}% complete
      </div>
    </div>
  );
}
```

**components/welcome-bonus/BonusClaimModal.tsx**

```typescript
'use client';

import { useState } from 'react';
import { useClaimWelcomeBonusMutation } from '@/graphql/generated';
import { Dialog } from '@tekminewe/mint-ui/dialog';
import { Button } from '@tekminewe/mint-ui/button';
import { Spinner } from '@tekminewe/mint-ui/spinner';
import { formatCurrency } from '@/lib/utils';
import { toast } from '@tekminewe/mint-ui/toast';
import { UserWelcomeBonus } from '@/graphql/generated';

interface BonusClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  bonus: UserWelcomeBonus;
}

export function BonusClaimModal({
  isOpen,
  onClose,
  bonus,
}: BonusClaimModalProps) {
  const [isclaiming, setIsclaiming] = useState(false);

  const [claimWelcomeBonus] = useClaimWelcomeBonusMutation({
    onCompleted: () => {
      toast.success(
        `Successfully claimed ${formatCurrency(
          bonus.bonusAmount,
          bonus.currencyId,
        )}!`,
      );
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to claim bonus: ${error.message}`);
      setIsClaming(false);
    },
    refetchQueries: ['GetUserWelcomeBonus'],
  });

  const handleClaim = async () => {
    setIsClaming(true);
    try {
      await claimWelcomeBonus({
        variables: {
          input: { userId: bonus.userId },
        },
      });
    } catch (error) {
      // Error handled by onError callback
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Congratulations!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You've earned enough cashback to claim your welcome bonus!
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">
            {formatCurrency(bonus.bonusAmount, bonus.currencyId)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Will be added to your wallet immediately
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isClaming}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleClaim}
            disabled={isClaming}
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isClaming ? (
              <>
                <Spinner className="w-4 h-4 mr-2" />
                Claiming...
              </>
            ) : (
              'Claim Bonus'
            )}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
```

#### Pages and Routes

**app/bonus/welcome/page.tsx**

```typescript
import { WelcomeBonusAchievement } from '@/components/welcome-bonus/WelcomeBonusAchievement';
import { Card } from '@tekminewe/mint-ui/card';

export default function WelcomeBonusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome Bonus Challenge
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn cashback to unlock your welcome bonus and boost your savings!
          </p>
        </div>

        <WelcomeBonusAchievement />

        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                1
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Shop through our platform and earn cashback from your purchases
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                2
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Once you've earned enough cashback, your bonus becomes available
                to claim
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                3
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Claim your bonus and it's instantly added to your wallet balance
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

#### Integration with Existing Dashboard

**app/dashboard/page.tsx** (add to existing dashboard)

```typescript
import { WelcomeBonusAchievement } from '@/components/welcome-bonus/WelcomeBonusAchievement';
// ... other imports

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Existing dashboard content */}

      {/* Add welcome bonus section */}
      <div className="mb-8">
        <WelcomeBonusAchievement />
      </div>

      {/* Rest of dashboard */}
    </div>
  );
}
```

**app/bonuses/page.tsx**

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { useGetUserWelcomeBonusQuery } from '@/graphql/generated';
import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';
import { BonusProgressBar } from '@/components/welcome-bonus/BonusProgressBar';
import { BonusClaimModal } from '@/components/welcome-bonus/BonusClaimModal';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import { WelcomeBonusStatusEnum } from '@/graphql/generated';

export default function BonusesPage() {
  const { data: session } = useSession();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const { data, loading, error } = useGetUserWelcomeBonusQuery({
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Your Bonuses</h1>
        <div className="grid gap-6">
          <Card className="p-6">
            <Skeleton className="h-4 w-48 mb-4" />
            <Skeleton className="h-2 w-full mb-4" />
            <Skeleton className="h-10 w-32" />
          </Card>
        </div>
      </div>
    );
  }

  const bonus = data?.userWelcomeBonus;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Bonuses</h1>

      <div className="grid gap-6">
        {/* Welcome Bonus Card */}
        {bonus && (
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome Bonus</h2>
                <p className="text-sm text-muted-foreground">
                  Complete your first deposits to unlock this bonus
                </p>
              </div>
              <div className="flex items-center gap-2">
                {bonus.statusId === 'ELIGIBLE' && (
                  <Badge variant="success">Ready to Claim!</Badge>
                )}
                {bonus.statusId === 'ACTIVE' && (
                  <Badge variant="secondary">In Progress</Badge>
                )}
                {bonus.statusId === 'CLAIMED' && (
                  <Badge variant="default">Claimed</Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <BonusProgressBar
                earnedAmount={bonus.earnedAmount}
                thresholdAmount={bonus.thresholdAmount}
                currency={bonus.currencyId}
                progressPercentage={Math.min(
                  (bonus.earnedAmount / bonus.thresholdAmount) * 100,
                  100,
                )}
              />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(bonus.bonusAmount, bonus.currencyId)}
                  </p>
                  <p className="text-sm text-muted-foreground">Bonus Amount</p>
                </div>

                {bonus.statusId === 'ELIGIBLE' && (
                  <Button onClick={() => setIsClaimModalOpen(true)} size="lg">
                    Claim Bonus
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Future bonuses can be added here */}
        {!bonus && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              No bonuses available at the moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back later for new bonus opportunities!
            </p>
          </Card>
        )}
      </div>

      {bonus && (
        <BonusClaimModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          bonus={bonus}
        />
      )}
    </div>
  );
}
```

**components/notifications/NotificationCenter.tsx**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  useGetUserNotificationsQuery,
  useGetUnreadNotificationsCountQuery,
  useMarkNotificationAsReadMutation,
  useDismissNotificationMutation,
} from '@/graphql/generated';
import { Bell, X, Check } from 'lucide-react';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';
import { Card } from '@tekminewe/mint-ui/card';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@tekminewe/mint-ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

export function NotificationCenter() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data: countData } = useGetUnreadNotificationsCountQuery({
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
    pollInterval: 30000, // Poll every 30 seconds for new notifications
  });

  const {
    data: notificationsData,
    loading,
    refetch,
  } = useGetUserNotificationsQuery({
    variables: {
      userId: session?.user?.id || '',
      limit: 10,
      offset: 0,
    },
    skip: !session?.user?.id || !isOpen,
  });

  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [dismissNotification] = useDismissNotificationMutation();

  const unreadCount = countData?.unreadNotificationsCount || 0;
  const notifications = notificationsData?.userNotifications || [];

  const handleNotificationClick = async (notification: any) => {
    if (!notification.isRead) {
      await markAsRead({
        variables: { notificationId: notification.id },
      });
      refetch();
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
      setIsOpen(false);
    }
  };

  const handleDismiss = async (
    notificationId: string,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    await dismissNotification({
      variables: { notificationId },
    });
    refetch();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-96 overflow-y-auto"
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread
            </p>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-accent/50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {notification.type.iconUrl && (
                          <img
                            src={notification.type.iconUrl}
                            alt=""
                            className="w-4 h-4"
                          />
                        )}
                        <h4 className="font-medium text-sm truncate">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </div>

                      {notification.message && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {notification.message}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            },
                          )}
                        </span>

                        {notification.actionText && (
                          <span className="text-xs text-blue-600 font-medium">
                            {notification.actionText}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => handleDismiss(notification.id, e)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => {
                router.push('/notifications');
                setIsOpen(false);
              }}
            >
              View All Notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Backend Implementation (my-service)

#### Zenstack Schema Updates

Add to your existing schema files:

**zenstack/welcome-bonus.zmodel**

```zmodel
import "./auth.zmodel"
import "./currency.zmodel"
import "./wallet.zmodel"
import "./site.zmodel"
import "./language.zmodel"

enum WelcomeBonusStatusEnum {
  Active
  Eligible
  Claimed
  Expired
  Revoked
}

model WelcomeBonusStatus {
  id          WelcomeBonusStatusEnum       @id
  description String?
  metadatas   WelcomeBonusStatusMetadata[]
  bonuses     UserWelcomeBonus[]

  @@allow('read', auth() != null)
}

model WelcomeBonusStatusMetadata {
  statusId   WelcomeBonusStatusEnum
  status     WelcomeBonusStatus     @relation(fields: [statusId], references: [id])
  languageId LanguageEnum
  name       String

  @@id([statusId, languageId])
  @@allow('read', auth() != null)
}

model UserWelcomeBonus {
  id                    String                     @id @default(cuid())
  userId                String
  user                  User                       @relation(fields: [userId], references: [id])
  bonusAmount           Float
  currencyId            CurrencyEnum
  currency              Currency                   @relation(fields: [currencyId], references: [id])
  thresholdAmount       Float                      // Amount user must earn to claim
  earnedAmount          Float                      @default(0) // Current cashback earned
  grantedAt             DateTime                   @default(now())
  eligibleAt            DateTime?                  // When threshold was reached
  claimedAt             DateTime?                  // When bonus was claimed
  // Note: No expiration - welcome bonuses never expire
  statusId              WelcomeBonusStatusEnum     @default(Active)
  status                WelcomeBonusStatus         @relation(fields: [statusId], references: [id])
  sourceIp              String?
  deviceFingerprint     String?
  walletTransactionId   String?                    // Link to wallet credit
  walletTransaction     UserWalletTransactionLog?  @relation(fields: [walletTransactionId], references: [id])
  notes                 String?
  createdAt             DateTime                   @default(now())
  updatedAt             DateTime                   @updatedAt

  @@unique([userId]) // One bonus per user (except revoked)
  @@index([statusId])
  @@allow('create', auth() != null)
  @@allow('read,update', auth().id == userId || auth().roles?[permissions?[name == ManageUsers]])
}

// Add to SiteSettings model
model WelcomeBonusSettings {
  id                      String       @id @default(cuid())
  siteId                  String       @unique
  site                    Site         @relation(fields: [siteId], references: [id])
  bonusAmount             Float        @default(5.00)
  currencyId              CurrencyEnum @default(MYR)
  currency                Currency     @relation(fields: [currencyId], references: [id])
  // Note: No expiration setting - welcome bonuses never expire by default
  enabled                 Boolean      @default(true)
  fraudDetectionEnabled   Boolean      @default(true)
  maxDailyGrants          Int?         @default(1000)
  createdAt               DateTime     @default(now())
  updatedAt               DateTime     @updatedAt

  @@allow('read', auth() != null)
  @@allow('create,update', auth().roles?[permissions?[name == ManageSite]])
}

// In-App Notification System
enum NotificationTypeEnum {
  WelcomeBonus
  BonusEligible
  BonusClaimed
  General
}

enum NotificationStatusEnum {
  Unread
  Read
  Dismissed
}

model NotificationType {
  id            NotificationTypeEnum         @id
  description   String?
  metadatas     NotificationTypeMetadata[]
  notifications UserNotification[]

  @@allow('read', auth() != null)
}

model NotificationTypeMetadata {
  typeId     NotificationTypeEnum
  type       NotificationType     @relation(fields: [typeId], references: [id])
  languageId LanguageEnum
  name       String
  titleTemplate    String?        // Template for notification title (e.g., "Welcome Bonus Available!")
  messageTemplate  String?        // Template for notification message (e.g., "Earn {{amount}} cashback to unlock your {{bonusAmount}} bonus")
  actionText       String?        // Localized action text (e.g., "View Bonus", "Claim Now")

  @@id([typeId, languageId])
  @@allow('read', auth() != null)
}

model NotificationStatus {
  id            NotificationStatusEnum         @id
  description   String?
  metadatas     NotificationStatusMetadata[]
  notifications UserNotification[]

  @@allow('read', auth() != null)
}

model NotificationStatusMetadata {
  statusId   NotificationStatusEnum
  status     NotificationStatus     @relation(fields: [statusId], references: [id])
  languageId LanguageEnum
  name       String

  @@id([statusId, languageId])
  @@allow('read', auth() != null)
}

model UserNotification {
  id            String                   @id @default(cuid())
  userId        String
  user          User                     @relation(fields: [userId], references: [id])
  typeId        NotificationTypeEnum
  type          NotificationType         @relation(fields: [typeId], references: [id])
  statusId      NotificationStatusEnum   @default(Unread)
  status        NotificationStatus       @relation(fields: [statusId], references: [id])
  languageId    LanguageEnum             // User's language for localization
  language      Language                 @relation(fields: [languageId], references: [id])
  title         String                   // Localized title (generated from template)
  message       String?                  // Localized message (generated from template)
  actionText    String?                  // Localized action text (e.g., "View Bonus", "Claim Now")
  actionUrl     String?                  // URL to navigate when clicked
  referenceId   String?                  // Reference to related entity (e.g., bonus ID)
  templateData  Json?                    // Data used for template rendering (bonusAmount, currency, etc.)
  readAt        DateTime?
  dismissedAt   DateTime?
  createdAt     DateTime                 @default(now())
  updatedAt     DateTime                 @updatedAt

  @@index([userId, statusId])
  @@index([createdAt])
  @@allow('create', auth() != null)
  @@allow('read,update', auth().id == userId)
}
```

**Update wallet.zmodel** to add the relationship:

```zmodel
// Add to UserWalletTransactionTypeEnum
enum UserWalletTransactionTypeEnum {
  AffiliateCashback
  Withdrawal
  WelcomeBonus  // Add this new type
}

// Add relationship to UserWalletTransactionLog
model UserWalletTransactionLog {
  // ... existing fields ...
  welcomeBonuses UserWelcomeBonus[] // Add this relationship
}
```

**Update auth.zmodel** to add relationship:

```zmodel
model User {
  // ... existing fields ...
  welcomeBonuses           UserWelcomeBonus[]
  notifications            UserNotification[]
}
```

**Update site.zmodel** to add relationship:

```zmodel
model Site {
  // ... existing fields ...
  welcomeBonusSettings     WelcomeBonusSettings?
}
```

**Update currency.zmodel** to add relationship:

```zmodel
model Currency {
  // ... existing fields ...
  welcomeBonuses           UserWelcomeBonus[]
  welcomeBonusSettings     WelcomeBonusSettings[]
}
```

**Update language.zmodel** to add relationship:

```zmodel
model Language {
  // ... existing fields ...
  userNotifications        UserNotification[]
}
```

#### GraphQL Schema Types

**welcome-bonus.model.ts**

```typescript
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { WelcomeBonusStatusEnum, CurrencyEnum } from '@prisma/client';

@ObjectType()
export class UserWelcomeBonus {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Float)
  bonusAmount: number;

  @Field(() => CurrencyEnum)
  currencyId: CurrencyEnum;

  @Field(() => Float)
  thresholdAmount: number;

  @Field(() => Float)
  earnedAmount: number;

  @Field(() => Date)
  grantedAt: Date;

  @Field(() => Date, { nullable: true })
  eligibleAt?: Date;

  @Field(() => Date, { nullable: true })
  claimedAt?: Date;

  // Note: No expiration field - welcome bonuses never expire

  @Field(() => WelcomeBonusStatusEnum)
  statusId: WelcomeBonusStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class WelcomeBonusSettings {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  bonusAmount: number;

  @Field(() => CurrencyEnum)
  currencyId: CurrencyEnum;

  @Field(() => Int)
  expirationDays: number;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Boolean)
  fraudDetectionEnabled: boolean;

  @Field(() => Int, { nullable: true })
  maxDailyGrants?: number;
}

@ObjectType()
export class NotificationType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  iconUrl?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => [UserNotification])
  notifications: UserNotification[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class UserNotification {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  notificationTypeId: string;

  @Field(() => String)
  languageId: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  actionUrl?: string;

  @Field(() => String, { nullable: true })
  actionText?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Boolean)
  isRead: boolean;

  @Field(() => Date, { nullable: true })
  readAt?: Date;

  @Field(() => Date, { nullable: true })
  dismissedAt?: Date;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
```

**welcome-bonus.input.ts**

```typescript
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { CurrencyEnum } from '@prisma/client';

@InputType()
export class UpdateWelcomeBonusSettingsInput {
  @Field(() => Float, { nullable: true })
  bonusAmount?: number;

  @Field(() => CurrencyEnum, { nullable: true })
  currencyId?: CurrencyEnum;

  @Field(() => Int, { nullable: true })
  expirationDays?: number;

  @Field(() => Boolean, { nullable: true })
  enabled?: boolean;

  @Field(() => Boolean, { nullable: true })
  fraudDetectionEnabled?: boolean;

  @Field(() => Int, { nullable: true })
  maxDailyGrants?: number;
}

@InputType()
export class ClaimWelcomeBonusInput {
  @Field(() => String)
  userId: string;
}
```

#### API Endpoints

**GraphQL Resolvers:**

- `Query.userWelcomeBonus(userId: String!): UserWelcomeBonus`
- `Query.welcomeBonusSettings: WelcomeBonusSettings`
- `Query.userNotifications(userId: String!, limit: Int, offset: Int): [UserNotification]`
- `Query.unreadNotificationsCount(userId: String!): Int`
- `Mutation.claimWelcomeBonus(input: ClaimWelcomeBonusInput!): UserWelcomeBonus`
- `Mutation.updateWelcomeBonusProgress(userId: String!, amount: Float!): UserWelcomeBonus`
- `Mutation.markNotificationAsRead(notificationId: String!): UserNotification`
- `Mutation.dismissNotification(notificationId: String!): UserNotification`
- `Mutation.updateWelcomeBonusSettings(input: UpdateWelcomeBonusSettingsInput!): WelcomeBonusSettings`

**REST Endpoints (for backwards compatibility):**

- `GET /api/bonuses/welcome/status/:userId`: Get user's welcome bonus status and progress
- `POST /api/bonuses/welcome/claim`: Claim bonus when threshold reached (creates wallet credit)
- `PUT /api/bonuses/welcome/progress`: Update earned amount (called when user earns cashback)
- `GET /api/admin/bonuses/config`: Get current bonus configuration
- `PUT /api/admin/bonuses/config`: Update bonus settings (amount, currency, expiration)
- `GET /api/admin/bonuses/analytics`: Bonus program analytics and metrics

#### Services Required

- `WelcomeBonusService`: Core achievement-based bonus logic
- `WelcomeBonusResolver`: GraphQL resolver for bonus operations
- Enhanced `WalletService`: Integration for bonus claims and transaction logging
- `CashbackTrackingService`: Monitor user earnings toward bonus threshold
- `FraudPreventionService`: Abuse detection and prevention
- `EmailService`: Bonus-related notifications and achievement alerts (using mailgun.js)
- `AnalyticsService`: Achievement and claim tracking
- `NotificationService`: Localized notification creation and management
- `NotificationLocalizationService`: Template rendering with user's language

#### Service Implementation Examples

**welcome-bonus.service.ts**

```typescript
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';
import { EmailService } from 'src/email/email.service';
import {
  WelcomeBonusStatusEnum,
  UserWalletTransactionTypeEnum,
  CurrencyEnum,
} from '@prisma/client';
import { UpdateWelcomeBonusSettingsInput } from './welcome-bonus.input';

@Injectable()
export class WelcomeBonusService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly walletService: WalletService,
    private readonly emailService: EmailService,
  ) {}

  async createWelcomeBonusForUser(userId: string, siteId: string) {
    const settings = await this.getWelcomeBonusSettings(siteId);
    if (!settings.enabled) {
      throw new BadRequestException('Welcome bonus program is disabled');
    }

    // Check if user already has a bonus
    const existingBonus = await this.db.userWelcomeBonus.findUnique({
      where: { userId },
    });

    if (existingBonus) {
      throw new BadRequestException('User already has a welcome bonus');
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + settings.expirationDays);

    return this.db.userWelcomeBonus.create({
      data: {
        userId,
        bonusAmount: settings.bonusAmount,
        currencyId: settings.currencyId,
        thresholdAmount: settings.bonusAmount, // Must earn equal to bonus amount
        expiresAt,
        statusId: WelcomeBonusStatusEnum.Active,
      },
      include: {
        user: true,
        currency: true,
        status: true,
      },
    });
  }

  async updateEarnedAmount(userId: string, earnedAmount: number) {
    const bonus = await this.db.userWelcomeBonus.findUnique({
      where: {
        userId,
        statusId: WelcomeBonusStatusEnum.Active,
      },
    });

    if (!bonus) {
      return null; // No active bonus for user
    }

    const newEarnedAmount = bonus.earnedAmount + earnedAmount;
    const isEligible = newEarnedAmount >= bonus.thresholdAmount;

    const updatedBonus = await this.db.userWelcomeBonus.update({
      where: { id: bonus.id },
      data: {
        earnedAmount: newEarnedAmount,
        statusId: isEligible ? WelcomeBonusStatusEnum.Eligible : bonus.statusId,
        eligibleAt:
          isEligible && !bonus.eligibleAt ? new Date() : bonus.eligibleAt,
      },
      include: {
        user: true,
        currency: true,
      },
    });

    // Send eligibility notification
    if (isEligible && !bonus.eligibleAt) {
      await this.emailService.sendWelcomeBonusEligible(
        updatedBonus.user.email,
        {
          bonusAmount: updatedBonus.bonusAmount,
          currency: updatedBonus.currency.id,
        },
      );
    }

    return updatedBonus;
  }

  async claimWelcomeBonus(userId: string) {
    return this.db.$transaction(async (tx) => {
      const bonus = await tx.userWelcomeBonus.findUnique({
        where: {
          userId,
          statusId: WelcomeBonusStatusEnum.Eligible,
        },
        include: {
          user: true,
          currency: true,
        },
      });

      if (!bonus) {
        throw new BadRequestException(
          'No eligible welcome bonus found for user',
        );
      }

      if (bonus.expiresAt < new Date()) {
        throw new BadRequestException('Welcome bonus has expired');
      }

      // Get or create user wallet
      const wallet = await this.walletService.getUserWallet(
        {
          userId,
          currency: bonus.currencyId,
        },
        { transaction: tx },
      );

      // Create wallet transaction
      const walletTransaction = await tx.userWalletTransactionLog.create({
        data: {
          walletId: wallet.id,
          currencyId: bonus.currencyId,
          balanceBefore: wallet.balance,
          balanceAfter: wallet.balance + bonus.bonusAmount,
          amount: bonus.bonusAmount,
          typeId: UserWalletTransactionTypeEnum.WelcomeBonus,
          statusId: UserWalletTransactionStatusEnum.Completed,
          description: 'Welcome bonus claim',
          reference: bonus.id,
        },
      });

      // Update wallet balance
      await tx.userWallet.update({
        where: { id: wallet.id },
        data: {
          balance: wallet.balance + bonus.bonusAmount,
        },
      });

      // Update bonus status
      const claimedBonus = await tx.userWelcomeBonus.update({
        where: { id: bonus.id },
        data: {
          statusId: WelcomeBonusStatusEnum.Claimed,
          claimedAt: new Date(),
          walletTransactionId: walletTransaction.id,
        },
        include: {
          user: true,
          currency: true,
        },
      });

      // Send claim confirmation email
      await this.emailService.sendWelcomeBonusClaimed(bonus.user.email, {
        bonusAmount: bonus.bonusAmount,
        currency: bonus.currency.id,
        newBalance: wallet.balance + bonus.bonusAmount,
      });

      return claimedBonus;
    });
  }

  async getWelcomeBonusSettings(siteId: string) {
    const settings = await this.db.welcomeBonusSettings.findUnique({
      where: { siteId },
      include: { currency: true },
    });

    if (!settings) {
      // Create default settings
      return this.db.welcomeBonusSettings.create({
        data: {
          siteId,
          bonusAmount: 5.0,
          currencyId: CurrencyEnum.MYR,
          expirationDays: 180,
          enabled: true,
          fraudDetectionEnabled: true,
          maxDailyGrants: 1000,
        },
        include: { currency: true },
      });
    }

    return settings;
  }

  async updateWelcomeBonusSettings(
    siteId: string,
    input: UpdateWelcomeBonusSettingsInput,
  ) {
    return this.db.welcomeBonusSettings.update({
      where: { siteId },
      data: input,
      include: { currency: true },
    });
  }
}
```

**welcome-bonus.resolver.ts**

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { WelcomeBonusService } from './welcome-bonus.service';
import { AuthService } from 'src/auth/auth.service';
import { SiteService } from 'src/site/site.service';
import { UserWelcomeBonus, WelcomeBonusSettings } from './welcome-bonus.model';
import {
  UpdateWelcomeBonusSettingsInput,
  ClaimWelcomeBonusInput,
} from './welcome-bonus.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequirePermissions } from 'src/auth/permissions.decorator';

@Resolver(() => UserWelcomeBonus)
@UseGuards(JwtAuthGuard)
export class WelcomeBonusResolver {
  constructor(
    private readonly welcomeBonusService: WelcomeBonusService,
    private readonly authService: AuthService,
    private readonly siteService: SiteService,
  ) {}

  @Query(() => UserWelcomeBonus, { nullable: true })
  async userWelcomeBonus(@Args('userId') userId: string) {
    const currentUser = this.authService.getCurrentUser();

    // Users can only view their own bonus, admins can view any
    if (
      currentUser.id !== userId &&
      !this.authService.hasPermission('ManageUsers')
    ) {
      throw new ForbiddenException("Cannot access other user's bonus");
    }

    return this.welcomeBonusService.getUserWelcomeBonus(userId);
  }

  @Query(() => WelcomeBonusSettings)
  async welcomeBonusSettings() {
    const site = await this.siteService.getCurrentSite();
    return this.welcomeBonusService.getWelcomeBonusSettings(site.id);
  }

  @Mutation(() => UserWelcomeBonus)
  async claimWelcomeBonus(@Args('input') input: ClaimWelcomeBonusInput) {
    const currentUser = this.authService.getCurrentUser();

    // Users can only claim their own bonus
    if (currentUser.id !== input.userId) {
      throw new ForbiddenException("Cannot claim other user's bonus");
    }

    return this.welcomeBonusService.claimWelcomeBonus(input.userId);
  }

  @Mutation(() => UserWelcomeBonus)
  async updateWelcomeBonusProgress(
    @Args('userId') userId: string,
    @Args('amount') amount: number,
  ) {
    // This would typically be called internally when user earns cashback
    return this.welcomeBonusService.updateEarnedAmount(userId, amount);
  }

  @Mutation(() => WelcomeBonusSettings)
  @RequirePermissions('ManageSite')
  async updateWelcomeBonusSettings(
    @Args('input') input: UpdateWelcomeBonusSettingsInput,
  ) {
    const site = await this.siteService.getCurrentSite();
    return this.welcomeBonusService.updateWelcomeBonusSettings(site.id, input);
  }
}
```

**notification.service.ts**

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import {
  NotificationTypeEnum,
  NotificationStatusEnum,
  LanguageEnum,
} from '@prisma/client';

interface NotificationTemplateData {
  bonusAmount?: number;
  currency?: string;
  thresholdAmount?: number;
  earnedAmount?: number;
  progressPercentage?: number;
  actionUrl?: string;
  [key: string]: any;
}

@Injectable()
export class NotificationService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createLocalizedNotification(
    userId: string,
    typeId: NotificationTypeEnum,
    templateData: NotificationTemplateData,
    options?: {
      referenceId?: string;
      actionUrl?: string;
    },
  ) {
    // Get user's language preference
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { languageId: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userLanguage = user.languageId || LanguageEnum.EN_US;

    // Get localized templates
    const template = await this.db.notificationTypeMetadata.findUnique({
      where: {
        typeId_languageId: {
          typeId,
          languageId: userLanguage,
        },
      },
    });

    if (!template) {
      throw new Error(`No template found for ${typeId} in ${userLanguage}`);
    }

    // Render templates with data
    const title = this.renderTemplate(
      template.titleTemplate || template.name,
      templateData,
    );
    const message = template.messageTemplate
      ? this.renderTemplate(template.messageTemplate, templateData)
      : null;
    const actionText = template.actionText || null;

    // Create notification
    return this.db.userNotification.create({
      data: {
        userId,
        typeId,
        languageId: userLanguage,
        title,
        message,
        actionText,
        actionUrl: options?.actionUrl,
        referenceId: options?.referenceId,
        templateData: templateData as any, // Store for future re-rendering if needed
      },
      include: {
        type: {
          include: {
            metadatas: {
              where: { languageId: userLanguage },
            },
          },
        },
      },
    });
  }

  private renderTemplate(
    template: string,
    data: NotificationTemplateData,
  ): string {
    let rendered = template;

    // Simple template replacement using {{variable}} syntax
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        rendered = rendered.replace(regex, String(value));
      }
    });

    return rendered;
  }

  async createWelcomeBonusNotification(
    userId: string,
    bonusData: {
      bonusAmount: number;
      currency: string;
      thresholdAmount: number;
    },
  ) {
    return this.createLocalizedNotification(
      userId,
      NotificationTypeEnum.WelcomeBonus,
      {
        bonusAmount: bonusData.bonusAmount,
        currency: bonusData.currency,
        thresholdAmount: bonusData.thresholdAmount,
        progressPercentage: 0,
      },
      {
        actionUrl: '/bonuses',
        referenceId: userId, // Reference to bonus
      },
    );
  }

  async createBonusEligibleNotification(
    userId: string,
    bonusData: {
      bonusAmount: number;
      currency: string;
      bonusId: string;
    },
  ) {
    return this.createLocalizedNotification(
      userId,
      NotificationTypeEnum.BonusEligible,
      {
        bonusAmount: bonusData.bonusAmount,
        currency: bonusData.currency,
      },
      {
        actionUrl: '/bonuses',
        referenceId: bonusData.bonusId,
      },
    );
  }

  async createBonusClaimedNotification(
    userId: string,
    bonusData: {
      bonusAmount: number;
      currency: string;
      bonusId: string;
    },
  ) {
    return this.createLocalizedNotification(
      userId,
      NotificationTypeEnum.BonusClaimed,
      {
        bonusAmount: bonusData.bonusAmount,
        currency: bonusData.currency,
      },
      {
        actionUrl: '/wallet',
        referenceId: bonusData.bonusId,
      },
    );
  }

  async markAsRead(notificationId: string, userId: string) {
    return this.db.userNotification.update({
      where: {
        id: notificationId,
        userId, // Ensure user can only mark their own notifications
      },
      data: {
        statusId: NotificationStatusEnum.Read,
        readAt: new Date(),
      },
    });
  }

  async dismissNotification(notificationId: string, userId: string) {
    return this.db.userNotification.update({
      where: {
        id: notificationId,
        userId, // Ensure user can only dismiss their own notifications
      },
      data: {
        statusId: NotificationStatusEnum.Dismissed,
        dismissedAt: new Date(),
      },
    });
  }

  async getUserNotifications(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
      statusFilter?: NotificationStatusEnum[];
    },
  ) {
    return this.db.userNotification.findMany({
      where: {
        userId,
        statusId: options?.statusFilter
          ? {
              in: options.statusFilter,
            }
          : undefined,
      },
      include: {
        type: {
          include: {
            metadatas: {
              where: {
                languageId: await this.getUserLanguage(userId),
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 20,
      skip: options?.offset || 0,
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.db.userNotification.count({
      where: {
        userId,
        statusId: NotificationStatusEnum.Unread,
      },
    });
  }

  private async getUserLanguage(userId: string): Promise<LanguageEnum> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { languageId: true },
    });
    return user?.languageId || LanguageEnum.EN_US;
  }
}
```

**notification.module.ts**

```typescript
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService],
})
export class NotificationModule {}
```

**welcome-bonus.module.ts**

```typescript
import { Module } from '@nestjs/common';
import { WelcomeBonusService } from './welcome-bonus.service';
import { WelcomeBonusResolver } from './welcome-bonus.resolver';
import { WelcomeBonusController } from './welcome-bonus.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { EmailModule } from 'src/email/email.module';
import { SiteModule } from 'src/site/site.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    WalletModule,
    EmailModule,
    SiteModule,
    NotificationModule, // Add notification support
  ],
  providers: [WelcomeBonusService, WelcomeBonusResolver],
  controllers: [WelcomeBonusController],
  exports: [WelcomeBonusService],
})
export class WelcomeBonusModule {}
```

### Localization & Templates

#### Notification Template Examples

**Default English Templates (EN_US):**

```typescript
// Seed data for NotificationTypeMetadata
const notificationTemplates = [
  // Welcome Bonus Notification
  {
    typeId: 'WelcomeBonus',
    languageId: 'EN_US',
    name: 'Welcome Bonus',
    titleTemplate: 'Welcome Bonus Available! 🎉',
    messageTemplate:
      'Earn {{thresholdAmount}} {{currency}} in cashback to unlock your {{bonusAmount}} {{currency}} welcome bonus!',
    actionText: 'View Bonus',
  },
  {
    typeId: 'WelcomeBonus',
    languageId: 'ZH_CN',
    name: '欢迎奖金',
    titleTemplate: '欢迎奖金可用！🎉',
    messageTemplate:
      '赚取 {{thresholdAmount}} {{currency}} 现金返还以解锁您的 {{bonusAmount}} {{currency}} 欢迎奖金！',
    actionText: '查看奖金',
  },
  {
    typeId: 'WelcomeBonus',
    languageId: 'MS_MY',
    name: 'Bonus Selamat Datang',
    titleTemplate: 'Bonus Selamat Datang Tersedia! 🎉',
    messageTemplate:
      'Peroleh {{thresholdAmount}} {{currency}} cashback untuk membuka bonus selamat datang {{bonusAmount}} {{currency}} anda!',
    actionText: 'Lihat Bonus',
  },

  // Bonus Eligible Notification
  {
    typeId: 'BonusEligible',
    languageId: 'EN_US',
    name: 'Bonus Ready to Claim',
    titleTemplate: 'Congratulations! Your bonus is ready! 🎊',
    messageTemplate:
      "You've earned enough cashback! Your {{bonusAmount}} {{currency}} welcome bonus is now ready to claim.",
    actionText: 'Claim Now',
  },
  {
    typeId: 'BonusEligible',
    languageId: 'ZH_CN',
    name: '奖金准备领取',
    titleTemplate: '恭喜！您的奖金已准备好！🎊',
    messageTemplate:
      '您已赚取足够的现金返还！您的 {{bonusAmount}} {{currency}} 欢迎奖金现在可以领取了。',
    actionText: '立即领取',
  },
  {
    typeId: 'BonusEligible',
    languageId: 'MS_MY',
    name: 'Bonus Sedia untuk Dituntut',
    titleTemplate: 'Tahniah! Bonus anda sudah sedia! 🎊',
    messageTemplate:
      'Anda telah memperoleh cashback yang mencukupi! Bonus selamat datang {{bonusAmount}} {{currency}} anda kini sedia untuk dituntut.',
    actionText: 'Tuntut Sekarang',
  },

  // Bonus Claimed Notification
  {
    typeId: 'BonusClaimed',
    languageId: 'EN_US',
    name: 'Bonus Claimed Successfully',
    titleTemplate: 'Bonus Added to Your Wallet! 💰',
    messageTemplate:
      'Your {{bonusAmount}} {{currency}} welcome bonus has been successfully added to your wallet.',
    actionText: 'View Wallet',
  },
  {
    typeId: 'BonusClaimed',
    languageId: 'ZH_CN',
    name: '奖金领取成功',
    titleTemplate: '奖金已添加到您的钱包！💰',
    messageTemplate:
      '您的 {{bonusAmount}} {{currency}} 欢迎奖金已成功添加到您的钱包。',
    actionText: '查看钱包',
  },
  {
    typeId: 'BonusClaimed',
    languageId: 'MS_MY',
    name: 'Bonus Berjaya Dituntut',
    titleTemplate: 'Bonus Ditambah ke Dompet Anda! 💰',
    messageTemplate:
      'Bonus selamat datang {{bonusAmount}} {{currency}} anda telah berjaya ditambahkan ke dompet anda.',
    actionText: 'Lihat Dompet',
  },
];
```

#### Seed Script for Notification Templates

**prisma/seed/notification-templates.ts**

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNotificationTemplates() {
  console.log('Seeding notification templates...');

  // Create notification types
  await prisma.notificationType.createMany({
    data: [
      { id: 'WelcomeBonus', description: 'Welcome bonus notifications' },
      { id: 'BonusEligible', description: 'Bonus eligibility notifications' },
      { id: 'BonusClaimed', description: 'Bonus claimed notifications' },
      { id: 'General', description: 'General notifications' },
    ],
    skipDuplicates: true,
  });

  // Create notification statuses
  await prisma.notificationStatus.createMany({
    data: [
      { id: 'Unread', description: 'Unread notification' },
      { id: 'Read', description: 'Read notification' },
      { id: 'Dismissed', description: 'Dismissed notification' },
    ],
    skipDuplicates: true,
  });

  // Create notification templates for each language
  const templates = [
    // English templates
    {
      typeId: 'WelcomeBonus',
      languageId: 'EN_US',
      name: 'Welcome Bonus',
      titleTemplate: 'Welcome Bonus Available! 🎉',
      messageTemplate:
        'Earn {{thresholdAmount}} {{currency}} in cashback to unlock your {{bonusAmount}} {{currency}} welcome bonus!',
      actionText: 'View Bonus',
    },
    {
      typeId: 'BonusEligible',
      languageId: 'EN_US',
      name: 'Bonus Ready to Claim',
      titleTemplate: 'Congratulations! Your bonus is ready! 🎊',
      messageTemplate:
        "You've earned enough cashback! Your {{bonusAmount}} {{currency}} welcome bonus is now ready to claim.",
      actionText: 'Claim Now',
    },
    {
      typeId: 'BonusClaimed',
      languageId: 'EN_US',
      name: 'Bonus Claimed Successfully',
      titleTemplate: 'Bonus Added to Your Wallet! 💰',
      messageTemplate:
        'Your {{bonusAmount}} {{currency}} welcome bonus has been successfully added to your wallet.',
      actionText: 'View Wallet',
    },
    // Add Chinese templates
    {
      typeId: 'WelcomeBonus',
      languageId: 'ZH_CN',
      name: '欢迎奖金',
      titleTemplate: '欢迎奖金可用！🎉',
      messageTemplate:
        '赚取 {{thresholdAmount}} {{currency}} 现金返还以解锁您的 {{bonusAmount}} {{currency}} 欢迎奖金！',
      actionText: '查看奖金',
    },
    {
      typeId: 'BonusEligible',
      languageId: 'ZH_CN',
      name: '奖金准备领取',
      titleTemplate: '恭喜！您的奖金已准备好！🎊',
      messageTemplate:
        '您已赚取足够的现金返还！您的 {{bonusAmount}} {{currency}} 欢迎奖金现在可以领取了。',
      actionText: '立即领取',
    },
    {
      typeId: 'BonusClaimed',
      languageId: 'ZH_CN',
      name: '奖金领取成功',
      titleTemplate: '奖金已添加到您的钱包！💰',
      messageTemplate:
        '您的 {{bonusAmount}} {{currency}} 欢迎奖金已成功添加到您的钱包。',
      actionText: '查看钱包',
    },
    // Add Malay templates
    {
      typeId: 'WelcomeBonus',
      languageId: 'MS_MY',
      name: 'Bonus Selamat Datang',
      titleTemplate: 'Bonus Selamat Datang Tersedia! 🎉',
      messageTemplate:
        'Peroleh {{thresholdAmount}} {{currency}} cashback untuk membuka bonus selamat datang {{bonusAmount}} {{currency}} anda!',
      actionText: 'Lihat Bonus',
    },
    {
      typeId: 'BonusEligible',
      languageId: 'MS_MY',
      name: 'Bonus Sedia untuk Dituntut',
      titleTemplate: 'Tahniah! Bonus anda sudah sedia! 🎊',
      messageTemplate:
        'Anda telah memperoleh cashback yang mencukupi! Bonus selamat datang {{bonusAmount}} {{currency}} anda kini sedia untuk dituntut.',
      actionText: 'Tuntut Sekarang',
    },
    {
      typeId: 'BonusClaimed',
      languageId: 'MS_MY',
      name: 'Bonus Berjaya Dituntut',
      titleTemplate: 'Bonus Ditambah ke Dompet Anda! 💰',
      messageTemplate:
        'Bonus selamat datang {{bonusAmount}} {{currency}} anda telah berjaya ditambahkan ke dompet anda.',
      actionText: 'Lihat Dompet',
    },
  ];

  for (const template of templates) {
    await prisma.notificationTypeMetadata.upsert({
      where: {
        typeId_languageId: {
          typeId: template.typeId as any,
          languageId: template.languageId as any,
        },
      },
      update: template,
      create: template,
    });
  }

  console.log('✅ Notification templates seeded successfully');
}
```

#### Template Variable Reference

Available template variables for notifications:

- `{{bonusAmount}}` - The bonus amount (e.g., "5.00")
- `{{currency}}` - Currency code (e.g., "MYR", "USD")
- `{{thresholdAmount}}` - Amount needed to unlock bonus
- `{{earnedAmount}}` - Current cashback earned
- `{{progressPercentage}}` - Progress percentage (e.g., "75.5")
- `{{userName}}` - User's display name
- `{{siteName}}` - Site/brand name

#### Language Detection

The system determines user language through:

1. **User Profile**: User's saved language preference (`user.languageId`)
2. **HTTP Headers**: `Accept-Language` header from requests
3. **Fallback**: Default to `EN_US` if no preference found

#### Notification Creation Flow

```typescript
// When user signs up
await notificationService.createWelcomeBonusNotification(userId, {
  bonusAmount: 5.0,
  currency: 'MYR',
  thresholdAmount: 5.0,
});

// When bonus becomes eligible
await notificationService.createBonusEligibleNotification(userId, {
  bonusAmount: 5.0,
  currency: 'MYR',
  bonusId: 'bonus_123',
});

// When bonus is claimed
await notificationService.createBonusClaimedNotification(userId, {
  bonusAmount: 5.0,
  currency: 'MYR',
  bonusId: 'bonus_123',
});
```

### Integration Requirements

#### Email Service Integration

Update your existing `EmailService` to support welcome bonus notifications using **mailgun.js**:

**email.service.ts** (additions)

```typescript
import Mailgun from 'mailgun.js';
import formData from 'form-data';

@Injectable()
export class EmailService {
  private mailgun: any;

  constructor() {
    const mg = new Mailgun(formData);
    this.mailgun = mg.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      url: process.env.MAILGUN_BASE_URL || 'https://api.mailgun.net',
    });
  }

  private async sendEmail(options: {
    to: string;
    template: string;
    data: any;
    language?: string;
  }) {
    const domain = process.env.MAILGUN_DOMAIN;
    const language = options.language || 'EN_US';

    return this.mailgun.messages.create(domain, {
      from: `${process.env.SITE_NAME} <noreply@${domain}>`,
      to: [options.to],
      subject: await this.getLocalizedSubject(
        options.template,
        language,
        options.data,
      ),
      template: `${options.template}-${language.toLowerCase()}`,
      'h:X-Mailgun-Variables': JSON.stringify(options.data),
    });
  }

  async sendWelcomeBonusGranted(
    email: string,
    data: {
      bonusAmount: number;
      currency: string;
      thresholdAmount: number;
      language?: string;
    },
  ) {
    return this.sendEmail({
      to: email,
      template: 'welcome-bonus-granted',
      language: data.language,
      data: {
        bonusAmount: data.bonusAmount,
        currency: data.currency,
        thresholdAmount: data.thresholdAmount,
        claimUrl: `${process.env.FRONTEND_URL}/bonuses`,
      },
    });
  }

  async sendWelcomeBonusEligible(
    email: string,
    data: {
      bonusAmount: number;
      currency: string;
      language?: string;
    },
  ) {
    return this.sendEmail({
      to: email,
      template: 'welcome-bonus-eligible',
      language: data.language,
      data: {
        bonusAmount: data.bonusAmount,
        currency: data.currency,
        claimUrl: `${process.env.FRONTEND_URL}/bonuses`,
      },
    });
  }

  async sendWelcomeBonusClaimed(
    email: string,
    data: {
      bonusAmount: number;
      currency: string;
      newBalance: number;
      language?: string;
    },
  ) {
    return this.sendEmail({
      to: email,
      template: 'welcome-bonus-claimed',
      language: data.language,
      data: {
        bonusAmount: data.bonusAmount,
        currency: data.currency,
        newBalance: data.newBalance,
        walletUrl: `${process.env.FRONTEND_URL}/wallet`,
      },
    });
  }

  // Note: No expiring method needed since welcome bonuses never expire

  private async getLocalizedSubject(
    template: string,
    language: string,
    data: any,
  ): Promise<string> {
    // Subject line localization mapping
    const subjects = {
      'welcome-bonus-granted': {
        EN_US: `Welcome Bonus Available - ${data.bonusAmount} ${data.currency}!`,
        ZH_CN: `欢迎奖金可用 - ${data.bonusAmount} ${data.currency}！`,
        MS_MY: `Bonus Selamat Datang Tersedia - ${data.bonusAmount} ${data.currency}!`,
      },
      'welcome-bonus-eligible': {
        EN_US: `Your ${data.bonusAmount} ${data.currency} Bonus is Ready!`,
        ZH_CN: `您的 ${data.bonusAmount} ${data.currency} 奖金已准备好！`,
        MS_MY: `Bonus ${data.bonusAmount} ${data.currency} Anda Sudah Sedia!`,
      },
      'welcome-bonus-claimed': {
        EN_US: `Bonus Added to Your Wallet - ${data.bonusAmount} ${data.currency}`,
        ZH_CN: `奖金已添加到您的钱包 - ${data.bonusAmount} ${data.currency}`,
        MS_MY: `Bonus Ditambah ke Dompet Anda - ${data.bonusAmount} ${data.currency}`,
      },
    };

    return (
      subjects[template]?.[language] ||
      subjects[template]?.['EN_US'] ||
      'Notification'
    );
  }
}
```

#### Mailgun Template Setup

Create localized email templates in your Mailgun dashboard:

**Template Names:**

- `welcome-bonus-granted-en_us`
- `welcome-bonus-granted-zh_cn`
- `welcome-bonus-granted-ms_my`
- `welcome-bonus-eligible-en_us`
- `welcome-bonus-eligible-zh_cn`
- `welcome-bonus-eligible-ms_my`
- `welcome-bonus-claimed-en_us`
- `welcome-bonus-claimed-zh_cn`
- `welcome-bonus-claimed-ms_my`

**Template Variables:**

- `{{bonusAmount}}` - Bonus amount
- `{{currency}}` - Currency code
- `{{thresholdAmount}}` - Required cashback amount
- `{{claimUrl}}` - Link to bonus page
- `{{walletUrl}}` - Link to wallet page

#### Analytics Integration

Integrate with your existing analytics system:

**analytics.service.ts** (additions)

```typescript
async trackWelcomeBonusEvent(event: 'granted' | 'eligible' | 'claimed' | 'expired', data: {
  userId: string;
  bonusAmount: number;
  currency: string;
  earnedAmount?: number;
}) {
  return this.track('welcome_bonus', event, {
    user_id: data.userId,
    bonus_amount: data.bonusAmount,
    currency: data.currency,
    earned_amount: data.earnedAmount,
    timestamp: new Date().toISOString(),
  });
}
```

#### Wallet System Integration

Update your existing `WalletService` to handle welcome bonus transactions:

**wallet.service.ts** (additions)

```typescript
async createWelcomeBonusTransaction(data: {
  userId: string;
  amount: number;
  currency: CurrencyEnum;
  bonusId: string;
}, options?: { transaction?: PrismaTransaction }) {
  const db = options?.transaction || this.db;

  const wallet = await this.getUserWallet({
    userId: data.userId,
    currency: data.currency,
  }, { transaction: db });

  return db.userWalletTransactionLog.create({
    data: {
      walletId: wallet.id,
      currencyId: data.currency,
      balanceBefore: wallet.balance,
      balanceAfter: wallet.balance + data.amount,
      amount: data.amount,
      typeId: UserWalletTransactionTypeEnum.WelcomeBonus,
      statusId: UserWalletTransactionStatusEnum.Completed,
      description: 'Welcome bonus claim',
      reference: data.bonusId,
    },
  });
}
```

#### Cashback Tracking Integration

Update your existing cashback system to automatically update welcome bonus progress:

**affiliate/user-cashback.service.ts** (integration hook)

```typescript
import { WelcomeBonusService } from 'src/welcome-bonus/welcome-bonus.service';

@Injectable()
export class UserCashbackService {
  constructor(
    // ... existing dependencies
    private readonly welcomeBonusService: WelcomeBonusService,
  ) {}

  async processUserCashback(data: CreateUserCashbackDto) {
    // ... existing cashback processing logic

    // Update welcome bonus progress
    try {
      await this.welcomeBonusService.updateEarnedAmount(
        data.userId,
        data.cashbackAmount,
      );
    } catch (error) {
      // Log error but don't fail cashback processing
      this.logger.warn(
        `Failed to update welcome bonus progress: ${error.message}`,
      );
    }

    return cashback;
  }
}
```

#### Authentication Integration

Update your existing auth service to automatically create welcome bonuses for new users:

**auth/auth.service.ts** (integration hook)

```typescript
import { WelcomeBonusService } from 'src/welcome-bonus/welcome-bonus.service';
import { SiteService } from 'src/site/site.service';

@Injectable()
export class AuthService {
  constructor(
    // ... existing dependencies
    private readonly welcomeBonusService: WelcomeBonusService,
    private readonly siteService: SiteService,
  ) {}

  async createUser(userData: CreateUserDto) {
    const user = await this.db.user.create({
      data: userData,
    });

    // Create welcome bonus for new user
    try {
      const site = await this.siteService.getCurrentSite();
      await this.welcomeBonusService.createWelcomeBonusForUser(
        user.id,
        site.id,
      );

      this.logger.log(`Welcome bonus created for user ${user.id}`);
    } catch (error) {
      // Log error but don't fail user creation
      this.logger.warn(
        `Failed to create welcome bonus for user ${user.id}: ${error.message}`,
      );
    }

    return user;
  }
}
```

### Security & Compliance

#### Fraud Prevention Measures

- Device fingerprinting using libraries like FingerprintJS
- IP geolocation validation
- Email domain verification
- Velocity checks for signup patterns
- Manual review queue for suspicious accounts

#### Data Privacy

- GDPR-compliant data handling for EU users
- Clear privacy policy updates for bonus data
- User consent for marketing communications
- Right to erasure handling for bonus data

#### Financial Compliance

- Proper accounting for bonus liabilities
- Tax implications documentation
- Audit trail for all bonus transactions
- Compliance with promotional law requirements

## Success Metrics & Analytics

### Primary Metrics

- **Conversion Rate**: Signup to first purchase (baseline vs. with bonus)
- **Time to Purchase**: Days from signup to first transaction
- **Bonus Utilization**: Percentage of granted bonuses actually used
- **User Retention**: 7-day, 14-day, 30-day retention rates

### Secondary Metrics

- **Referral Impact**: Increase in referral shares post-bonus
- **Average Order Value**: Purchase amounts by bonus users
- **Customer Lifetime Value**: Long-term value of bonus recipients
- **Fraud Rate**: Percentage of bonuses granted to fraudulent accounts

### A/B Testing Framework

- **Bonus Amount Testing**: $3, $5, $10, $15 variants
- **Messaging Testing**: Different value propositions and CTAs
- **Threshold Testing**: Different earning requirements (50%, 100%, 150% of bonus amount)

## Localization Summary

### ✅ **Notification Localization Features:**

1. **Multi-language Support**: English (EN_US), Chinese (ZH_CN), Malay (MS_MY)
2. **Template-based System**: Localized title, message, and action text templates
3. **Dynamic Content**: Template variables ({{bonusAmount}}, {{currency}}, etc.)
4. **User Language Detection**: Based on user profile, HTTP headers, with EN_US fallback
5. **Database Schema**: `NotificationTypeMetadata` with language-specific templates
6. **Service Layer**: `NotificationService` with automatic localization

### ✅ **Email Localization Features:**

1. **Mailgun.js Integration**: Using mailgun.js for email delivery
2. **Localized Templates**: Separate Mailgun templates per language
3. **Dynamic Subjects**: Language-specific email subject lines
4. **Template Variables**: Consistent variable system across notifications and emails
5. **No Expiration**: Updated to remove expiration logic (unlimited bonuses)

### ✅ **Supported Notification Types:**

- **WelcomeBonus**: Created on user signup with earning requirement
- **BonusEligible**: Triggered when user reaches threshold
- **BonusClaimed**: Confirmation when bonus is successfully claimed

### ✅ **Implementation Ready:**

- Database schema with localization support
- Service classes for notification creation and management
- Email service with mailgun.js integration
- Seed scripts for multilingual templates
- Frontend components with localized content

## Implementation Timeline

### Phase 1: Backend Foundation (Weeks 1-2)

**Week 1: Database & Core Services**

- [ ] Create Zenstack schema files (`zenstack/welcome-bonus.zmodel`)
- [ ] Update existing schema files with relationships
- [ ] Generate Prisma client with new schema
- [ ] Create `WelcomeBonusService` with core logic
- [ ] Implement basic fraud prevention (email uniqueness, device fingerprinting)
- [ ] Create database migrations and seed data

**Week 2: GraphQL & API Layer**

- [ ] Create GraphQL models and input types
- [ ] Implement `WelcomeBonusResolver` with queries and mutations
- [ ] Add REST controller for backward compatibility
- [ ] Create `WelcomeBonusModule` and wire dependencies
- [ ] Update existing services (WalletService, AuthService) for integration
- [ ] Implement analytics tracking hooks

### Phase 2: Frontend Integration (Weeks 3-4)

**Week 3: GraphQL & Core Components**

- [ ] Update GraphQL schema and run code generation
- [ ] Create GraphQL queries and mutations
- [ ] Build core React components (WelcomeBonusAchievement, BonusProgressBar)
- [ ] Implement bonus claim modal and flow
- [ ] Add components to mint-ui library if reusable

**Week 4: Pages & User Experience**

- [ ] Create dedicated welcome bonus page
- [ ] Integrate bonus components into dashboard
- [ ] Update onboarding flow with bonus explanation
- [ ] Implement notification system for bonus milestones
- [ ] Add admin interface for bonus settings management

### Phase 3: Integration & Email System (Week 5)

**Week 5: Email Templates & Integrations**

- [ ] Create email templates for all bonus events
- [ ] Update EmailService with bonus notification methods
- [ ] Integrate bonus creation with user registration flow
- [ ] Integrate bonus progress with cashback earning system
- [ ] Implement automated expiration reminder system
- [ ] Add bonus analytics to existing dashboard

### Phase 4: Testing & Optimization (Week 6)

**Week 6: Testing & Launch Preparation**

- [ ] Comprehensive unit and integration testing
- [ ] End-to-end testing with Cypress/Playwright
- [ ] Performance optimization and caching strategy
- [ ] Security audit and penetration testing
- [ ] Load testing for bonus claim flows
- [ ] Documentation and training materials
- [ ] Staging environment deployment and testing
- [ ] Production deployment with feature flags

### Phase 5: Post-Launch Optimization (Week 7-8)

**Week 7: Monitoring & Analytics**

- [ ] Set up comprehensive monitoring and alerting
- [ ] Implement A/B testing framework for bonus amounts
- [ ] Analytics dashboard for bonus program performance
- [ ] User feedback collection and analysis
- [ ] Performance monitoring and optimization

**Week 8: Advanced Features**

- [ ] Advanced fraud detection algorithms
- [ ] Personalized bonus amounts based on user behavior
- [ ] Integration with referral system
- [ ] Enhanced admin reporting and analytics
- [ ] Mobile app integration (if applicable)

## Dependencies & Risks

### Technical Dependencies

- Email service provider (SendGrid/AWS SES) configuration
- User authentication and verification system
- Payment processing system integration
- Analytics infrastructure

### Business Dependencies

- Legal review of promotional terms
- Finance approval for bonus liability
- Marketing campaign coordination
- Customer support training

### Risk Assessment

#### High-Impact Risks

- **Fraud/Abuse**: Mitigation through robust prevention measures
- **Financial Impact**: Careful monitoring and budget controls
- **Technical Failures**: Comprehensive testing and monitoring

#### Medium-Impact Risks

- **User Confusion**: Clear UX design and documentation
- **Support Load**: Proactive FAQ and help documentation
- **Performance Issues**: Load testing and optimization

## Success Criteria & Definition of Done

### Technical Acceptance Criteria

- [ ] All API endpoints tested and documented
- [ ] Frontend components integrated and responsive
- [ ] Fraud prevention measures active and tested
- [ ] Email notifications sending correctly
- [ ] Admin interface functional and secure
- [ ] Analytics tracking implemented
- [ ] Security review completed
- [ ] Performance benchmarks met

### Business Acceptance Criteria

- [ ] Legal terms and conditions updated
- [ ] Financial accounting procedures established
- [ ] Customer support documentation complete
- [ ] Marketing materials and campaigns ready
- [ ] Success metrics baseline established
- [ ] A/B testing framework operational

### Launch Readiness Checklist

- [ ] All technical requirements implemented
- [ ] Security audit passed
- [ ] Load testing completed
- [ ] Documentation updated
- [ ] Team training completed
- [ ] Monitoring and alerting configured
- [ ] Rollback procedures documented
- [ ] Customer support prepared

## Appendices

### Appendix A: Competitive Analysis

Research on how competitors implement welcome bonuses, typical amounts, and effectiveness strategies.

### Appendix B: Legal Considerations

Overview of promotional law compliance, tax implications, and terms of service updates required.

### Appendix C: Technical Architecture Diagrams

Detailed system architecture showing bonus flow, data relationships, and integration points.

### Appendix D: User Research Findings

Summary of user interviews and surveys that informed bonus amount and experience design.

---

**Document Approval**

- [ ] Product Manager Approval: [Name] [Date]
- [ ] Engineering Lead Approval: [Name] [Date]
- [ ] Legal Review Approval: [Name] [Date]
- [ ] Finance Approval: [Name] [Date]
