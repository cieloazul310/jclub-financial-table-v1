import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import type { CreateResolversArgs } from 'gatsby';
import type { Dict, MdxPost, MdxPostByYear } from '../../types';
import type { GatsbyGraphQLContext } from './graphql';

function mdxPostToYears(posts: MdxPost<'node'>[]): MdxPostByYear[] {
  const years = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce<MdxPostByYear[]>((accum, { date }) => {
      const year = new Date(date).getFullYear();
      const yearId = `${year}`;
      const indexInAccum = accum.map((d) => d.id).indexOf(yearId);
      const basePath = path.join('/posts', year.toString());
      if (indexInAccum < 0) {
        return [
          ...accum,
          {
            year: year.toString(),
            id: yearId,
            basePath,
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

/**
 * createResolvers で何をするか
 *
 * 1. 用語集を取得する dictionary クエリを作成
 * 2. 年別の MdxPost を取得する allMdxPostByYears クエリを作成
 */
export default async function gatsbyCreateResolvers({ createResolvers }: CreateResolversArgs) {
  const isProduction = process.env.NODE_ENV === 'production';

  const resolvers = {
    Query: {
      // 1. 用語集を取得する dictionary クエリを作成
      dictionary: {
        type: `JSON!`,
        resolve: () => {
          const dict: Dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
          return dict;
        },
      },
      // 2. 年別の MdxPost を取得する allMdxPostByYears クエリを作成
      allMdxPostByYears: {
        type: `[MdxPostByYear]`,
        resolve: async (source: unknown, args: unknown, context: GatsbyGraphQLContext) => {
          const { entries } = await context.nodeModel.findAll<MdxPost<'node'>>({
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
