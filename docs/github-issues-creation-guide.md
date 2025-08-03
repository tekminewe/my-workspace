# GitHub Issues Creation Guide

This document provides ready-to-use GitHub issue content for creating the Phase 1 acquisition strategy backlog items in your GitHub Project.

## Quick Setup Instructions

1. **Create the GitHub Project first** following [`docs/github-projects-guide.md`](./github-projects-guide.md)
2. **Set up labels** using the label definitions in the guide
3. **Create milestones** for each phase (Phase 1, 2, 3, 4)
4. **Create issues** using the templates below
5. **Assign to milestones** and add appropriate labels

## Phase 1 Issues (Copy & Paste Ready)

### Issue 1: Welcome Bonus System

**Title:** `[FEATURE] Welcome Bonus System for New User Acquisition`

**Labels:** `type-feature`, `area-acquisition`, `phase-1`, `platform-web`, `platform-api`, `priority-high`

**Milestone:** Phase 1: Foundation + Social (Weeks 1-4)

**Description:**

````markdown
## Feature Description

Implement a welcome bonus system that gives new users immediate value upon signup to improve conversion rates and user acquisition.

## User Story

As a new user, I want to receive an immediate welcome bonus when I sign up so that I feel incentivized to start using the cashback platform right away.

## Business Value

- **Acquisition Impact**: Reduces signup friction and improves conversion rates
- **User Engagement**: Provides immediate value proposition
- **Revenue Potential**: Encourages first purchase through bonus usage
- **Competitive Advantage**: Matches industry standards for cashback platforms

## Acceptance Criteria

- [ ] New users receive $5 welcome bonus upon email verification
- [ ] Bonus is immediately available in user account balance
- [ ] Welcome bonus is prominently displayed in onboarding flow
- [ ] Admin can configure bonus amount via admin panel
- [ ] Bonus expires after 30 days if unused
- [ ] Email notification sent about bonus and expiration reminder
- [ ] Bonus usage tracked in analytics dashboard
- [ ] Prevention of abuse (one bonus per person/email/device fingerprint)
- [ ] Mobile-responsive bonus display and management

## Technical Requirements

### Frontend (my-web)

- [ ] Welcome bonus banner component on dashboard
- [ ] Onboarding flow integration with bonus highlight
- [ ] Account balance display updates to show bonus
- [ ] Bonus expiration countdown timer
- [ ] Email verification flow with bonus activation
- [ ] Mobile-optimized bonus display

### Backend (my-service)

- [ ] User bonus management API endpoints (CRUD operations)
- [ ] User bonus tracking database schema
- [ ] Email verification logic with bonus triggers
- [ ] Admin configuration endpoints for bonus amounts
- [ ] Analytics tracking events for bonus lifecycle
- [ ] Fraud prevention logic (IP, device, email validation)
- [ ] Bonus expiration job processing

### Database Schema Updates

```sql
-- Add to existing schema
CREATE TABLE user_bonuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  bonus_type VARCHAR(50) NOT NULL DEFAULT 'welcome',
  amount DECIMAL(10,2) NOT NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_bonuses_user_id ON user_bonuses(user_id);
CREATE INDEX idx_user_bonuses_status ON user_bonuses(status);
```
````

## Success Metrics

- [ ] Conversion rate from signup to first bonus usage (target: >60%)
- [ ] Time between signup and first purchase (target: <7 days)
- [ ] Bonus utilization rate (target: >80% of bonuses used)
- [ ] User retention at 7, 14, 30 days post-signup
- [ ] Cost per acquisition impact measurement

## Priority & Timeline

- **Priority**: 🔥 High
- **Phase**: 1️⃣ Foundation
- **Estimated Effort**: Medium (1-2 weeks)
- **Dependencies**: Basic user authentication system

## Additional Context

Research shows that immediate value incentives can improve signup conversion by 25-40%. Industry standard welcome bonuses range from $5-$25.

````

---

### Issue 2: Social Login Integration

**Title:** `[FEATURE] Facebook & Instagram OAuth Integration`

**Labels:** `type-feature`, `social-facebook`, `social-instagram`, `phase-1`, `platform-web`, `priority-high`

