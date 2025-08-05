# Notification Center System PRD

**Version**: 1.0  
**Date**: 2024-12-31  
**Status**: Ready for Development  
**Priority**: Next Deliverable

## Executive Summary

The Notification Center System provides a centralized in-app notification system for all user communications, starting with bonus-related notifications and expanding to support promotions, system updates, and user interactions. This system ensures users never miss important information and provides a foundation for future engagement features.

## Business Context

### Why This Matters

- **User Retention**: Keep users informed about important account activities
- **Engagement**: Drive user interaction through timely notifications
- **Compliance**: Provide audit trail for important system communications
- **Foundation**: Enable future marketing and engagement features

### Business Objectives

1. Increase user engagement through timely, relevant notifications
2. Reduce support inquiries by proactive communication
3. Provide foundation for marketing automation
4. Enable real-time user communication

## Feature Overview

### Core Capabilities

- **In-app notification center** with unread count and navigation
- **Multi-type notification support** (bonus, promotion, system, etc.)
- **Real-time notification delivery** and status management
- **Notification persistence** and history
- **Admin notification management** and broadcasting
- **User preference controls** for notification types

### User Experience

- Prominent notification bell icon with unread count
- Dropdown or drawer interface for notification list
- Clear visual distinction between read/unread notifications
- Click-to-action functionality for actionable notifications
- Notification history and management

## Detailed Requirements

### 1. Notification Types

**Initial Types**:

- `BONUS_ELIGIBLE`: User becomes eligible for a bonus
- `BONUS_CLAIMED`: User successfully claims a bonus
- `BONUS_EXPIRED`: User's bonus has expired
- `WELCOME_BONUS`: Welcome bonus granted
- `SYSTEM_UPDATE`: Important system announcements
- `PROMOTION`: Marketing promotions and offers

**Future Types** (v2):

- `REFERRAL_REWARD`: Referral program notifications
- `DEAL_ALERT`: Deal and cashback alerts
- `ACCOUNT_SECURITY`: Security-related notifications
- `ACHIEVEMENT`: Gamification achievements

### 2. Notification Center UI

**Header Integration**:

```typescript
// Notification bell in header
<NotificationCenter />
  - Bell icon with unread count badge
  - Dropdown/drawer on click
  - Real-time updates
```

**Notification List**:

- Show recent 50 notifications
- Infinite scroll for older notifications
- Visual indicators for read/unread status
- Click actions (mark as read, dismiss, navigate)
- Empty state for no notifications

**Notification Item**:

- Title, message, timestamp
- Icon based on notification type
- Action buttons (if applicable)
- Visual styling for unread items

### 3. Real-time Functionality

**Live Updates**:

- WebSocket/Server-Sent Events for real-time delivery
- Automatic unread count updates
- New notification animations/indicators

**Status Management**:

- Mark individual notifications as read
- Mark all as read functionality
- Dismiss/archive notifications
- Auto-mark as read on click

### 4. Admin Management

**Notification Broadcasting**:

- Send system-wide notifications
- Target specific user segments
- Schedule notifications for future delivery
- Preview notification appearance

**Analytics Dashboard**:

- Notification delivery rates
- Read/engagement rates by type
- User interaction analytics
- Performance metrics

## Technical Specification

### Database Schema

```prisma
enum NotificationTypeEnum {
  BONUS_ELIGIBLE
  BONUS_CLAIMED
  BONUS_EXPIRED
  WELCOME_BONUS
  SYSTEM_UPDATE
  PROMOTION
  REFERRAL_REWARD
  DEAL_ALERT
  ACCOUNT_SECURITY
  ACHIEVEMENT

  @@allow('all', true)
}

enum NotificationStatusEnum {
  Unread
  Read
  Dismissed

  @@allow('all', true)
}

model NotificationType {
  id NotificationTypeEnum @id
  name String
  description String?
  isEnabled Boolean @default(true)
  defaultTemplate String?
  iconName String?
  color String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  notifications UserNotification[]

  @@allow('all', true)
}

model NotificationStatus {
  id NotificationStatusEnum @id
  name String
  description String?

  notifications UserNotification[]

  @@allow('all', true)
}

model UserNotification {
  id String @id @default(cuid())
  userId String
  typeId NotificationTypeEnum
  title String
  message String
  actionUrl String?
  actionLabel String?
  metadata Json?
  statusId NotificationStatusEnum @default(Unread)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  readAt DateTime?
  dismissedAt DateTime?

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  type NotificationType @relation(fields: [typeId], references: [id])
  status NotificationStatus @relation(fields: [statusId], references: [id])

  @@index([userId, statusId])
  @@index([userId, createdAt])
  @@index([typeId, createdAt])
  @@allow('all', auth().id == userId)
}

// Add to User model
model User {
  // ... existing fields
  notifications UserNotification[]
}
```

