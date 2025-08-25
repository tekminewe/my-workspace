import type { CodegenConfig } from "@graphql-codegen/cli";

// Use local schema definition since we don't have direct access to the API during development
const config: CodegenConfig = {
  schema: `http://localhost:3020/graphql`,
  documents: ["src/**/*.graphql"],
  generates: {
    "src/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true,
      },
    },
  },
};
export default config;
