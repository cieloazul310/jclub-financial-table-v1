import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { CreateResolversArgs } from 'gatsby';
import { Dict, MdxPost, MdxPostByYear } from '../types';
import { GatsbyGraphQLContext } from './graphql';

function mdxPostToYears(posts: MdxPost[]): MdxPostByYear[] {
  const years = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce<MdxPostByYear[]>((accum, { date }) => {
      const year = new Date(date).getFullYear();
      const yearId = `${year}`;
      const indexInAccum = accum.map((d) => d.id).indexOf(yearId);
      if (indexInAccum < 0) {
        return [
          ...accum,
          {
            year: year.toString(),
            id: yearId,
            basePath: `/posts/${year}/`,
            gte: `${year}-01`,
            lt: `${year + 1}-01`,
            totalCount: posts.filter((post) => new Date(post.date).getFullYear() === year).length,
          },
        ];
      }
      return accum;
    }, []);
  return years;
}

export default async function gatsbyCreateResolvers({ createResolvers }: CreateResolversArgs) {
  const isProduction = process.env.NODE_ENV === 'production';

  const resolvers = {
    Query: {
      dictionary: {
        type: `Dict!`,
        resolve: () => {
          const dict: Dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
          return dict;
        },
      },
      allMdxPostByYears: {
        type: `[MdxPostByYear]`,
        resolve: async (source: unknown, args: unknown, context: GatsbyGraphQLContext) => {
          const { entries } = await context.nodeModel.findAll<MdxPost>({
            type: `MdxPost`,
            query: {
              filter: { draft: { ne: isProduction ? true : null } },
            },
          });
          return mdxPostToYears(Array.from(entries));
        },
      },
    },
  };
  createResolvers(resolvers);
}
