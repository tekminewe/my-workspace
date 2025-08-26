Your goal is to build a NextJS page based on the instruction or design provided.

- We are using NextJS 15 and React 19.
- Always use the UI components from this UI library: `@tekminewe/mint-ui/*`. If you need to use a component that is not in the library, you to create a new component, please create it in the `src/components` folder. Do not create any other folder.
- Use Tailwind CSS v3 for styling.
- Use Apollo Client for data fetching. It uses graphql-codegen to generate the types. You can use the command `pnpm gen:graphql` to generate the types.
- All text must be localized. Use dictionaries in the `src/dictionaries` folder. Do not use hardcoded text.
- Do not create other page then the one specified in the instruction.
- When building a form, use `Controlled*` components from `@tekminewe/mint-ui/*`. Do not use uncontrolled components.
