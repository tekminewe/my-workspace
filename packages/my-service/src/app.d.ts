import '@nestjs/graphql';

declare module '@nestjs/graphql' {
  interface GqlExecutionContext {
    req: Request;
  }
}
