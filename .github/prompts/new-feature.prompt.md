# New Feature Development Workflow

As a principal software engineer, your task is to develop the feature provided by following this comprehensive development workflow. This workflow ensures consistent, high-quality feature implementation across our monorepo containing mint-ui (React UI library), my-service (NestJS GraphQL API), my-web (Next.js 15 application), and my-functions (AWS Lambda functions).

**Deployment Context:**

- my-service deploys to AWS ECS (containerized environment)
- my-web deploys to Vercel (serverless edge deployment)

## 1. Planning & Analysis

- [ ] Define feature requirements and acceptance criteria
- [ ] Identify affected projects (mint-ui, my-service, my-web, my-functions)
- [ ] Check existing components and patterns in the workspace
- [ ] Plan API changes (GraphQL schema updates if needed)
- [ ] Review security implications and authentication requirements
- [ ] Estimate performance impact and identify optimization opportunities
- [ ] Check for breaking changes and plan migration strategy
- [ ] Plan environment variables for both AWS ECS (my-service) and Vercel (my-web)
- [ ] Verify CORS configuration for cross-platform API calls

## 2. Setup & Dependencies

- [ ] Create feature branch from main
- [ ] Update package.json dependencies if needed (use `pnpm`)
- [ ] Run `pnpm install` in affected project directories
- [ ] Verify workspace-level configuration compatibility (.prettierrc, .eslintrc.js)
- [ ] Consider AWS ECS health check requirements for my-service
- [ ] Plan Vercel-specific optimizations (ISR, Edge Functions if needed)

## 3. Backend Development (my-service)

- [ ] Update Prisma schema if database changes needed
- [ ] Run `pnpm gen:prisma` to generate client
- [ ] Implement GraphQL resolvers and services
- [ ] Use `@Public()` decorator for public endpoints
- [ ] Implement header-based language detection via `AuthService.getAcceptLanguage()`
- [ ] Add proper error handling and validation
- [ ] Plan and execute database migrations (`pnpm prisma migrate dev`)
- [ ] Consider database seeding updates if needed (`pnpm seed`)
- [ ] Implement proper logging and monitoring
- [ ] Test containerization compatibility for AWS ECS
- [ ] Configure proper health check endpoints for ECS
- [ ] Verify database connection pooling for containerized environment
- [ ] Plan Prisma migration strategy for ECS deployment

## 4. Frontend Component Development (mint-ui)

- [ ] Read `component-colors.ts` and `color-quick-reference.md` first
- [ ] Use standardized color utilities (never hardcode colors)
- [ ] Create functional components with proper TypeScript interfaces
- [ ] Add JSDoc comments with examples for all props
- [ ] Create ONE `AllVariants` Storybook story per component
- [ ] Ensure WCAG 2.1 AA compliance (keyboard nav, contrast, ARIA)
- [ ] Test both light and dark themes
- [ ] Update `component-standardization-status.md` with component status
- [ ] Test component with different content lengths (i18n considerations)
- [ ] Follow mobile-first responsive design principles

## 5. Web Application Integration (my-web)

- [ ] Run `pnpm gen:graphql` after backend changes
- [ ] Implement App Router pages/components
- [ ] Use Server Components where possible
- [ ] For admin interfaces: use full-width forms, card-based organization
- [ ] Configure Apollo Client with `Accept-Language` headers
- [ ] Implement proper loading and error states
- [ ] Follow mobile-first responsive design principles
- [ ] Implement proper SEO optimization (meta tags, structured data)
- [ ] Add proper error boundaries and fallback UI
- [ ] Optimize for Vercel deployment (bundle size, static generation)
- [ ] Configure proper API base URLs for Vercel environment
- [ ] Test API integration with ECS-hosted backend
- [ ] Verify CORS headers for cross-origin requests

## 6. Quality Assurance

- [ ] Fix TypeScript errors immediately after each change
- [ ] Fix ESLint errors immediately after each change
- [ ] Fix Prettier errors immediately after each change
- [ ] Test responsive design (mobile-first approach)
- [ ] Verify accessibility with keyboard navigation
- [ ] Test language switching functionality
- [ ] Use `get_errors` tool after significant file changes
- [ ] Test cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Validate GraphQL schema compatibility
- [ ] Performance testing (Core Web Vitals, bundle size)
- [ ] Test local development against containerized my-service
- [ ] Verify API connectivity between platforms in development
- [ ] Test environment variable resolution in both platforms

## 7. Testing & Documentation

- [ ] Write unit tests for complex logic
- [ ] Test all component variants in Storybook
- [ ] Update component documentation if needed
- [ ] Test integration between frontend and backend
- [ ] Test error scenarios and edge cases
- [ ] Verify proper handling of loading and empty states
- [ ] Update API documentation if GraphQL schema changed

## 8. Security & Performance Review

- [ ] Review authentication and authorization implementation
- [ ] Validate input sanitization and XSS prevention
- [ ] Check for potential SQL injection vulnerabilities
- [ ] Review data exposure in API responses
- [ ] Analyze bundle size impact and lazy loading opportunities
- [ ] Test with realistic data volumes

## 9. Development Completion

- [ ] Build all affected projects (`pnpm build`)
- [ ] Run full test suite
- [ ] Verify all TypeScript, ESLint, and Prettier checks pass
- [ ] Test feature end-to-end in development environment
- [ ] Document any new environment variables or configuration changes
- [ ] Create feature documentation for team handoff
- [ ] Test Docker build for my-service (ECS compatibility)
- [ ] Verify Vercel build optimization for my-web
- [ ] Validate cross-platform API integration
- [ ] Document platform-specific environment variables

## Key Development Principles

- Use named exports (never default exports)
- Object destructuring for function parameters
- Never use `any` type - always specific types
- Clean up code and files when finished
- Mobile-first responsive design
- Header-based language detection (no language query params)
- Security-first mindset in all development decisions
- Performance considerations at every step
- Accessibility as a requirement, not an afterthought
- Use `pnpm` as package manager across all projects

## Architecture Decision Documentation

- Document significant technical decisions and trade-offs
- Consider long-term maintainability and technical debt
- Evaluate impact on existing system architecture
- Plan for scalability and future feature development

## Pre-Handoff Checklist

- [ ] Feature works as expected in all supported browsers
- [ ] No console errors or warnings in development
- [ ] All automated tests pass
- [ ] Code review preparation complete (clean commits, clear description)
- [ ] Feature ready for QA/staging environment testing
- [ ] Cross-platform deployment considerations documented
- [ ] Environment-specific configurations validated

## Critical Standards Compliance

- **mint-ui**: Use standardized color utilities from `component-colors.ts`, never hardcode colors
- **my-service**: Implement header-based language detection, not query parameters
- **my-web**: Follow admin console standards (full-width forms, card-based organization)
- **Cross-platform**: Ensure proper CORS and API integration between ECS and Vercel deployments
- **Accessibility**: Maintain WCAG 2.1 AA compliance across all user interfaces
- **Performance**: Optimize for both ECS containerized backend and Vercel edge deployment

Remember: This workflow ends when development is complete and ready for code review, QA testing, and deployment pipeline handoff.