### GraphQL API

```graphql
# Queries
type Query {
  getUserNotifications(
    first: Int = 20
    after: String
    statusFilter: [NotificationStatusEnum!]
    typeFilter: [NotificationTypeEnum!]
  ): UserNotificationConnection!

  getUnreadNotificationCount: Int!

  getNotificationTypes: [NotificationType!]!
}

# Mutations
type Mutation {
  markNotificationAsRead(id: String!): UserNotification!
  markAllNotificationsAsRead: BatchPayload!
  dismissNotification(id: String!): UserNotification!

  # Admin mutations
  createSystemNotification(
    input: CreateSystemNotificationInput!
  ): UserNotification!
  broadcastNotification(input: BroadcastNotificationInput!): BatchPayload!
}

# Subscriptions
type Subscription {
  notificationReceived(userId: String!): UserNotification!
  unreadCountChanged(userId: String!): Int!
}

# Types
type UserNotification {
  id: String!
  typeId: NotificationTypeEnum!
  title: String!
  message: String!
  actionUrl: String
  actionLabel: String
  metadata: JSON
  statusId: NotificationStatusEnum!
  createdAt: DateTime!
  updatedAt: DateTime!
  readAt: DateTime
  dismissedAt: DateTime

  type: NotificationType!
  status: NotificationStatus!
}

type UserNotificationConnection {
  edges: [UserNotificationEdge!]!
  pageInfo: PageInfo!
}

type UserNotificationEdge {
  node: UserNotification!
  cursor: String!
}

type NotificationType {
  id: NotificationTypeEnum!
  name: String!
  description: String
  isEnabled: Boolean!
  defaultTemplate: String
  iconName: String
  color: String
}
```

### React Components

```typescript
// Main notification center component
interface NotificationCenterProps {
  className?: string;
  placement?: 'dropdown' | 'drawer';
}

export function NotificationCenter({
  className,
  placement = 'dropdown',
}: NotificationCenterProps) {
  // Implementation with real-time updates
}

// Individual notification item
interface NotificationItemProps {
  notification: UserNotification;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onAction?: (notification: UserNotification) => void;
}

export function NotificationItem({
  notification,
  onRead,
  onDismiss,
  onAction,
}: NotificationItemProps) {
  // Implementation with actions and styling
}

// Notification list with infinite scroll
interface NotificationListProps {
  notifications: UserNotification[];
  loading?: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function NotificationList({
  notifications,
  loading,
  onLoadMore,
  hasMore,
}: NotificationListProps) {
  // Implementation with infinite scroll
}
```

### Service Layer

```typescript
// Notification service for creating notifications
interface CreateNotificationInput {
  userId: string;
  typeId: NotificationTypeEnum;
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class NotificationService {
  async createNotification(
    input: CreateNotificationInput,
  ): Promise<UserNotification> {
    // Create notification and trigger real-time update
  }

  async markAsRead(
    userId: string,
    notificationId: string,
  ): Promise<UserNotification> {
    // Update status and trigger real-time update
  }

  async broadcastSystemNotification(
    input: BroadcastNotificationInput,
  ): Promise<void> {
    // Send to multiple users
  }

  async getUnreadCount(userId: string): Promise<number> {
    // Efficient count query
  }
}
```

## Integration Points

### 1. Bonus Engine Integration

**Trigger Points**:

- User becomes eligible for bonus → `BONUS_ELIGIBLE` notification
- User claims bonus → `BONUS_CLAIMED` notification
- Bonus expires → `BONUS_EXPIRED` notification
- Welcome bonus granted → `WELCOME_BONUS` notification

**Implementation**:

```typescript
// In bonus service
async grantBonus(userId: string, bonusTemplateId: string) {
  const bonus = await this.createUserBonus(userId, bonusTemplateId);

  // Create notification
  await this.notificationService.createNotification({
    userId,
    typeId: NotificationTypeEnum.BONUS_CLAIMED,
    title: 'Bonus Earned!',
    message: `You've earned a $${bonus.amount} bonus`,
    actionUrl: '/account/bonuses',
    actionLabel: 'View Bonus'
  });

  return bonus;
}
```

### 2. Header Integration

**Header Component Update**:

```typescript
// Add to existing header
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export function Header() {
  return (
    <header>
      {/* existing header content */}
      <div className="flex items-center space-x-4">
        <NotificationCenter />
        <UserMenu />
      </div>
    </header>
  );
}
```

### 3. Real-time Updates

**WebSocket Implementation**:

- Subscribe to user-specific notification channel
- Real-time delivery of new notifications
- Live unread count updates
- Connection management and fallback

## User Experience Flows

### 1. Receiving Notifications

```
User performs action (e.g., claims bonus)
  ↓
