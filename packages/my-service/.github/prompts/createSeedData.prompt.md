Your goal is to create a new seed data for the database.

- Refer the model structure in @prisma/client.
- The each entity should be created in a separate file in the src/seed/data/<entity>s directory.
- Create a type in the src/seed/data/<entity>.types.ts to ensure all entity files have the same structure.
- The file name should be the same as the entity name and should be in dash-case.
- All file will be imported in the src/seed/data/<entity>.ts file to do the upsert using Prisma.
- Update src/seed/common.ts file to call the seed function from src/seed/data/<entity>.ts file.
