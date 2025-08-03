# GitHub Projects Management Guide

This guide explains how to set up and use GitHub Projects for managing the acquisition strategy features and overall project development in the my-workspace monorepo.

## Table of Contents

1. [Creating a GitHub Project](#creating-a-github-project)
2. [Project Structure and Views](#project-structure-and-views)
3. [Issue Management](#issue-management)
4. [Labels and Milestones](#labels-and-milestones)
5. [Workflow and Process](#workflow-and-process)
6. [Integration with Development](#integration-with-development)
7. [Best Practices](#best-practices)

## Creating a GitHub Project

### Step 1: Navigate to Projects

1. Go to your GitHub repository: `https://github.com/tekminewe/my-workspace`
2. Click on the **"Projects"** tab
3. Click **"New project"**

### Step 2: Project Setup

1. **Name**: "Acquisition Strategy & Feature Development"
2. **Description**: "Tracking social media integration, user acquisition features, and overall product development"
3. **Template**: Choose "Board" for Kanban-style management
4. **Visibility**: Private (or Public if you want community visibility)

### Step 3: Initial Configuration

- **Repository linking**: Link to `tekminewe/my-workspace`
- **Team access**: Add relevant team members
- **Settings**: Enable auto-archive for completed items

## Project Structure and Views

### Board View (Primary)

Create columns for workflow stages:

```
📋 Backlog
├── Social Media Features
├── Core Acquisition Features
├── UX/UI Improvements
└── Technical Debt

🚀 Phase 1: Foundation (Current Sprint)
├── In Progress
├── Review/Testing
└── Ready for Deploy

📈 Phase 2: Social Growth (Next Sprint)
├── Planning
├── Ready to Start
└── Blocked

✅ Completed
├── Recently Done
└── Archived
```

### Table View (Secondary)

Configure table columns:

- **Title** - Issue/feature name
- **Status** - Current stage
- **Priority** - High/Medium/Low
- **Phase** - 1, 2, 3, or 4
- **Platform** - Web, Mobile, API, UI
- **Assignee** - Team member
- **Labels** - Feature type, platform, priority
- **Milestone** - Sprint or release
- **Estimate** - Story points or time

### Timeline View (Planning)

Use for:

- Sprint planning and deadlines
- Feature dependencies
- Release planning
- Milestone tracking

## Issue Management

### Issue Template Structure

Create standardized issue templates in `.github/ISSUE_TEMPLATE/`:

#### Feature Request Template

```markdown
---
name: Feature Request
about: Propose a new feature for acquisition strategy
title: '[FEATURE] '
labels: ['enhancement', 'needs-triage']
assignees: ''
---

## Feature Description

Brief description of the feature and its purpose.

## User Story

As a [type of user], I want [goal] so that [benefit].

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Requirements

### Frontend (my-web)

- [ ] Component requirements
- [ ] Page/route changes
- [ ] State management

### Backend (my-service)

- [ ] API endpoints
- [ ] Database changes
- [ ] Authentication/authorization

### UI Components (mint-ui)

- [ ] New components needed
- [ ] Component modifications
- [ ] Storybook stories

## Platform Integration

- [ ] Facebook integration
- [ ] Instagram integration
- [ ] TikTok integration
- [ ] Other: ****\_\_\_****

## Priority & Timeline

- **Priority**: High/Medium/Low
- **Phase**: 1/2/3/4
- **Estimated effort**: Small/Medium/Large
- **Dependencies**: List any blocking issues

## Success Metrics

How will we measure the success of this feature?

## Additional Notes

Any extra context, mockups, or considerations.
```

### Issue Linking Strategy

- **Epic Issues**: High-level features (e.g., "Social Media Integration")
- **Story Issues**: Specific implementable features (e.g., "Facebook OAuth Login")
- **Task Issues**: Technical implementation details (e.g., "Create SocialLoginButton component")

Use GitHub's issue relationships:

- `Closes #123` - Links completion
- `Related to #456` - Shows connections
- `Depends on #789` - Shows dependencies

## Labels and Milestones

### Label Categories

#### Priority Labels

```
🔥 priority-critical   # Production issues, blocking bugs
⭐ priority-high       # Important features, Phase 1 items
📅 priority-medium     # Nice-to-have features, Phase 2-3
📋 priority-low        # Future considerations, Phase 4
```

#### Type Labels

```
✨ type-feature        # New functionality
🐛 type-bug           # Bug fixes
📚 type-docs          # Documentation
🔧 type-enhancement   # Improvements to existing features
🧹 type-refactor      # Code improvements without feature changes
🔒 type-security      # Security-related changes
```

#### Platform Labels

```
📱 platform-mobile    # Mobile app features
🌐 platform-web       # Web application features
⚙️ platform-api       # Backend API changes
🎨 platform-ui        # UI component library
📊 platform-analytics # Analytics and tracking
```

#### Social Media Labels

```
📘 social-facebook    # Facebook integration
📷 social-instagram   # Instagram integration
🎵 social-tiktok      # TikTok integration
🐦 social-twitter     # Twitter integration
📱 social-general     # Cross-platform social features
```

#### Area Labels

```
🎯 area-acquisition   # User acquisition features
💰 area-monetization  # Revenue-related features
👥 area-social        # Social and community features
📊 area-analytics     # Data and reporting
🎨 area-ui-ux         # User interface and experience
🔐 area-auth          # Authentication and authorization
```

#### Phase Labels

```
1️⃣ phase-1           # Foundation + Social (Weeks 1-4)
2️⃣ phase-2           # Social Growth Engine (Weeks 5-8)
3️⃣ phase-3           # Advanced Social Features (Weeks 9-12)
4️⃣ phase-4           # Community & Partnerships (Weeks 13-16)
```

### Milestone Structure

Create milestones aligned with development phases:

#### Phase 1: Foundation + Social (Weeks 1-4)

- **Description**: Core acquisition features with basic social integration
- **Due date**: [Set based on current date + 4 weeks]
- **Features**: Welcome bonus, social login, basic referral, deal sharing

#### Phase 2: Social Growth Engine (Weeks 5-8)

- **Description**: Advanced social commerce and viral growth features
- **Due date**: [Set based on current date + 8 weeks]
- **Features**: Instagram Shopping, content templates, browser extension

#### Phase 3: Advanced Social Features (Weeks 9-12)

- **Description**: Full social platform integration and creator tools
- **Due date**: [Set based on current date + 12 weeks]
- **Features**: TikTok integration, creator dashboard, mobile app

#### Phase 4: Community & Partnerships (Weeks 13-16)

- **Description**: Community building and strategic partnerships
- **Due date**: [Set based on current date + 16 weeks]
- **Features**: UGC hub, social challenges, partnership tools

## Workflow and Process

### Weekly Sprint Planning

1. **Monday**: Review completed items, plan current week
2. **Wednesday**: Mid-week check-in, adjust priorities
3. **Friday**: Sprint review, prepare next week's items

### Issue Lifecycle

```
📋 Backlog
    ↓ (Sprint planning)
🚀 Phase X: Ready to Start
    ↓ (Developer picks up)
⚡ In Progress
    ↓ (Development complete)
👀 Review/Testing
    ↓ (QA passed)
🚀 Ready for Deploy
    ↓ (Deployed)
✅ Done
    ↓ (After 2 weeks)
🗄️ Archived
```

### Branch and PR Integration

- **Branch naming**: `feature/issue-123-social-login`
- **PR titles**: `[#123] Implement Facebook OAuth integration`
- **Auto-linking**: Use "Closes #123" in PR descriptions
- **Status updates**: PRs automatically move issues through workflow

## Integration with Development

### Code Repository Connections

Link issues to specific repositories:

- **my-web**: Frontend implementation
- **my-service**: Backend API changes
- **mint-ui**: UI component development
- **my-functions**: Serverless function updates

### Development Task Breakdown

For each feature issue, create sub-tasks:

```markdown
## Implementation Tasks

### Frontend (my-web) - Issues #124-126

- [ ] #124 Create social login page components
- [ ] #125 Implement OAuth flow handling
- [ ] #126 Add social sharing buttons to deal pages

### Backend (my-service) - Issues #127-129

- [ ] #127 Set up Facebook OAuth endpoints
- [ ] #128 Create user social profile schema
- [ ] #129 Implement referral tracking API

### UI Components (mint-ui) - Issues #130-131

- [ ] #130 Design SocialLoginButton component
- [ ] #131 Create SocialShareWidget component
```

### Automation Setup

Configure GitHub Actions for project automation:

```yaml
# .github/workflows/project-automation.yml
name: Project Board Automation

on:
  issues:
    types: [opened, closed, labeled]
  pull_request:
    types: [opened, closed, merged, ready_for_review]

jobs:
  update-project:
    runs-on: ubuntu-latest
    steps:
      - name: Move new issues to backlog
      - name: Move PRs to review column
      - name: Move completed items to done
      - name: Update milestone progress
```

## Best Practices

### Issue Creation

1. **Descriptive titles**: Use clear, actionable language
2. **Detailed descriptions**: Include context, requirements, and acceptance criteria
3. **Proper labeling**: Apply relevant labels immediately
4. **Link related issues**: Use GitHub's linking syntax
5. **Assign milestones**: Connect to appropriate development phase

### Project Maintenance

1. **Regular updates**: Keep issue statuses current
2. **Weekly reviews**: Assess progress and blockers
3. **Label hygiene**: Maintain consistent labeling
4. **Archive completed**: Move old completed items to archive
5. **Dependency tracking**: Monitor and update issue dependencies

### Team Collaboration

1. **Clear ownership**: Assign issues to specific team members
2. **Status communication**: Use comments for status updates
3. **Block identification**: Quickly identify and resolve blockers
4. **Knowledge sharing**: Document decisions and learnings in issues

### Metrics and Reporting

Track these key metrics:

- **Velocity**: Issues completed per sprint
- **Cycle time**: Time from start to completion
- **Burn down**: Progress toward milestone goals
- **Quality**: Bug rate and rework frequency

### Integration with External Tools

- **Slack notifications**: Project updates in team channels
- **Calendar integration**: Milestone deadlines in team calendar
- **Analytics tools**: Track feature success metrics
- **Documentation**: Link to relevant docs and guides

## Troubleshooting

### Common Issues

1. **Issues not appearing in project**: Check repository linking
2. **Automation not working**: Verify GitHub Actions permissions
3. **Labels not syncing**: Ensure consistent label names across repos
4. **Milestone confusion**: Use clear naming conventions

### Support Resources

- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Issues Guide](https://docs.github.com/en/issues)
- [GitHub Actions for Projects](https://docs.github.com/en/actions)

---

## Next Steps

1. Create the GitHub Project using this guide
2. Set up initial labels and milestones
3. Create Phase 1 backlog items using the detailed feature list
4. Configure project automation
5. Begin weekly sprint planning process

For questions or improvements to this guide, create an issue with the `type-docs` label.