**Description:**
```markdown
## Feature Description
Implement social login integration with Facebook and Instagram to reduce signup friction and improve user acquisition through familiar authentication methods.

## User Story
As a user, I want to sign up and log in using my Facebook or Instagram account so that I can quickly access the platform without creating new credentials.

## Business Value
- **Acquisition Impact**: Reduces signup friction by 40-60%
- **Social Media Integration**: Foundation for future social commerce features
- **User Data**: Access to profile data for personalization
- **Trust Building**: Familiar authentication increases user confidence

## Acceptance Criteria
- [ ] Facebook OAuth login integration with proper scopes
- [ ] Instagram OAuth login integration
- [ ] Profile data import (name, email, profile picture)
- [ ] Account linking for existing email users
- [ ] Graceful error handling for OAuth failures
- [ ] Privacy-compliant data handling and user consent
- [ ] Social profile data sync preferences
- [ ] Account recovery via social login option

## Technical Requirements

### Frontend (my-web)
- [ ] Social login buttons on signup/login pages
- [ ] OAuth callback handling pages
- [ ] Account linking interface for existing users
- [ ] Error handling UI for OAuth failures
- [ ] Privacy settings for social data usage
- [ ] Loading states during OAuth process

### Backend (my-service)
- [ ] Facebook OAuth provider configuration
- [ ] Instagram OAuth provider configuration
- [ ] Social profile data API endpoints
- [ ] Account linking/unlinking logic
- [ ] Social authentication middleware
- [ ] User data synchronization logic

### UI Components (mint-ui)
- [ ] SocialLoginButton component with platform icons
- [ ] SocialProfileCard component for profile display
- [ ] OAuth loading states and error components

## Platform Integration
- [x] Facebook OAuth 2.0 integration
- [x] Instagram OAuth 2.0 integration
- [ ] Future: TikTok login (Phase 3)
- [ ] Future: Twitter login (Phase 3)

## Technical Implementation Details
```typescript
// OAuth configuration
const socialProviders = {
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    scope: ['email', 'public_profile'],
    callbackURL: '/auth/facebook/callback'
  },
  instagram: {
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    scope: ['user_profile', 'user_media'],
    callbackURL: '/auth/instagram/callback'
  }
};
````

## Success Metrics

- [ ] Social login adoption rate vs traditional signup (target: >40%)
- [ ] Time to complete signup reduction (target: 50% faster)
- [ ] User engagement rates comparison (social vs email users)
- [ ] Social profile completion rates
- [ ] OAuth error rates (target: <5%)

## Priority & Timeline

- **Priority**: 🔥 High
- **Phase**: 1️⃣ Foundation
- **Estimated Effort**: Medium (1-2 weeks)
- **Dependencies**: None

## Security & Privacy Considerations

- GDPR/CCPA compliance for profile data usage
- Secure token storage and refresh handling
- User consent for data access and usage
- Data retention policies for social profile information

````

---

### Issue 3: Basic Referral Program

**Title:** `[FEATURE] Social Referral Program with Tracking`

**Labels:** `type-feature`, `area-acquisition`, `social-general`, `phase-1`, `platform-web`, `platform-api`, `priority-high`

