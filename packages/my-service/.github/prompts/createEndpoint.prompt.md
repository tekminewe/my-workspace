Your goal is to create a new endpoint (query or mutation) for the GraphQL API.

- Create a new module if it doesn't exist. Add the new module to the app.module.ts file.
- Create a new model for the module if it doesn't exist.
- Create a new resolver for the module if it doesn't exist.
  - The name of the resolver should same as the model name.
- Create a new service for the module if it doesn't exist.

- Use Prisma to access the database. Use Zenstack enhanced Prisma client like the example below:

  ```ts
  import { Inject, Injectable } from '@nestjs/common';
  import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
  import { PrismaService } from 'src/prisma/prisma.service';

  @Injectable()
  export class ExampleService {
    constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}
  }
  ```

- Create a new input type for the module if it doesn't exist.
  - Use class-validator to validate the input.
  - Add description to the input fields.
- Create a new argument type for the module if it doesn't exist.
  - Use class-validator to validate the argument.
  - Add description to the argument fields.
- If input, model or argument types are enums, need to register them before using them. The registration will be as below:

```ts
import { registerEnumType } from '@nestjs/graphql';
import { ExampleEnum } from '@prisma/client';

registerEnumType(ExampleEnum, {
  name: 'ExampleEnum',
});
```

- The database model can be found in @prisma/client.
