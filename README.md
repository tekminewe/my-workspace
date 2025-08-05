# Generic Bonus Engine

A comprehensive bonus management system designed to handle various types of bonuses including welcome bonuses, referral rewards, deposit bonuses, and more. Built with NestJS, Next.js, and PostgreSQL.

## 🏗️ Architecture

This is a monorepo containing multiple applications and packages:

- **`my-service/`** - NestJS backend API with GraphQL
- **`my-web/`** - Next.js frontend application
- **`mint-ui/`** - Shared React component library
- **`my-functions/`** - AWS Lambda functions
- **`docs/`** - Project documentation
- **`scripts/`** - Utility scripts

## ✨ Features

### Bonus Engine Features

- **Multi-type Bonus Support**: Welcome, referral, deposit, spending, loyalty, seasonal, and custom bonuses
- **Flexible Template System**: Create and manage bonus templates with complex rules
- **Progress Tracking**: Real-time tracking of bonus progress and milestones
- **Fraud Prevention**: Built-in fraud detection and prevention mechanisms
- **Audit Trail**: Complete audit logging for all bonus-related activities
- **User Targeting**: Advanced targeting rules for bonus eligibility
- **Integration Ready**: Seamless integration with wallet and payment systems

### Technical Features

- **GraphQL API**: Type-safe API with subscriptions for real-time updates
- **Database**: PostgreSQL with Prisma ORM and ZenStack for access control
- **Authentication**: NextAuth.js with multiple providers
- **UI Components**: Consistent design system with Tailwind CSS
- **Type Safety**: Full TypeScript coverage across all applications
- **Deployment**: AWS Lambda, containerized services

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL 14+
- Docker (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-workspace
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**

   ```bash
   cd my-service
   pnpm prisma migrate dev
   pnpm seed
   ```

5. **Start services**

   ```bash
   # Terminal 1 - Backend
   cd my-service
   pnpm dev

   # Terminal 2 - Frontend
   cd my-web
   pnpm dev

   # Terminal 3 - Component Library (optional)
   cd mint-ui
   pnpm storybook
   ```

## 📁 Project Structure

```
my-workspace/
├── .taskmaster/          # Task management files
├── docs/                 # Documentation
├── scripts/              # Utility scripts
├── my-service/           # Backend API
│   ├── src/
│   │   ├── bonus/        # Bonus engine modules
│   │   ├── user/         # User management
│   │   ├── wallet/       # Wallet integration
│   │   └── ...
│   ├── prisma/           # Database migrations
│   └── zenstack/         # Data models
├── my-web/               # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Next.js pages
│   │   ├── graphql/      # GraphQL queries
│   │   └── ...
├── mint-ui/              # Component library
│   ├── src/
│   └── stories/          # Storybook stories
└── my-functions/         # Lambda functions
```

## 🎯 Bonus Engine

### Core Concepts

- **Bonus Templates**: Define the structure, rules, and configuration for bonus types
- **User Bonuses**: Individual bonus instances assigned to users
- **Bonus Claims**: Records of bonus redemptions and payouts
- **Tracking Events**: Progress tracking for completion-based bonuses
- **Fraud Checks**: Automated fraud detection and prevention

### Bonus Types

1. **Welcome Bonus**: New user onboarding rewards
2. **Referral Bonus**: Rewards for successful referrals
3. **Deposit Bonus**: Bonuses based on deposit amounts
4. **Spending Bonus**: Rewards for spending milestones
5. **Loyalty Bonus**: Long-term user loyalty rewards
6. **Seasonal Bonus**: Time-based promotional bonuses
7. **Completion Bonus**: Task or goal completion rewards
8. **Cashback Bonus**: Percentage-based cashback rewards

### API Endpoints

```graphql
# Query available bonuses for a user
query GetUserBonuses($userId: String!) {
  userBonuses(userId: $userId) {
    id
    status
    progress
    template {
      name
      type
      description
    }
  }
}

# Claim a bonus
mutation ClaimBonus($userBonusId: String!) {
  claimBonus(userBonusId: $userBonusId) {
    id
    status
    amount
  }
}
```

## 🔧 Development

### Database Migrations

```bash
cd my-service
pnpm prisma migrate dev --name migration_name
```

### Generate Types

```bash
cd my-service
pnpm generate

cd my-web
pnpm codegen
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Component tests
cd mint-ui
pnpm test
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
cd my-service && pnpm build
cd my-web && pnpm build
```

## 🚢 Deployment

### Backend (AWS Lambda)

```bash
cd my-functions
sam build
sam deploy
```

### Frontend (Vercel/AWS)

```bash
cd my-web
pnpm build
# Deploy to your preferred platform
```

### Database Migrations

```bash
cd my-service
pnpm prisma migrate deploy
```

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Database Schema](docs/database.md)
- [Component Library](mint-ui/README.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages
- Ensure CI/CD passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Tech Stack

- **Backend**: NestJS, GraphQL, Prisma, ZenStack, PostgreSQL
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI**: Custom component library with Storybook
- **Database**: PostgreSQL with connection pooling
- **Authentication**: NextAuth.js
- **Deployment**: AWS Lambda, Docker, Vercel
- **Monitoring**: (To be configured)
- **Testing**: Jest, Playwright

## 📞 Support

For questions and support:

- Create an issue in this repository
- Check the [documentation](docs/)
- Review existing issues and discussions

---

**Status**: 🚧 Under active development

This project is currently in development as part of implementing a comprehensive Generic Bonus Engine system.
