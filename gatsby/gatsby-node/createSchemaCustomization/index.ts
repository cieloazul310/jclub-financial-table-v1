import type { CreateSchemaCustomizationArgs } from 'gatsby';
import createClubSchema from './club';
import createDataSchema from './data';
import createPostSchema from './post';
import createYearSchema from './year';

/**
 * createSchemaCustomization で何をするか
 *
 * 1. Club のノードを拡張
 * 2. Year のノードを拡張
 * 3. Data のノードを拡張
 * 4. MdxPost のノードを拡張
 */
export default async function createSchemaCustomization(args: CreateSchemaCustomizationArgs) {
  // 1. Club のノードを拡張
  await createClubSchema(args);

  // 2. Year のノードを拡張
  await createYearSchema(args);

  // 3. Data のノードを拡張
  await createDataSchema(args);

  // 4. MdxPost のノードを拡張
  await createPostSchema(args);
}
