# Product Requirements Document: Basic Referral Program with Social Sharing

**Document Information:**

- **Author:** Product Manager
- **Technical Lead:** Engineering Team
- **Designer:** UX/UI Team
- **Date Created:** 2025-08-03
- **Last Updated:** 2025-08-03
- **Version:** 1.0
- **Status:** Approved
- **Related GitHub Issue:** [#4 - Basic Referral Program with Social Sharing](https://github.com/tekminewe/my-workspace/issues/4)

---

## Executive Summary

Implement a dual-sided referral program with social sharing capabilities that rewards both referrers and referees, creating a viral growth engine for user acquisition while providing immediate value to participants.

## Problem Statement

### What problem are we solving?

Our cashback platform lacks organic growth mechanisms, requiring expensive paid acquisition channels. Users have no incentive to share the platform with friends and family, missing opportunities for word-of-mouth marketing and community-driven growth.

### Why does this problem matter?

- **High Customer Acquisition Cost (CAC)**: Paid channels are expensive and unsustainable
- **Limited Organic Growth**: No mechanisms for users to drive growth
- **Missed Network Effects**: Users' social networks are untapped for growth
- **Low Engagement**: Users lack incentives beyond personal cashback
- **Trust Gap**: Referrals from friends carry higher trust than advertising

### Why now?

- Social login integration (Issue #3) enables social sharing
- Welcome bonus system (Issue #2) provides foundation for referral rewards
- Market conditions favor referral programs (proven by competitors)
- Technical infrastructure is ready for reward management

## Goals and Success Metrics

### Primary Goals

- [ ] Create sustainable organic growth channel
- [ ] Increase user lifetime value through network effects
- [ ] Reduce customer acquisition cost by 40%
- [ ] Build viral sharing mechanisms for platform growth

### Non-Goals (Out of Scope)

- [ ] Multi-level marketing or pyramid scheme features
- [ ] Complex tier-based referral systems (Phase 2)
- [ ] Corporate/enterprise referral programs
- [ ] Referral contests or gamification (Phase 2)

### Success Metrics

| Metric | Baseline | Target | How to Measure |
|--------|----------|--------|----------------|
| Viral coefficient | 0 | 1.2 | Referrals per user |
| Organic growth rate | 5% | 25% | Monthly user acquisition |
| Referral conversion rate | 0% | 15% | Signups from referral links |
| Cost per acquisition | $25 | $15 | Blended CAC calculation |
| Referral program participation | 0% | 35% | Users with referral activity |

## Target Audience

### Primary Users

**Active Referrers**
- Age: 25-45
- High platform engagement
- Social media active
- Value-conscious shoppers
- Natural recommenders

**Potential Referees**
- Friends/family of existing users
- Similar demographics to current user base
- New to cashback platforms
- Price-sensitive consumers

### User Journey

**Referrer Journey:**
1. **Discovery**: Finds referral program in dashboard
2. **Code Generation**: Gets unique referral code/link
3. **Sharing**: Shares via social media or direct link
4. **Tracking**: Monitors referral success and rewards
5. **Rewards**: Receives bonus when referee makes first purchase

**Referee Journey:**
1. **Invitation**: Receives referral link from friend
2. **Signup**: Uses referral link to create account
3. **Bonus**: Receives immediate welcome bonus
4. **First Purchase**: Makes qualifying purchase
5. **Reward Trigger**: Both parties receive referral rewards

## Detailed Requirements

### Functional Requirements

#### Referral System Core

**Referral Code Management**
- Unique referral codes for each user (alphanumeric, memorable)
- Custom referral links with user branding
- QR code generation for in-person sharing
- Referral link tracking and analytics

**Reward Structure**
- $5 bonus for referrer when referee makes first purchase
- $5 bonus for referee upon successful signup
- Rewards credited to user account balance
- Clear terms and conditions for qualification

**Fraud Prevention**
- Self-referral detection and prevention
- Device fingerprinting for abuse detection
- Email domain validation
- Geographic location verification
- Suspicious activity monitoring

#### Social Sharing Integration

**Sharing Mechanisms**
- Direct social media sharing (Facebook, Instagram, Twitter)
- WhatsApp and messaging app integration
- Email invitation system
- Copy-to-clipboard functionality
- QR code sharing for mobile

**Sharing Templates**
- Pre-designed social media templates
- Customizable sharing messages
- Platform-specific optimizations
- A/B testing for sharing content

### Technical Requirements

#### Frontend (my-web)
```typescript
// Referral management interface
interface ReferralDashboard {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  pendingRewards: number;
  completedRewards: number;
  referralHistory: ReferralActivity[];
}

// Sharing component
interface SocialShareProps {
  referralLink: string;
  customMessage?: string;
  platforms: SocialPlatform[];
  onShare: (platform: SocialPlatform) => void;
}

// Referral tracking
interface ReferralTracker {
  trackReferralClick(code: string, source: string): void;
  trackSignup(code: string, userId: string): void;
  trackFirstPurchase(userId: string): void;
}
```

**UI Components (mint-ui)**
- ReferralDashboard component
- SocialShareButton component
- ReferralCodeDisplay component
- ReferralProgress component
- ShareModal component

#### Backend (my-service)
```typescript
// Referral service
interface ReferralService {
  generateReferralCode(userId: string): Promise<string>;
  trackReferralSignup(code: string, newUserId: string): Promise<ReferralResult>;
  processReferralReward(referralId: string): Promise<RewardResult>;
  getReferralStats(userId: string): Promise<ReferralStats>;
  validateReferralEligibility(code: string, userId: string): Promise<boolean>;
}

// Fraud detection
interface FraudDetectionService {
  detectSelfReferral(referrerUserId: string, refereeData: UserData): Promise<boolean>;
  checkDeviceFingerprint(deviceId: string, userId: string): Promise<FraudRisk>;
  validateReferralContext(referralData: ReferralContext): Promise<ValidationResult>;
}
```

**API Endpoints**
- GET `/referrals/code` - Get user's referral code
- POST `/referrals/track-click` - Track referral link clicks
- POST `/referrals/track-signup` - Track referral signups
- GET `/referrals/stats` - Get referral statistics
- POST `/referrals/share` - Track social sharing activity

#### Database Schema

```sql
-- Referrals table
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  referrer_user_id UUID REFERENCES users(id),
  referee_user_id UUID REFERENCES users(id) NULL,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  status ENUM('pending', 'completed', 'invalid') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP NULL,
  referrer_reward_amount DECIMAL(10,2),
  referee_reward_amount DECIMAL(10,2),
  first_purchase_at TIMESTAMP NULL,
  fraud_check_status ENUM('pending', 'passed', 'failed') DEFAULT 'pending'
);

-- Referral tracking
CREATE TABLE referral_clicks (
  id UUID PRIMARY KEY,
  referral_code VARCHAR(20) REFERENCES referrals(referral_code),
  clicked_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  referrer_url TEXT,
  device_fingerprint VARCHAR(255)
);

-- Social shares tracking
CREATE TABLE referral_shares (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  platform VARCHAR(50), -- 'facebook', 'instagram', 'twitter', etc.
  shared_at TIMESTAMP DEFAULT NOW(),
  referral_code VARCHAR(20)
);

-- Update users table for referral codes
ALTER TABLE users ADD COLUMN referral_code VARCHAR(20) UNIQUE;
ALTER TABLE users ADD COLUMN referred_by_code VARCHAR(20);
```

### Non-Functional Requirements

#### Performance
- Referral code generation under 100ms
- Referral tracking under 200ms
- Social sharing links load under 1 second
- Support for 10,000+ concurrent referral activities

#### Security & Fraud Prevention
- Multi-layer fraud detection system
- Device fingerprinting for abuse prevention
- Rate limiting for referral activities
- Audit trail for all referral transactions

#### Analytics & Tracking
- Real-time referral performance metrics
- A/B testing framework for sharing content
- Conversion funnel analysis
- Fraud detection reporting

## User Experience Design

### Referral Dashboard

```
┌─────────────────────────────────────────┐
│ Your Referral Program                   │
├─────────────────────────────────────────┤
│ Your Code: SAVE2025                     │
│ [Copy] [Share] [QR Code]                │
├─────────────────────────────────────────┤
│ Stats:                                  │
│ • Total Referrals: 5                   │
│ • Pending Rewards: $15                 │
│ • Earned Rewards: $25                  │
├─────────────────────────────────────────┤
│ Share Options:                          │
│ [Facebook] [Instagram] [WhatsApp]       │
│ [Email] [Twitter] [Copy Link]           │
└─────────────────────────────────────────┘
```

### Social Sharing Templates

**Facebook/Instagram:**
```
🎉 Get paid to shop! 💰

I've been earning cashback on everything with [Platform Name]. 
Join me and get $5 to start!

Use my code: {referralCode}
Link: {referralLink}

#cashback #savings #shopping
```

**WhatsApp/Direct Message:**
```
Hey! 👋 

I found this amazing cashback app where I earn money on every purchase. You should totally try it!

Use my code "{referralCode}" and we both get $5 bonus 💰

Sign up here: {referralLink}
```

### Referral Signup Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Click Referral  │ -> │ Signup with     │ -> │ Welcome Bonus   │
│ Link            │    │ $5 Bonus        │    │ Applied         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         |                       |                       |
         v                       v                       v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Track Click     │    │ Validate Code   │    │ First Purchase  │
│ & Source        │    │ & Create User   │    │ Triggers Rewards│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Implementation Plan

### Phase 1.1: Core Referral System (Week 1-2)

**Backend Foundation**
- [ ] Create referral database schema
- [ ] Implement referral code generation
- [ ] Build referral tracking system
- [ ] Create reward processing logic

**Frontend Interface**
- [ ] Design referral dashboard
- [ ] Implement code sharing interface
- [ ] Create referral signup flow
- [ ] Add referral tracking to existing signup

### Phase 1.2: Social Sharing Integration (Week 2-3)

- [ ] Implement social sharing components
- [ ] Create sharing templates and content
- [ ] Build social media integration
- [ ] Add sharing analytics tracking

### Phase 1.3: Fraud Prevention & Polish (Week 3-4)

- [ ] Implement fraud detection system
- [ ] Add comprehensive analytics
- [ ] Performance optimization
- [ ] User testing and refinement

## Technical Dependencies

### Internal Dependencies
- **Welcome Bonus System** (Issue #2): Provides reward infrastructure
- **Social Login Integration** (Issue #3): Enables social sharing
- **Enhanced Authentication** (Issue #9): Security foundation
- **Analytics Infrastructure** (Issue #11): Tracking and reporting

### External Dependencies
- **Social Media APIs**: Facebook, Instagram, Twitter sharing APIs
- **Fraud Detection Services**: Device fingerprinting solutions
- **Analytics Platforms**: Google Analytics, Mixpanel for tracking

### Platform Requirements
- **my-web**: Referral dashboard and sharing interfaces
- **my-service**: Referral logic and fraud prevention
- **mint-ui**: Sharing components and referral widgets

## Risk Assessment

### High Risk
- **Fraud and Abuse**: Users gaming the system for free rewards
- **Viral Coefficient**: May not achieve target growth rates
- **Reward Costs**: High reward costs if fraud prevention fails

### Medium Risk
- **Social Sharing Adoption**: Users may not actively share
- **Technical Complexity**: Complex reward timing and validation
- **Customer Support**: Increased support requests about referrals

### Mitigation Strategies
- **Multi-layer Fraud Detection**: Device fingerprinting, behavior analysis
- **Conservative Launch**: Start with lower rewards, scale up based on performance
- **Clear Communication**: Comprehensive help documentation and FAQs

## Success Criteria

### Launch Criteria
- [ ] Fraud detection system operational
- [ ] Referral tracking 99.9% accurate
- [ ] Social sharing working across all platforms
- [ ] Reward processing tested and validated
- [ ] Analytics and reporting functional

### Post-Launch Monitoring
- **Week 1**: Monitor fraud attempts and system stability
- **Week 2-4**: Analyze sharing patterns and conversion rates
- **Month 1**: Evaluate viral coefficient and adjust strategy

### KPI Targets (60 days post-launch)
- **35% user participation** in referral program
- **15% conversion rate** from referral links
- **1.2 viral coefficient** (referrals per user)
- **25% organic growth rate** month-over-month
- **<5% fraud rate** for referral activities

## Future Considerations

### Phase 2 Enhancements
- Tiered referral rewards based on user activity
- Referral contests and leaderboards
- Corporate/enterprise referral programs
- Advanced social sharing automation

### Advanced Features
- Machine learning for fraud detection
- Personalized sharing content
- Referral attribution across multiple touchpoints
- Integration with influencer marketing programs

---

## Appendix

### Related Documents
- [Welcome Bonus System PRD](welcome-bonus-system-prd.md)
- [Social Login Integration PRD](social-login-integration-prd.md)
- [Deal Sharing Templates PRD](deal-sharing-templates-prd.md)
- [Technical Architecture: Rewards System](../architecture/rewards-architecture.md)

### Compliance & Legal
- [Referral Program Terms & Conditions](../legal/referral-terms.md)
- [Fraud Prevention Policies](../runbooks/fraud-prevention.md)
- [Privacy Policy Updates for Referrals](../legal/privacy-policy-referrals.md)