**Description:**
```markdown
## Feature Description
Implement a comprehensive referral program that incentivizes users to invite friends and share deals on social media, with robust tracking and fraud prevention.

## User Story
As an existing user, I want to refer friends and family to the platform and share deals on social media so that I can earn bonus cashback while helping others save money.

## Business Value
- **Acquisition Impact**: Viral growth through user networks
- **Cost Effective**: Lower customer acquisition cost vs paid advertising
- **Social Proof**: User recommendations build trust
- **Network Effects**: Each user potentially brings multiple new users

## Acceptance Criteria
- [ ] Unique referral codes generated for each user
- [ ] $5 bonus for referrer when referee makes first purchase over $20
- [ ] $5 bonus for referee upon signup verification
- [ ] Social sharing templates for referral links
- [ ] Comprehensive referral tracking and attribution
- [ ] User-friendly referral dashboard
- [ ] Fraud prevention (self-referrals, duplicate accounts)
- [ ] Email notifications for referral milestones
- [ ] Mobile-optimized referral sharing

## Technical Requirements

### Frontend (my-web)
- [ ] Referral dashboard page (`/dashboard/referrals`)
- [ ] Referral link generator with custom codes
- [ ] Social sharing modal with platform-specific templates
- [ ] Referral performance analytics display
- [ ] Friend invitation interface with contact import
- [ ] Referral history and earnings tracking

### Backend (my-service)
- [ ] Referral code generation system (unique, readable codes)
- [ ] Referral tracking database schema with analytics
- [ ] Referral bonus processing and escrow system
- [ ] Advanced fraud detection algorithms
- [ ] Referral analytics and reporting endpoints
- [ ] Email notification system for referral events

### Database Schema
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id),
  referee_id UUID NULL REFERENCES users(id),
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'invalid', 'fraud')),
  signup_ip INET,
  signup_user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP NULL,
  referrer_bonus DECIMAL(10,2) DEFAULT 5.00,
  referee_bonus DECIMAL(10,2) DEFAULT 5.00,
  first_purchase_amount DECIMAL(10,2) NULL,
  fraud_flags JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_referrals_code ON referrals(referral_code);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX idx_referrals_status ON referrals(status);
````

## Social Sharing Integration

### Platform-Specific Templates

```json
{
  "facebook": {
    "title": "Get $5 bonus + cashback on every purchase!",
    "description": "Join me on [Platform Name] and start earning money back on your shopping. Use my referral code for instant $5 bonus!",
    "image": "/social-assets/facebook-referral.png",
    "url": "https://platform.com/join/{referralCode}"
  },
  "instagram": {
    "caption": "💰 Making money while shopping! Get $5 bonus with my code: {referralCode} 🛍️ #cashback #savings #smartshopping",
    "story_template": "/social-assets/instagram-story-template.png",
    "url": "https://platform.com/join/{referralCode}"
  },
  "twitter": {
    "text": "💰 Get paid to shop! Join me on [Platform] with code {referralCode} for $5 bonus + cashback on everything! 🛍️",
    "url": "https://platform.com/join/{referralCode}"
  }
}
```

## Fraud Prevention Measures

- [ ] Device fingerprinting to prevent multiple accounts
- [ ] IP address tracking and geolocation validation
- [ ] Email pattern analysis for fake account detection
- [ ] Purchase behavior analysis for suspicious activity
- [ ] Manual review queue for high-value referrals
- [ ] Rate limiting on referral code generation
- [ ] Social media account verification for bonus eligibility

## Success Metrics

- [ ] Referral conversion rate (signups from referral links) - Target: >15%
- [ ] Viral coefficient (average referrals per user) - Target: >1.2
- [ ] Social sharing engagement rates - Target: >5% click-through
- [ ] Time from referral signup to first purchase - Target: <14 days
- [ ] Referral fraud rate - Target: <2%
- [ ] Customer lifetime value: referred vs organic users

## Priority & Timeline

- **Priority**: 🔥 High
- **Phase**: 1️⃣ Foundation
- **Estimated Effort**: Large (2-3 weeks)
- **Dependencies**: Social login integration, email system

## Risk Mitigation

- **Fraud Detection**: Multi-layered approach to prevent abuse
- **Budget Control**: Cap on total referral bonuses per month
- **Quality Control**: Minimum purchase requirements for bonus activation
- **Legal Compliance**: Terms of service updates for referral program

````

---

### Issue 4: Deal Sharing Templates

**Title:** `[FEATURE] Social Media Deal Sharing Templates`

**Labels:** `type-feature`, `social-general`, `area-acquisition`, `phase-1`, `platform-web`, `priority-medium`

**Description:**
```markdown
## Feature Description
Create branded, platform-optimized social media templates that users can customize and share to promote deals and attract new users to the platform.

## User Story
As a user, I want to easily share deals and cashback opportunities on social media with attractive, branded templates so that my friends can benefit and I can earn referral bonuses.

## Business Value
- **Viral Marketing**: User-generated content promotes the platform organically
- **Brand Awareness**: Consistent branded templates increase recognition
- **Social Proof**: Real users sharing deals builds credibility
- **Cost Effective**: Reduces paid social media advertising needs

## Acceptance Criteria
- [ ] Pre-designed sharing templates for Facebook, Instagram, Twitter
- [ ] Automatic deal information population (merchant, offer, cashback rate)
- [ ] Branded visual elements with platform logo and colors
- [ ] Platform-specific optimization (image sizes, character limits)
- [ ] One-click sharing to multiple platforms simultaneously
- [ ] Share engagement tracking and analytics
- [ ] Custom message input with suggested text
- [ ] Deal expiration warnings in shared content
- [ ] Mobile-optimized template generation and sharing

## Technical Requirements

### Frontend (my-web)
- [ ] Social sharing modal component with template preview
- [ ] Template customization interface
- [ ] Platform-specific share buttons with native integration
- [ ] Custom message input with character count
- [ ] Real-time template preview with user data
- [ ] Sharing analytics dashboard for users