Backend creates notification
  ↓
Real-time update sent to user
  ↓
Notification bell shows updated count
  ↓
User clicks bell to view notifications
```

### 2. Managing Notifications

```
User opens notification center
  ↓
Shows list of recent notifications
  ↓
User clicks notification → marks as read, navigates to action
  ↓
User dismisses notification → removes from active list
  ↓
User marks all as read → clears unread count
```

### 3. Admin Broadcasting

```
Admin creates system notification
  ↓
Selects target audience (all users, specific segments)
  ↓
Previews notification appearance
  ↓
Schedules or sends immediately
  ↓
Notifications delivered to target users
```

## Success Metrics

### Key Performance Indicators

**User Engagement**:

- Notification open rate (target: >70%)
- Click-through rate on actionable notifications (target: >30%)
- Time between notification and user action (target: <24 hours)

**System Performance**:

- Notification delivery time (target: <2 seconds)
- Real-time update reliability (target: >99%)
- System uptime for notification service (target: >99.9%)

**Business Impact**:

- Increase in bonus claim rate after notification
- Reduction in support tickets about missed bonuses
- User retention improvement from notification engagement

### Analytics Tracking

**Events to Track**:

- `notification_received`: When notification is created
- `notification_viewed`: When user opens notification center
- `notification_clicked`: When user clicks on notification
- `notification_dismissed`: When user dismisses notification
- `notification_action_taken`: When user clicks action button

## Implementation Plan

### Phase 1: Core Foundation (Week 1-2)

- [ ] Database schema implementation
- [ ] Basic GraphQL API (queries, mutations)
- [ ] Notification service with creation logic
- [ ] Basic UI components (NotificationCenter, NotificationItem)

### Phase 2: Real-time & UX (Week 3)

- [ ] WebSocket/SSE implementation for real-time updates
- [ ] Header integration with notification bell
- [ ] Notification list with infinite scroll
- [ ] Mark as read/dismiss functionality

### Phase 3: Admin & Integration (Week 4)

- [ ] Admin interface for system notifications
- [ ] Bonus engine integration
- [ ] Broadcasting functionality
- [ ] Analytics tracking implementation

### Phase 4: Polish & Testing (Week 5)

- [ ] UI/UX refinements and animations
- [ ] Performance optimization
- [ ] Comprehensive testing
- [ ] Documentation and deployment

## Technical Considerations

### Performance

- **Efficient Queries**: Use pagination and proper indexing
- **Real-time Scaling**: Consider Redis for WebSocket scaling
- **Caching**: Cache unread counts and recent notifications
- **Batch Operations**: Optimize bulk notification creation

### Security

- **Authorization**: Users can only access their own notifications
- **Admin Permissions**: Proper role-based access for broadcasting
- **Rate Limiting**: Prevent notification spam
- **Input Validation**: Sanitize notification content

### Scalability

- **Database Indexing**: Optimize for common query patterns
- **Message Queuing**: Use queues for high-volume notifications
- **Microservice Ready**: Design for potential service separation
- **CDN Integration**: Cache notification assets

## Future Enhancements (v2)

### Advanced Features

- **Rich Notifications**: Support for images, videos, rich formatting
- **Notification Preferences**: User control over notification types
- **Scheduled Notifications**: Time-based delivery
- **A/B Testing**: Test different notification formats
- **Push Notifications**: Mobile app integration
- **Email Fallback**: Email notifications for important updates

### Integration Opportunities

- **Marketing Automation**: Trigger campaigns based on notification engagement
- **Analytics Platform**: Deep integration with analytics tools
- **Customer Support**: Auto-create tickets from notification interactions
- **Mobile App**: Push notification support

## Conclusion

The Notification Center System provides essential infrastructure for user communication and engagement. By starting with bonus-related notifications and building a scalable foundation, we create opportunities for enhanced user experience and future marketing capabilities.

This system directly supports user retention and engagement objectives while providing the technical foundation for advanced communication features in future releases.
