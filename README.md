# My Private Workspace

A private monorepo for white label single tenant configurable web application that can deploy as cashback website and potentially ecommerce website.

## Architecture

This monorepo contains the following packages:

### 📱 `packages/mint-ui`
Generic private UI library built with React 19 and TypeScript. Contains reusable components for the entire application ecosystem.

- **Technology**: React 19, TypeScript, Tailwind CSS, Storybook
- **Development**: `pnpm dev:mint-ui`
- **Build**: `pnpm build:mint-ui`

### 🚀 `packages/my-service`
NestJS GraphQL API service providing backend functionality for both user and admin interfaces.

- **Technology**: NestJS 9, GraphQL, Prisma, PostgreSQL, AWS Cognito
- **Development**: `pnpm dev:service` (runs on http://localhost:3020/graphql)
- **Build**: `pnpm build:service`

### 🌐 `packages/my-web`
Next.js 15 web application with App Router containing both user and admin interfaces.

- **Technology**: Next.js 15, TypeScript, Tailwind CSS, Apollo Client
- **Development**: `pnpm dev:web`
- **Build**: `pnpm build:web`

### ⚡ `packages/my-functions`
AWS SAM serverless functions for cashback callbacks, email callbacks, and other integrations.

- **Technology**: AWS SAM, TypeScript, AWS Lambda
- **Development**: `pnpm dev:functions`
- **Build**: `pnpm build:functions`

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL (for my-service)
- AWS CLI (for my-functions deployment)

### Installation

```bash
# Clone the repository
git clone <your-private-repo-url>
cd my-private-workspace

# Install all dependencies
pnpm install

# Build mint-ui first (required for other packages)
pnpm build:mint-ui
### Development

```bash
# Start all services
pnpm dev:all

# Or start services individually
pnpm dev:mint-ui    # Storybook on http://localhost:6006
pnpm dev:service    # GraphQL API on http://localhost:3020
pnpm dev:web        # Next.js app on http://localhost:3000
pnpm dev:functions  # AWS SAM local API
```

### Building

```bash
# Build all packages
pnpm build:all

# Or build packages individually
pnpm build:mint-ui
pnpm build:service
pnpm build:web
pnpm build:functions
```

### Testing

```bash
# Test all packages
pnpm test:all

# Run specific tests
pnpm test:service
pnpm test:web
```

## Development Workflow

### Making Changes to mint-ui

When you make changes to `packages/mint-ui`, they will be automatically reflected in `packages/my-web` thanks to the workspace dependency setup. No need to rebuild and reinstall!

1. Make your changes in `packages/mint-ui`
2. The changes will be hot-reloaded in `packages/my-web`
3. Build mint-ui when ready: `pnpm build:mint-ui`

### Database Changes

1. Update schema in `packages/my-service/zenstack/*.zmodel`
2. Generate Prisma client: `pnpm gen:prisma`
3. Create and run migrations as needed

### GraphQL Changes

1. Make changes to GraphQL schema in `packages/my-service`
2. Generate types for frontend: `pnpm gen:graphql`

## Scripts Reference

### Root Level Scripts

```bash
# Development
pnpm dev:mint-ui    # Start Storybook
pnpm dev:service    # Start GraphQL API
pnpm dev:web        # Start Next.js app
pnpm dev:functions  # Start AWS SAM local
pnpm dev:all        # Start service + web concurrently

# Building
pnpm build:mint-ui
pnpm build:service
pnpm build:web
pnpm build:functions
pnpm build:all      # Build all packages

# Testing & Quality
pnpm test:all       # Run all tests
pnpm lint:all       # Lint all packages
pnpm typecheck:all  # Type check all packages

# Code Generation
pnpm gen:graphql    # Generate GraphQL types
pnpm gen:prisma     # Generate Prisma client

# Maintenance
pnpm clean          # Clean all build artifacts
pnpm fresh-install  # Clean install from scratch
```

## Project Structure

```
my-private-workspace/
├── packages/
│   ├── mint-ui/           # Private UI component library
│   ├── my-service/        # NestJS GraphQL API
│   ├── my-web/           # Next.js web application
│   └── my-functions/     # AWS SAM serverless functions
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── package.json          # Root package with workspace scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── turbo.json           # Turbo build configuration
└── README.md            # This file
```

## Features

### Cashback Website Features

- User registration and authentication (AWS Cognito)
- Advertiser search and browsing
- Cashback tracking and management  
- Wallet and transaction history
- Withdrawal processing
- Admin dashboard for management

### Technical Features

- **Hot Reloading**: Changes in mint-ui instantly reflect in my-web
- **Type Safety**: End-to-end TypeScript with GraphQL code generation
- **Monorepo Benefits**: Shared tooling, atomic commits, simplified CI/CD
- **Modern Stack**: React 19, Next.js 15, NestJS 9, pnpm workspaces

## Deployment

The GitHub Actions workflow automatically deploys:

- **my-service** → AWS ECS
- **my-web** → Your hosting platform  
- **my-functions** → AWS Lambda

See `.github/workflows/ci.yml` for deployment configuration.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `pnpm test:all`
4. Ensure no type errors: `pnpm typecheck:all`
5. Create a pull request

## Environment Variables

Update environment variables in:
- `packages/my-service/.env` (see `.env.template`)
- `packages/my-web/.env.local` (see `.env.example`)

## Support

For questions or issues, please create an issue in this repository.

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