### Backend (my-service)
- [ ] Dynamic template generation API with deal data
- [ ] Social sharing tracking system
- [ ] Image generation service for dynamic content
- [ ] Platform API integrations for direct posting
- [ ] Template performance analytics collection

### UI Components (mint-ui)
- [ ] ShareButton component with platform icons
- [ ] SocialTemplate component with customization options
- [ ] ShareModal component with multi-platform support
- [ ] TemplatePreview component with real-time updates

## Template Specifications

### Platform Requirements
```json
{
  "facebook": {
    "image_size": "1200x630",
    "title_max_chars": 25,
    "description_max_chars": 90,
    "link_preview": true
  },
  "instagram": {
    "post_size": "1080x1080",
    "story_size": "1080x1920",
    "caption_max_chars": 2200,
    "hashtag_limit": 30
  },
  "twitter": {
    "image_size": "1024x512",
    "text_max_chars": 280,
    "link_shortening": true
  }
}
````

### Template Variables

```typescript
interface TemplateData {
  merchantName: string;
  offerDescription: string;
  cashbackRate: string;
  offerUrl: string;
  userReferralCode: string;
  expirationDate?: Date;
  originalPrice?: number;
  discountedPrice?: number;
  savings?: number;
}
```

## Template Designs

### Facebook Template

- High-quality hero image with deal highlight
- Platform branding in corner
- Clear call-to-action with referral code
- Merchant logo and cashback rate prominently displayed

### Instagram Template

- Square format optimized for feed
- Story template with interactive elements
- Aesthetic design matching Instagram trends
- Hashtag suggestions for maximum reach

### Twitter Template

- Concise text with key offer details
- Eye-catching image with savings highlight
- Shortened URL with tracking parameters
- Relevant hashtags for discoverability

## Success Metrics

- [ ] Share button click-through rate - Target: >8%
- [ ] Social media engagement on shared content - Target: >3%
- [ ] Click-through rate from shared links - Target: >12%
- [ ] Conversion rate from social shares - Target: >5%
- [ ] Template usage rate by users - Target: >25%
- [ ] Platform-specific performance comparison

## Priority & Timeline

- **Priority**: 📅 Medium
- **Phase**: 1️⃣ Foundation
- **Estimated Effort**: Small (3-5 days)
- **Dependencies**: Basic deal management system

## Design Requirements

- Consistent brand guidelines across all templates
- Mobile-first design approach
- Accessibility compliance for text and color contrast
- A/B testing capability for template variations
- Seasonal template updates and customization

````

---

### Issue 5: Email Notification System

**Title:** `[FEATURE] User Engagement Email Notification System`

**Labels:** `type-feature`, `area-acquisition`, `platform-api`, `phase-1`, `priority-medium`

**Description:**
```markdown
## Feature Description
Implement a comprehensive email notification system to keep users engaged with personalized deal alerts, bonus reminders, and onboarding sequences.

## User Story
As a user, I want to receive timely email notifications about deals, bonuses, and account activity so that I never miss opportunities to earn cashback and stay engaged with the platform.

## Business Value
- **User Retention**: Regular communication keeps users engaged
- **Revenue Increase**: Deal alerts drive more transactions
- **Onboarding**: Email sequences improve new user activation
- **Re-engagement**: Win back inactive users with targeted campaigns

## Acceptance Criteria
- [ ] Welcome email sequence for new users (3 emails over 7 days)
- [ ] Deal alert emails for user-selected categories
- [ ] Bonus expiration reminders (7 days, 3 days, 1 day before)
- [ ] Referral milestone notifications
- [ ] Weekly deal roundup emails with personalization
- [ ] Comprehensive unsubscribe management
- [ ] Email preference settings with granular controls
- [ ] Mobile-responsive email templates
- [ ] Analytics tracking for all email campaigns

## Technical Requirements

### Backend (my-service)
- [ ] Email service integration (SendGrid/AWS SES)
- [ ] Email template system with dynamic content
- [ ] Notification scheduling and queue system
- [ ] Unsubscribe handling with one-click compliance
- [ ] Email analytics tracking (opens, clicks, conversions)
- [ ] User preference management system
- [ ] A/B testing framework for email campaigns

### Frontend (my-web)
- [ ] Email preference settings page
- [ ] Notification history display for users
- [ ] Unsubscribe confirmation pages
- [ ] Email preview functionality for testing

