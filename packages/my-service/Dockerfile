FROM --platform=linux/amd64 node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache openssl
COPY . .

FROM base AS prod-deps
RUN corepack prepare --activate
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builder
RUN corepack prepare --activate
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run gen:prisma
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/src ./dist
COPY --from=builder /app/node_modules/.pnpm/@zenstackhq+runtime@2.10.2_@prisma+client@5.20.0_prisma@5.20.0_/node_modules/.zenstack ./node_modules/.pnpm/@zenstackhq+runtime@2.10.2_@prisma+client@5.20.0_prisma@5.20.0_/node_modules/.zenstack
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@5.20.0_prisma@5.20.0/node_modules/.prisma ./node_modules/.pnpm/@prisma+client@5.20.0_prisma@5.20.0/node_modules/.prisma
RUN corepack prepare --activate
EXPOSE 3020

CMD [ "pnpm", "start" ]