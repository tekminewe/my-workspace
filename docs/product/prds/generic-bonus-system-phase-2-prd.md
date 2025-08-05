# Product Requirements Document: Generic Bonus System - Phase 2

**Document Information:**

- **Author:** Product Manager
- **Technical Lead:** Engineering Team
- **Designer:** UX/UI Team
- **Date Created:** 2025-08-05
- **Last Updated:** 2025-08-05
- **Version:** 1.0
- **Status:** Draft
- **Related GitHub Issue:** TBD
- **Dependencies:** [#2 - Welcome Bonus System](https://github.com/tekminewe/my-workspace/issues/2), [#4 - Basic Referral Program](https://github.com/tekminewe/my-workspace/issues/4)

---

## Executive Summary

Phase 2 of the Generic Bonus System transforms the foundation built in Phase 1 (Welcome Bonus) into a comprehensive, self-service bonus management platform. This phase enables administrators to create, configure, and manage multiple types of bonuses (referral, seasonal, loyalty, partner) through an intuitive admin console without requiring engineering resources. The system provides advanced analytics, A/B testing capabilities, campaign management tools, and automated marketing workflows that empower marketing teams to rapidly deploy and optimize user acquisition and retention strategies.

## Problem Statement

### What problem are we solving?

Phase 1 successfully implemented welcome bonuses with a generic architecture, but the system still requires engineering intervention for new bonus types, campaign creation, and configuration changes. Marketing teams cannot independently launch seasonal promotions, referral campaigns, or loyalty programs, creating bottlenecks and missed market opportunities. Without self-service tools and comprehensive analytics, the platform cannot achieve its full potential for user acquisition and retention.

### Why does this problem matter?

- **Engineering Bottleneck**: Marketing campaigns still require developer time and deployment cycles
- **Missed Market Opportunities**: Cannot quickly respond to competitor actions or seasonal trends
- **Limited Campaign Variety**: Only welcome bonuses available, missing referral and loyalty opportunities
- **No Campaign Analytics**: Cannot measure ROI or optimize bonus performance across different types
- **Manual Administration**: No tools for fraud monitoring, user management, or campaign scheduling
- **Scalability Constraints**: System cannot support multiple concurrent campaigns or complex bonus rules

### Why now?

- Phase 1 generic architecture provides the technical foundation
- Welcome bonus success proves the value of achievement-based rewards
- Marketing team capacity is available for campaign management
- Competitive landscape requires diverse acquisition strategies
- User base has grown to support referral programs effectively

## Goals and Success Metrics

### Primary Goals

- [ ] Enable self-service bonus creation and management for marketing teams
- [ ] Implement referral bonus system with social sharing integration
- [ ] Launch seasonal/holiday bonus campaigns
- [ ] Provide comprehensive admin analytics dashboard
- [ ] Implement A/B testing framework for bonus optimization
- [ ] Create automated campaign management with scheduling

### Secondary Goals

- [ ] Integrate loyalty program bonuses
- [ ] Enable partner-specific bonus campaigns
- [ ] Implement advanced fraud prevention across all bonus types
- [ ] Create marketing automation workflows
- [ ] Develop user segmentation for targeted bonuses

### Non-Goals (Out of Scope)

- [ ] Complex gamification systems (reserved for future phases)
- [ ] Multi-tier affiliate programs (Phase 3 consideration)
- [ ] Real-time personalization algorithms (Phase 3 consideration)
- [ ] Third-party marketing platform integrations (Phase 3 consideration)

### Success Metrics

**Operational Efficiency:**

- Reduce time-to-market for new bonus campaigns from 2 weeks to 2 days
- Enable marketing team to launch campaigns independently (zero engineering time)
- Support 5+ concurrent bonus campaigns without performance degradation

**Business Impact:**

- Increase overall bonus program ROI by 40% through optimization and variety
- Achieve 15% user acquisition growth through referral bonuses
- Generate 25% revenue lift during seasonal bonus campaigns
- Maintain fraud rate below 2% across all bonus types

**User Engagement:**

- 60% of users participate in at least one bonus program
- 30% month-over-month growth in bonus claims
- 20% improvement in user retention for bonus participants

## User Personas & Use Cases

### Primary Persona: Marketing Manager Maria

- **Demographics**: 28-35, digital marketing experience, data-driven
- **Behavior**: Launches campaigns, analyzes performance, optimizes for ROI
- **Pain Points**: Needs engineering help for campaigns, limited by technical constraints
- **Use Case**: Wants to launch a Valentine's Day bonus campaign with couples referral rewards

### Secondary Persona: Growth Hacker Gary

- **Demographics**: 25-32, performance marketing focus, experimentation mindset
- **Behavior**: A/B tests everything, rapid iteration, metric-obsessed
- **Pain Points**: Cannot test bonus variations quickly, limited campaign data
- **Use Case**: Needs to test different referral bonus amounts to optimize conversion rates

### Supporting Persona: Admin Amy

- **Demographics**: 30-40, operations focus, fraud prevention mindset
- **Behavior**: Monitors system health, investigates anomalies, ensures compliance
- **Pain Points**: Limited visibility into bonus abuse, manual fraud detection
- **Use Case**: Needs dashboards to monitor bonus fraud patterns and take preventive action

## Feature Requirements

### Core Functionality

#### Self-Service Admin Console

- **Requirement**: Comprehensive web-based admin interface for bonus management
- **Acceptance Criteria**:
  - **Bonus Template Creation**: Visual form builder for all bonus types (Welcome, Referral, Seasonal, Loyalty, Partner)
  - **Campaign Scheduling**: Start/end date scheduling with timezone support
  - **Rule Configuration**: Visual rule builder for eligibility, thresholds, and fraud prevention
  - **Localization Management**: Multi-language content editing with preview
  - **Template Versioning**: Track changes and rollback capabilities
  - **Bulk Operations**: Import/export bonus configurations, bulk status changes
  - **Approval Workflows**: Optional approval process for high-value campaigns
- **Priority**: Must Have

#### Referral Bonus System

- **Requirement**: Implement dual-sided referral bonuses using the generic bonus engine
- **Acceptance Criteria**:
  - **Referrer Rewards**: Configurable bonus when referee completes threshold action
  - **Referee Rewards**: Welcome-style bonus for new users from referrals
  - **Multi-Tier Support**: Different bonus amounts based on referrer loyalty status
  - **Social Sharing Integration**: Pre-built sharing templates for major platforms
  - **Referral Tracking**: Comprehensive attribution and conversion tracking
  - **Fraud Prevention**: Detection of self-referrals and bonus farming
  - **Custom Referral Codes**: Branded codes for influencers and partners
- **Priority**: Must Have
- **Dependencies**: [#4 - Basic Referral Program](https://github.com/tekminewe/my-workspace/issues/4)

#### Seasonal/Holiday Bonus Campaigns

- **Requirement**: Time-limited bonus campaigns for holidays and special events
- **Acceptance Criteria**:
  - **Campaign Templates**: Pre-built templates for major holidays (Christmas, Black Friday, etc.)
  - **Dynamic Scheduling**: Automatic campaign activation based on calendar dates
  - **Themed UI Elements**: Holiday-specific graphics and messaging
  - **Limited-Time Urgency**: Countdown timers and scarcity messaging
  - **Performance Tracking**: Campaign-specific analytics and ROI measurement
  - **A/B Testing**: Test different seasonal messaging and bonus amounts
- **Priority**: Should Have

#### Loyalty Program Integration

- **Requirement**: Milestone-based bonuses for long-term user engagement
- **Acceptance Criteria**:
  - **Milestone Tracking**: Bonuses based on cumulative cashback, purchase count, or time-based milestones
  - **Tier System**: Different bonus amounts based on user loyalty levels
  - **Progress Visualization**: User-facing progress bars and milestone previews
  - **Retroactive Bonuses**: Apply new loyalty bonuses to existing user activity
  - **Flexible Metrics**: Support various tracking metrics beyond cashback
- **Priority**: Should Have

#### Advanced Analytics Dashboard

- **Requirement**: Comprehensive reporting and analytics for all bonus programs
- **Acceptance Criteria**:
  - **Real-Time Metrics**: Live campaign performance, conversion rates, fraud detection
  - **ROI Analysis**: Cost per acquisition, lifetime value impact, revenue attribution
  - **User Segmentation**: Performance breakdowns by user demographics and behavior
  - **Comparative Analysis**: A/B test results, campaign comparisons, historical trends
  - **Fraud Monitoring**: Suspicious activity alerts, abuse pattern detection
  - **Export Capabilities**: CSV/Excel export for detailed analysis
  - **Custom Dashboards**: Configurable widgets for different stakeholder needs
- **Priority**: Must Have

#### A/B Testing Framework

- **Requirement**: Built-in experimentation platform for bonus optimization
- **Acceptance Criteria**:
  - **Template Variants**: Test different bonus amounts, messaging, and UI elements
  - **User Segmentation**: Assign users to test groups based on configurable criteria
  - **Statistical Significance**: Automatic calculation of test confidence and sample sizes
  - **Performance Tracking**: Real-time test results with conversion metrics
  - **Winner Declaration**: Automatic promotion of winning variants
  - **Test History**: Archive of past experiments with learnings and results
- **Priority**: Should Have

#### Campaign Management System

- **Requirement**: Automated campaign lifecycle management
- **Acceptance Criteria**:
  - **Automated Scheduling**: Campaigns start/stop based on predefined schedules
  - **Budget Controls**: Automatic campaign pausing when budget limits reached
  - **Performance Triggers**: Auto-optimization based on performance metrics
  - **Notification System**: Alerts for campaign milestones, budget warnings, performance issues
  - **Rollback Capabilities**: Instant campaign deactivation with user impact analysis
  - **Staging Environment**: Test campaigns before live deployment
- **Priority**: Should Have

### User Experience Requirements

#### Unified Bonus Center (Enhanced)

- **Requirement**: Expand the existing bonus page to support multiple bonus types
- **Acceptance Criteria**:
  - **Multi-Bonus Display**: Show all active bonuses with clear categorization
  - **Progress Tracking**: Individual progress bars for each active bonus
  - **Bonus History**: Complete history of earned, claimed, and expired bonuses
  - **Social Sharing**: Share bonus achievements on social platforms
  - **Referral Management**: Dedicated section for referral links and tracking
  - **Personalization**: Show most relevant bonuses based on user behavior
- **Priority**: Must Have

#### Enhanced Notification Integration

- **Requirement**: Expand notification system for all bonus types
- **Acceptance Criteria**:
  - **Bonus Type Notifications**: Separate notification types for each bonus category
  - **Smart Timing**: Optimal notification delivery based on user activity patterns
  - **Rich Notifications**: Include progress updates, achievement celebrations
  - **Multi-Channel Support**: Email, in-app, and push notification coordination
  - **Notification Preferences**: User control over notification frequency and types
- **Priority**: Must Have
- **Dependencies**: [#12 - Notification Center System](https://github.com/tekminewe/my-workspace/issues/12)

#### Admin User Interface

- **Requirement**: Intuitive, powerful admin interface for marketing teams
- **Acceptance Criteria**:
  - **Dashboard Overview**: High-level metrics and campaign status at a glance
  - **Campaign Builder**: Step-by-step wizard for creating new bonus campaigns
  - **Template Library**: Pre-built templates for common bonus types and campaigns
  - **Live Preview**: Real-time preview of user-facing bonus interfaces
  - **Bulk Operations**: Manage multiple campaigns and users efficiently
  - **Role-Based Access**: Different permission levels for various admin roles
  - **Mobile Responsive**: Admin tasks accessible on tablets and mobile devices
- **Priority**: Must Have

### Security & Compliance Requirements

#### Advanced Fraud Prevention

- **Requirement**: Sophisticated fraud detection across all bonus types
- **Acceptance Criteria**:
  - **Multi-Vector Detection**: IP, device, email, behavioral pattern analysis
  - **Machine Learning**: Pattern recognition for emerging fraud techniques
  - **Real-Time Blocking**: Instant prevention of suspicious bonus claims
  - **Investigation Tools**: Admin interface for reviewing flagged accounts
  - **Allowlist Management**: Whitelist trusted users and IP ranges
  - **Fraud Reporting**: Detailed reports on fraud attempts and prevention effectiveness
- **Priority**: Must Have

#### Compliance & Audit

- **Requirement**: Comprehensive audit trails and compliance reporting
- **Acceptance Criteria**:
  - **Complete Audit Logs**: Every bonus action logged with user, timestamp, and context
  - **Regulatory Compliance**: Support for GDPR, CCPA, and financial regulations
  - **Data Export**: Complete user bonus data export for compliance requests
  - **Retention Policies**: Automated data retention and deletion based on policies
  - **Admin Action Tracking**: Log all administrative actions and changes
- **Priority**: Must Have

## Technical Requirements

### Backend Implementation (my-service)

#### Enhanced Generic Bonus Engine

Building on the Phase 1 foundation, Phase 2 extends the system with additional bonus types and administrative capabilities.

**New Bonus Type Implementations:**

```typescript
// Referral Bonus Template Configuration
const referralBonusTemplate = {
  bonusTypeId: 'Referral',
  name: 'Friend Referral Bonus',
  description: 'Earn $10 when your friend makes their first $25 purchase',
  bonusAmount: 10.0,
  currencyId: 'USD',
  trackingConfig: {
    type: 'referral',
    field: 'completedReferrals',
    operator: 'gte',
  },
  thresholdAmount: 1, // 1 successful referral
  eligibilityRules: {
    refereeMinPurchase: 25.0,
    maxReferralsPerUser: 10,
    refereeAccountAgeMax: 30, // days since referral signup
  },
  expirationDays: 90,
  maxGrantsPerUser: 10, // Up to 10 referral bonuses per user
  fraudRules: {
    maxPerIP: 3,
    blockSelfReferrals: true,
    requireDistinctPaymentMethods: true,
  },
};

// Seasonal Bonus Template Configuration
const seasonalBonusTemplate = {
  bonusTypeId: 'Seasonal',
  name: 'Black Friday Bonus',
  description: 'Extra $15 bonus for purchases during Black Friday week',
  bonusAmount: 15.0,
  currencyId: 'USD',
  trackingConfig: {
    type: 'cashback',
    field: 'confirmedAmount',
    operator: 'gte',
    dateRange: {
      start: '2025-11-24T00:00:00Z',
      end: '2025-11-30T23:59:59Z',
    },
  },
  thresholdAmount: 50.0,
  eligibilityRules: {
    requireActiveAccount: true,
    minAccountAge: 7, // days
    excludePreviousSeasonalBonus: true,
  },
  validFrom: '2025-11-24T00:00:00Z',
  validUntil: '2025-11-30T23:59:59Z',
  maxGrantsPerUser: 1,
  maxDailyGrants: 1000,
};

// Loyalty Bonus Template Configuration
const loyaltyBonusTemplate = {
  bonusTypeId: 'Loyalty',
  name: 'Loyalty Milestone - $100 Cashback',
  description: 'Celebrate earning your first $100 in cashback!',
  bonusAmount: 20.0,
  currencyId: 'USD',
  trackingConfig: {
    type: 'milestone',
    field: 'lifetimeCashback',
    operator: 'gte',
  },
  thresholdAmount: 100.0,
  eligibilityRules: {
    accountAgeMin: 30, // Must be member for 30+ days
    excludeWelcomeBonus: true,
  },
  expirationDays: null, // Never expires
  maxGrantsPerUser: 1,
};
```

#### Enhanced Schema Extensions

```zmodel
// Extend BonusTemplate with Phase 2 features
model BonusTemplate {
  // ... existing Phase 1 fields ...

  // Campaign Management
  campaignId        String?         // Group templates into campaigns
  campaign          BonusTeamplate? @relation("CampaignTemplates", fields: [campaignId], references: [id])
  childCampaigns    BonusTemplate[] @relation("CampaignTemplates")

  // A/B Testing
  testGroupId       String?         // A/B test group identifier
  testVariant       String?         // Variant name (A, B, Control)
  testWeight        Float?          // Traffic allocation percentage
  testStatus        TestStatusEnum? // Active, Paused, Winner, Loser

  // Advanced Configuration
  userSegmentRules  Json?          // Target specific user segments
  budgetLimits      Json?          // Campaign budget constraints
  performanceTriggers Json?        // Auto-pause/optimize rules

  // Admin Metadata
  createdByUserId   String
  createdBy         User            @relation("BonusTemplateCreatedBy", fields: [createdByUserId], references: [id])
  approvedByUserId  String?
  approvedBy        User?           @relation("BonusTemplateApprovedBy", fields: [approvedByUserId], references: [id])
  approvedAt        DateTime?
  notes             String?         // Admin notes
}

// Campaign Management
model BonusCampaign {
  id                String          @id @default(cuid())
  siteId            String
  site              Site            @relation(fields: [siteId], references: [id])

  name              String
  description       String?
  status            CampaignStatusEnum

  // Scheduling
  scheduledStart    DateTime?
  scheduledEnd      DateTime?
  actualStart       DateTime?
  actualEnd         DateTime?

  // Budget and Limits
  budgetAmount      Float?
  budgetSpent       Float           @default(0)
  maxParticipants   Int?
  currentParticipants Int           @default(0)

  // Performance Tracking
  totalBonusesGranted Int           @default(0)
  totalBonusesClaimed Int           @default(0)
  totalBonusAmount    Float         @default(0)
  conversionRate      Float?
  roi                 Float?

  templates         BonusTemplate[]
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().roles?[permissions?[name == ManageMarketing]])
}

// A/B Testing Framework
model BonusTest {
  id                String          @id @default(cuid())
  siteId            String
  site              Site            @relation(fields: [siteId], references: [id])

  name              String
  description       String?
  status            TestStatusEnum

  // Test Configuration
  trafficAllocation Float           // Percentage of users in test
  variants          BonusTestVariant[]

  // Statistical Analysis
  sampleSize        Int?
  confidenceLevel   Float           @default(0.95)
  powerLevel        Float           @default(0.80)
  minDetectableEffect Float         @default(0.05)

  // Results
  winnerVariantId   String?
  statisticalSignificance Float?

  startedAt         DateTime?
  endedAt           DateTime?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().roles?[permissions?[name == ManageMarketing]])
}

model BonusTestVariant {
  id                String          @id @default(cuid())
  testId            String
  test              BonusTest       @relation(fields: [testId], references: [id])
  templateId        String
  template          BonusTemplate   @relation(fields: [templateId], references: [id])

  name              String          // "Control", "Variant A", etc.
  trafficWeight     Float           // Percentage of test traffic

  // Performance Metrics
  participants      Int             @default(0)
  conversions       Int             @default(0)
  conversionRate    Float?

  @@allow('read', auth() != null)
  @@allow('create,update,delete', auth().roles?[permissions?[name == ManageMarketing]])
}

// Enhanced User Bonus Tracking
model UserBonus {
  // ... existing Phase 1 fields ...

  // Campaign Attribution
  campaignId        String?
  campaign          BonusCampaign?  @relation(fields: [campaignId], references: [id])

  // A/B Test Attribution
  testId            String?
  test              BonusTest?      @relation(fields: [testId], references: [id])
  testVariantId     String?
  testVariant       BonusTestVariant? @relation(fields: [testVariantId], references: [id])

  // Referral Tracking (for referral bonuses)
  referrerUserId    String?
  referrer          User?           @relation("ReferralBonuses", fields: [referrerUserId], references: [id])
  referralCode      String?

  // Enhanced Fraud Detection
  riskScore         Float?          // 0-1 fraud risk score
  fraudFlags        Json?           // Specific fraud indicators
  reviewStatus      ReviewStatusEnum @default(Approved)
  reviewedByUserId  String?
  reviewedBy        User?           @relation("BonusReviews", fields: [reviewedByUserId], references: [id])
  reviewedAt        DateTime?
}

// Enums
enum TestStatusEnum {
  Draft
  Active
  Paused
  Completed
  Cancelled
}

enum CampaignStatusEnum {
  Draft
  Scheduled
  Active
  Paused
  Completed
  Cancelled
}

enum ReviewStatusEnum {
  Approved
  Pending
  Flagged
  Rejected
}
```

#### Service Implementations

**BonusCampaignService**

```typescript
@Injectable()
export class BonusCampaignService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly bonusService: BonusService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  async createCampaign(
    input: CreateBonusCampaignInput,
  ): Promise<BonusCampaign> {
    return this.db.bonusCampaign.create({
      data: {
        ...input,
        status: CampaignStatusEnum.Draft,
      },
      include: {
        templates: true,
        site: true,
      },
    });
  }

  async launchCampaign(campaignId: string): Promise<BonusCampaign> {
    return this.db.$transaction(async (tx) => {
      const campaign = await tx.bonusCampaign.update({
        where: { id: campaignId },
        data: {
          status: CampaignStatusEnum.Active,
          actualStart: new Date(),
        },
      });

      // Activate all templates in the campaign
      await tx.bonusTemplate.updateMany({
        where: { campaignId },
        data: { enabled: true },
      });

      return campaign;
    });
  }

  async pauseCampaign(
    campaignId: string,
    reason?: string,
  ): Promise<BonusCampaign> {
    return this.db.$transaction(async (tx) => {
      const campaign = await tx.bonusCampaign.update({
        where: { id: campaignId },
        data: {
          status: CampaignStatusEnum.Paused,
          notes: reason,
        },
      });

      // Pause all templates in the campaign
      await tx.bonusTemplate.updateMany({
        where: { campaignId },
        data: { enabled: false },
      });

      return campaign;
    });
  }

  async getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics> {
    const campaign = await this.db.bonusCampaign.findUniqueOrThrow({
      where: { id: campaignId },
      include: {
        templates: {
          include: {
            userBonuses: {
              include: {
                walletTransaction: true,
              },
            },
          },
        },
      },
    });

    return this.analyticsService.calculateCampaignMetrics(campaign);
  }
}
```

**BonusTestService**

```typescript
@Injectable()
export class BonusTestService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly statisticsService: StatisticsService,
  ) {}

  async createTest(input: CreateBonusTestInput): Promise<BonusTest> {
    return this.db.bonusTest.create({
      data: {
        ...input,
        status: TestStatusEnum.Draft,
      },
      include: {
        variants: {
          include: {
            template: true,
          },
        },
      },
    });
  }

  async addVariant(
    testId: string,
    input: CreateTestVariantInput,
  ): Promise<BonusTestVariant> {
    return this.db.bonusTestVariant.create({
      data: {
        testId,
        ...input,
      },
      include: {
        template: true,
      },
    });
  }

  async startTest(testId: string): Promise<BonusTest> {
    const test = await this.db.bonusTest.update({
      where: { id: testId },
      data: {
        status: TestStatusEnum.Active,
        startedAt: new Date(),
      },
      include: {
        variants: {
          include: {
            template: true,
          },
        },
      },
    });

    // Enable all variant templates
    for (const variant of test.variants) {
      await this.db.bonusTemplate.update({
        where: { id: variant.templateId },
        data: { enabled: true },
      });
    }

    return test;
  }

  async analyzeTestResults(testId: string): Promise<TestResults> {
    const test = await this.db.bonusTest.findUniqueOrThrow({
      where: { id: testId },
      include: {
        variants: {
          include: {
            template: {
              include: {
                userBonuses: true,
              },
            },
          },
        },
      },
    });

    return this.statisticsService.analyzeABTest(test);
  }

  async declareWinner(
    testId: string,
    winnerVariantId: string,
  ): Promise<BonusTest> {
    return this.db.$transaction(async (tx) => {
      const test = await tx.bonusTest.update({
        where: { id: testId },
        data: {
          status: TestStatusEnum.Completed,
          winnerVariantId,
          endedAt: new Date(),
        },
      });

      // Disable losing variants
      const variants = await tx.bonusTestVariant.findMany({
        where: { testId },
      });

      for (const variant of variants) {
        if (variant.id !== winnerVariantId) {
          await tx.bonusTemplate.update({
            where: { id: variant.templateId },
            data: { enabled: false },
          });
        }
      }

      return test;
    });
  }
}
```

### Frontend Implementation (my-web)

#### Admin Console Implementation

**Admin Dashboard Overview**

```typescript
// app/admin/bonus-management/page.tsx
'use client';

import { useGetBonusDashboardQuery } from '@/graphql/generated';
import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';
import { CampaignMetricsCard } from '@/components/admin/bonus/CampaignMetricsCard';
import { ActiveCampaignsTable } from '@/components/admin/bonus/ActiveCampaignsTable';
import { BonusTypeDistribution } from '@/components/admin/bonus/BonusTypeDistribution';
import { CreateCampaignModal } from '@/components/admin/bonus/CreateCampaignModal';
import { useState } from 'react';

export default function BonusManagementPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data, loading, error } = useGetBonusDashboardQuery();

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error loading dashboard: {error.message}</div>;

  const dashboard = data?.bonusDashboard;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bonus Management</h1>
          <p className="text-muted-foreground">
            Create and manage bonus campaigns across all types
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Campaign
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CampaignMetricsCard
          title="Active Campaigns"
          value={dashboard?.activeCampaigns || 0}
          trend={dashboard?.campaignsTrend}
        />
        <CampaignMetricsCard
          title="Total Bonuses Granted"
          value={dashboard?.totalBonusesGranted || 0}
          trend={dashboard?.bonusesTrend}
        />
        <CampaignMetricsCard
          title="Campaign ROI"
          value={`${dashboard?.averageROI || 0}%`}
          trend={dashboard?.roiTrend}
        />
        <CampaignMetricsCard
          title="Fraud Rate"
          value={`${dashboard?.fraudRate || 0}%`}
          trend={dashboard?.fraudTrend}
        />
      </div>

      {/* Bonus Type Distribution */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bonus Type Performance</h2>
        <BonusTypeDistribution data={dashboard?.bonusTypeMetrics} />
      </Card>

      {/* Active Campaigns */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <Badge variant="secondary">{dashboard?.activeCampaigns} Active</Badge>
        </div>
        <ActiveCampaignsTable campaigns={dashboard?.campaigns} />
      </Card>

      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
```

**Campaign Builder Interface**

```typescript
// components/admin/bonus/CreateCampaignModal.tsx
'use client';

import { useState } from 'react';
import { useCreateBonusCampaignMutation } from '@/graphql/generated';
import { Dialog } from '@tekminewe/mint-ui/dialog';
import { Button } from '@tekminewe/mint-ui/button';
import { TextInput } from '@tekminewe/mint-ui/text-input';
import { Textarea } from '@tekminewe/mint-ui/textarea';
import { Select } from '@tekminewe/mint-ui/select';
import { DateInput } from '@tekminewe/mint-ui/date-input';
import { Card } from '@tekminewe/mint-ui/card';
import { BonusTemplateBuilder } from './BonusTemplateBuilder';
import { CampaignPreview } from './CampaignPreview';
import { BonusTypeEnum } from '@/graphql/generated';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    bonusType: BonusTypeEnum.Welcome,
    scheduledStart: null,
    scheduledEnd: null,
    budgetAmount: null,
    maxParticipants: null,
    templates: [],
  });

  const [createCampaign, { loading }] = useCreateBonusCampaignMutation({
    onCompleted: () => {
      onClose();
      setStep(1);
      setCampaignData({...}); // Reset form
    },
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    await createCampaign({
      variables: {
        input: campaignData,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="max-w-4xl">
      <div className="p-6">
        {/* Step Indicator */}
        <div className="flex items-center mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center ${
                stepNumber < 4 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <CampaignBasicInfo
            data={campaignData}
            onChange={setCampaignData}
          />
        )}
        {step === 2 && (
          <BonusTemplateBuilder
            bonusType={campaignData.bonusType}
            templates={campaignData.templates}
            onChange={(templates) =>
              setCampaignData({...campaignData, templates})
            }
          />
        )}
        {step === 3 && (
          <CampaignScheduling
            data={campaignData}
            onChange={setCampaignData}
          />
        )}
        {step === 4 && (
          <CampaignPreview
            data={campaignData}
          />
        )}

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step < 4 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Campaign'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
```

**A/B Testing Interface**

```typescript
// components/admin/bonus/ABTestManager.tsx
'use client';

import { useState } from 'react';
import {
  useGetBonusTestsQuery,
  useCreateBonusTestMutation,
} from '@/graphql/generated';
import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';
import { DataTable } from '@tekminewe/mint-ui/data-table';
import { TestResultsChart } from './TestResultsChart';
import { CreateTestModal } from './CreateTestModal';

export function ABTestManager() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data, loading, refetch } = useGetBonusTestsQuery();

  const tests = data?.bonusTests || [];

  const columns = [
    {
      header: 'Test Name',
      accessorKey: 'name',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === 'Active'
              ? 'success'
              : row.original.status === 'Completed'
              ? 'default'
              : 'secondary'
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: 'Variants',
      accessorKey: 'variants',
      cell: ({ row }) => row.original.variants?.length || 0,
    },
    {
      header: 'Participants',
      accessorKey: 'totalParticipants',
    },
    {
      header: 'Conversion Rate',
      accessorKey: 'conversionRate',
      cell: ({ row }) => `${(row.original.conversionRate * 100).toFixed(2)}%`,
    },
    {
      header: 'Statistical Significance',
      accessorKey: 'statisticalSignificance',
      cell: ({ row }) =>
        row.original.statisticalSignificance ? (
          <Badge
            variant={
              row.original.statisticalSignificance > 0.95
                ? 'success'
                : 'secondary'
            }
          >
            {(row.original.statisticalSignificance * 100).toFixed(1)}%
          </Badge>
        ) : (
          '-'
        ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="space-x-2">
          <Button size="sm" variant="outline">
            View Details
          </Button>
          {row.original.status === 'Active' && (
            <Button size="sm">End Test</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">A/B Testing</h2>
          <p className="text-muted-foreground">
            Optimize bonus campaigns through experimentation
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Test</Button>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={tests}
          searchPlaceholder="Search tests..."
        />
      </Card>

      <CreateTestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          refetch();
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
```

#### Enhanced User Experience

**Multi-Bonus Management Interface**

```typescript
// app/bonuses/page.tsx (Enhanced from Phase 1)
'use client';

import { useSession } from 'next-auth/react';
import { useGetUserBonusesQuery } from '@/graphql/generated';
import { Card } from '@tekminewe/mint-ui/card';
import { Tabs } from '@tekminewe/mint-ui/tabs';
import { Badge } from '@tekminewe/mint-ui/badge';
import { WelcomeBonusCard } from '@/components/bonus/WelcomeBonusCard';
import { ReferralBonusCard } from '@/components/bonus/ReferralBonusCard';
import { SeasonalBonusCard } from '@/components/bonus/SeasonalBonusCard';
import { LoyaltyBonusCard } from '@/components/bonus/LoyaltyBonusCard';
import { BonusHistoryTable } from '@/components/bonus/BonusHistoryTable';
import { BonusTypeEnum } from '@/graphql/generated';

export default function BonusesPage() {
  const { data: session } = useSession();
  const { data, loading } = useGetUserBonusesQuery({
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
  });

  const bonuses = data?.userBonuses || [];
  const activeBonuses = bonuses.filter(
    (b) => b.statusId === 'Active' || b.statusId === 'Eligible',
  );
  const claimedBonuses = bonuses.filter((b) => b.statusId === 'Claimed');

  const getBonusesByType = (type: BonusTypeEnum) =>
    activeBonuses.filter((b) => b.template.bonusTypeId === type);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Bonuses</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{activeBonuses.length} Active</Badge>
          <Badge variant="default">{claimedBonuses.length} Claimed</Badge>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <div className="border-b">
          <nav className="flex space-x-8">
            <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600">
              Active Bonuses
            </button>
            <button className="py-2 px-1 text-gray-500 hover:text-gray-700">
              History
            </button>
          </nav>
        </div>

        <div className="space-y-6">
          {/* Welcome Bonuses */}
          {getBonusesByType(BonusTypeEnum.Welcome).map((bonus) => (
            <WelcomeBonusCard key={bonus.id} bonus={bonus} />
          ))}

          {/* Referral Bonuses */}
          {getBonusesByType(BonusTypeEnum.Referral).map((bonus) => (
            <ReferralBonusCard key={bonus.id} bonus={bonus} />
          ))}

          {/* Seasonal Bonuses */}
          {getBonusesByType(BonusTypeEnum.Seasonal).map((bonus) => (
            <SeasonalBonusCard key={bonus.id} bonus={bonus} />
          ))}

          {/* Loyalty Bonuses */}
          {getBonusesByType(BonusTypeEnum.Loyalty).map((bonus) => (
            <LoyaltyBonusCard key={bonus.id} bonus={bonus} />
          ))}

          {activeBonuses.length === 0 && (
            <Card className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-4xl">🎁</div>
                <h3 className="text-xl font-semibold">No Active Bonuses</h3>
                <p className="text-muted-foreground">
                  Start shopping to unlock bonus opportunities!
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* History Tab */}
        <div className="space-y-6">
          <BonusHistoryTable bonuses={claimedBonuses} />
        </div>
      </Tabs>
    </div>
  );
}
```

## Implementation Plan

### Phase 2.1: Core Admin System (Weeks 1-3)

**Week 1-2: Backend Foundation**

- [ ] Extend generic bonus schema with campaign and testing models
- [ ] Implement BonusCampaignService and BonusTestService
- [ ] Create admin GraphQL resolvers and mutations
- [ ] Set up enhanced fraud detection systems
- [ ] Implement referral bonus tracking logic

**Week 3: Admin Console MVP**

- [ ] Build admin dashboard overview page
- [ ] Create campaign creation wizard (basic functionality)
- [ ] Implement campaign listing and management interface
- [ ] Add basic analytics dashboard
- [ ] Set up role-based access control

### Phase 2.2: Referral System (Weeks 3-4)

**Week 3-4: Referral Bonus Implementation**

- [ ] Build referral bonus templates and configuration
- [ ] Implement referral tracking and attribution
- [ ] Create social sharing integration
- [ ] Build referral dashboard for users
- [ ] Add referral fraud prevention measures

### Phase 2.3: Advanced Features (Weeks 5-6)

**Week 5: Seasonal & Loyalty Bonuses**

- [ ] Implement seasonal bonus system with scheduling
- [ ] Create loyalty milestone tracking
- [ ] Build holiday/event bonus templates
- [ ] Add automated campaign activation

**Week 6: A/B Testing Framework**

- [ ] Implement A/B testing service and models
- [ ] Build test creation and management interface
- [ ] Add statistical analysis capabilities
- [ ] Create test results visualization

### Phase 2.4: Polish & Launch (Weeks 7-8)

**Week 7: Analytics & Optimization**

- [ ] Complete comprehensive analytics dashboard
- [ ] Implement automated performance monitoring
- [ ] Add campaign optimization recommendations
- [ ] Build fraud monitoring and alerting

**Week 8: Testing & Launch**

- [ ] Comprehensive testing across all bonus types
- [ ] Performance optimization and load testing
- [ ] Admin training and documentation
- [ ] Gradual rollout with monitoring

## Success Metrics & KPIs

### Operational Metrics

**Campaign Creation Efficiency:**

- Time to create new campaign: < 30 minutes (target: 15 minutes)
- Campaigns created per week: 5+ (vs 0.5 in Phase 1)
- Engineering hours required per campaign: 0 (vs 16 hours in Phase 1)

**System Performance:**

- Admin dashboard load time: < 2 seconds
- Campaign activation time: < 5 minutes
- Support concurrent campaigns: 10+ without performance degradation

### Business Impact Metrics

**Revenue Growth:**

- Overall bonus program ROI: 40% improvement
- Revenue attribution from bonuses: $50,000+ monthly
- Cost per acquisition reduction: 25%

**User Acquisition:**

- New users from referral bonuses: 1,000+ monthly
- Viral coefficient: 0.3+ (each user brings 0.3 new users)
- Seasonal campaign conversion rate: 15%+

**User Retention:**

- 30-day retention for bonus participants: 45%+ (vs 35% for non-participants)
- Bonus program participation rate: 60% of active users
- Cross-bonus engagement: 30% of users participate in multiple bonus types

### Quality Metrics

**Fraud Prevention:**

- Fraud rate across all bonus types: < 2%
- False positive rate in fraud detection: < 5%
- Time to detect and prevent fraud: < 24 hours

**User Experience:**

- Admin satisfaction score: 4.5/5
- User bonus claim success rate: > 95%
- Support tickets related to bonuses: < 10 per month

## Risk Assessment & Mitigation

### Technical Risks

**High Risk: Performance Degradation**

- _Risk_: Multiple concurrent campaigns could impact system performance
- _Mitigation_: Implement comprehensive load testing, database optimization, caching strategies
- _Monitoring_: Set up automated performance alerts and scaling triggers

**Medium Risk: Data Integrity**

- _Risk_: Complex bonus calculations and A/B testing could lead to data inconsistencies
- _Mitigation_: Implement comprehensive transaction logging, data validation, automated testing
- _Monitoring_: Daily data integrity checks and reconciliation processes

### Business Risks

**High Risk: Fraud Escalation**

- _Risk_: More bonus types create more fraud attack vectors
- _Mitigation_: Enhanced fraud detection, manual review processes, gradual rollout
- _Monitoring_: Real-time fraud rate monitoring with automated alerts

**Medium Risk: Campaign Management Complexity**

- _Risk_: Marketing teams might create conflicting or suboptimal campaigns
- _Mitigation_: Admin training, campaign approval workflows, performance guidelines
- _Monitoring_: Regular campaign performance reviews and optimization recommendations

### Operational Risks

**Medium Risk: Admin User Error**

- _Risk_: Incorrect campaign configuration could lead to budget overruns or user frustration
- _Mitigation_: Comprehensive validation, preview functionality, rollback capabilities
- _Monitoring_: Audit logs and automated budget monitoring

## Post-Launch Optimization

### Month 1: Monitoring & Refinement

- [ ] Monitor all success metrics daily
- [ ] Gather admin user feedback and iterate on UX
- [ ] Optimize campaign performance based on data
- [ ] Fine-tune fraud detection algorithms

### Month 2: Feature Enhancement

- [ ] Add advanced segmentation capabilities
- [ ] Implement predictive analytics for campaign optimization
- [ ] Create campaign template marketplace
- [ ] Add integration APIs for external marketing tools

### Month 3: Scaling & Automation

- [ ] Implement machine learning for automatic campaign optimization
- [ ] Add multi-site support for enterprise clients
- [ ] Create advanced reporting and business intelligence features
- [ ] Plan Phase 3: Mobile app and real-time personalization

---

## Conclusion

Phase 2 of the Generic Bonus System represents a transformational step from a single-bonus implementation to a comprehensive, self-service marketing platform. By enabling marketing teams to independently create, manage, and optimize diverse bonus campaigns, this phase unlocks the platform's full potential for user acquisition and retention while maintaining the technical excellence and fraud prevention established in Phase 1.

The combination of referral bonuses, seasonal campaigns, loyalty programs, and A/B testing capabilities provides a powerful toolkit for sustainable growth, while the intuitive admin interface ensures these tools can be leveraged effectively by non-technical team members.

Success in Phase 2 will establish the foundation for Phase 3 enhancements including mobile applications, real-time personalization, and advanced AI-driven optimization, positioning the platform as a leader in intelligent bonus management systems.