### Database Schema
```sql
CREATE TABLE email_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  welcome_emails BOOLEAN DEFAULT true,
  deal_alerts BOOLEAN DEFAULT true,
  bonus_reminders BOOLEAN DEFAULT true,
  referral_notifications BOOLEAN DEFAULT true,
  weekly_roundup BOOLEAN DEFAULT true,
  promotional_emails BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  template_id VARCHAR(100) NOT NULL,
  subject_line VARCHAR(255) NOT NULL,
  send_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'draft',
  recipient_count INTEGER DEFAULT 0,
  open_rate DECIMAL(5,4),
  click_rate DECIMAL(5,4),
  conversion_rate DECIMAL(5,4)
);
````

## Email Templates & Sequences

### Welcome Email Series (3 emails over 7 days)

**Email 1: Welcome + Bonus Activation (Day 0)**

- Subject: "Welcome! Your $5 bonus is ready 🎉"
- Content: Platform introduction, bonus activation, first steps
- CTA: "Start Shopping & Earning"

**Email 2: Maximizing Cashback Guide (Day 3)**

- Subject: "How to earn $100+ cashback this month"
- Content: Best practices, top deals, browser extension
- CTA: "Download Browser Extension"

**Email 3: Referral Invitation (Day 7)**

- Subject: "Earn $5 for every friend you invite"
- Content: Referral program explanation, sharing tools
- CTA: "Invite Friends Now"

### Ongoing Email Campaigns

**Weekly Deal Roundup (Every Monday)**

- Personalized based on user categories
- Top 5 deals with highest cashback rates
- New merchant spotlights
- User earnings summary

**Deal Alerts (Real-time/Daily digest)**

- Category-specific deal notifications
- Price drop alerts for watched items
- Limited-time offer announcements
- Cashback rate increases

## Email Service Configuration

```typescript
// Email service setup
const emailConfig = {
  provider: 'sendgrid', // or 'aws-ses'
  apiKey: process.env.SENDGRID_API_KEY,
  fromEmail: 'no-reply@platform.com',
  fromName: 'Platform Team',
  replyTo: 'support@platform.com',
  unsubscribeUrl: 'https://platform.com/unsubscribe',
  trackingDomain: 'track.platform.com',
};
```

## Personalization Features

- [ ] User name and profile data integration
- [ ] Purchase history-based recommendations
- [ ] Geographic location-based deals
- [ ] Browsing behavior-triggered emails
- [ ] Abandoned cart recovery emails
- [ ] Re-engagement campaigns for inactive users

## Compliance & Best Practices

- [ ] CAN-SPAM Act compliance
- [ ] GDPR compliance for EU users
- [ ] One-click unsubscribe functionality
- [ ] Clear sender identification
- [ ] Honest subject lines
- [ ] Mobile-responsive design
- [ ] Accessibility standards compliance

## Success Metrics

- [ ] Email open rates by campaign type - Target: >25%
- [ ] Click-through rates to website - Target: >8%
- [ ] Conversion rates from email campaigns - Target: >5%
- [ ] Unsubscribe rates - Target: <2%
- [ ] Email-driven revenue attribution
- [ ] User engagement lift from email campaigns

## Priority & Timeline

- **Priority**: 📅 Medium
- **Phase**: 1️⃣ Foundation
- **Estimated Effort**: Medium (1-2 weeks)
- **Dependencies**: User preference system, analytics tracking

## A/B Testing Plan

- Subject line variations for higher open rates
- Send time optimization by user timezone
- Content layout and CTA button testing
- Personalization level impact measurement
- Email frequency optimization

````

---

## Creating These Issues

To create these issues in your GitHub repository:

1. **Navigate to Issues**: Go to `https://github.com/tekminewe/my-workspace/issues`
2. **New Issue**: Click "New issue"
3. **Choose Template**: Select "Acquisition Feature Request"
4. **Copy Content**: Copy the content above for each issue
5. **Add Labels**: Apply the labels mentioned for each issue
6. **Set Milestone**: Assign to "Phase 1: Foundation + Social"
7. **Create**: Click "Submit new issue"

## Bulk Creation Script (Optional)

If you want to create multiple issues at once, you can use the GitHub CLI:

```bash
# Install GitHub CLI if you haven't already
brew install gh

# Authenticate
gh auth login

# Create issues from markdown files
gh issue create --title "[FEATURE] Welcome Bonus System" --body-file issue1.md --label "type-feature,area-acquisition,phase-1" --milestone "Phase 1"
````

This will populate your GitHub Project with detailed, actionable issues for Phase 1 of your acquisition strategy implementation.
