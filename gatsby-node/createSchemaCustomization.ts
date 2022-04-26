import { CreateSchemaCustomizationArgs } from 'gatsby';
import { createClubSchema, createDataSchema, createPostSchema, createYearSchema } from './schema';

export default async function createSchemaCustomization(args: CreateSchemaCustomizationArgs) {
  await createClubSchema(args);
  await createDataSchema(args);
  await createPostSchema(args);
  await createYearSchema(args);
}
