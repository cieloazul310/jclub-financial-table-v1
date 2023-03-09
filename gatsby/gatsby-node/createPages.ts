import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { Club, MdxPost, Year, MdxPostByYear } from '../../types';

type GraphQLResult = {
  allClub: {
    nodes: (Pick<Club, 'slug' | 'href'> & {
      posts: { totalCount: number };
    })[];
  };
  allYear: {
    nodes: Pick<Year, 'year' | 'href'>[];
  };
  allMdxPost: {
    nodes: (Pick<MdxPost, 'slug' | 'draft'> & {
      club: Pick<Club, 'slug'>[] | null;
      internal: Pick<MdxPost['internal'], 'contentFilePath'>;
    })[];
  };
  allMdxPostByYears: MdxPostByYear[];
};

/**
 * createPages で何をするか
 *
 * 1. クラブごとの経営情報一覧ページを作成
 * 2. 年度別の経営情報一覧ページを作成
 * 3. 記事ごとのページを作成
 * 4. 記事一覧のページを作成
 * 5. クラブごとの記事一覧のページを作成
 * 6. 年別の記事一覧のページを作成
 */
export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const isProduction = process.env.NODE_ENV === 'production';

  const result = await graphql<GraphQLResult>(
    `
      query CreatePages($draft: Boolean) {
        allClub(sort: { index: ASC }) {
          nodes {
            slug
            href
            posts {
              totalCount
            }
          }
        }
        allYear(sort: { year: ASC }) {
          nodes {
            year
            href
          }
        }
        allMdxPost(filter: { draft: { ne: $draft } }, sort: [{ date: ASC }, { lastmod: ASC }, { slug: ASC }]) {
          nodes {
            slug
            draft
            club {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
        allMdxPostByYears {
          basePath
          gte
          id
          lt
          totalCount
          year
        }
      }
    `,
    {
      draft: isProduction ? true : null,
    }
  );
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no data');
  const { allClub, allYear /* allMdxPost, allMdxPostByYears */ } = result.data;

  // const postsPerPage = 20;

  // 1. クラブごとの経営情報一覧ページを作成
  allClub.nodes.forEach((node, index) => {
    const previous = index !== 0 ? allClub.nodes[index - 1] : null;
    const next = index !== allClub.nodes.length - 1 ? allClub.nodes[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/club/index.tsx`),
      context: {
        previous: previous?.slug ?? null,
        next: next?.slug ?? null,
        slug: node.slug,
        draft: isProduction ? true : null,
      },
    });
  });

  // 2. 年度別の経営情報一覧ページを作成
  allYear.nodes.forEach((node, index) => {
    const previous = index !== 0 ? allYear.nodes[index - 1] : null;
    const next = index !== allYear.nodes.length - 1 ? allYear.nodes[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/year/index.tsx`),
      context: {
        previous: previous?.year ?? null,
        next: next?.year ?? null,
        year: node.year,
        draft: isProduction ? true : null,
      },
    });
  });
  /*
  // 3. 記事ごとのページを作成
  allMdxPost.nodes.forEach((node, index, arr) => {
    const previous = index !== 0 ? arr[index - 1] : null;
    const next = index !== arr.length - 1 ? arr[index + 1] : null;
    const specifiedClub = node.club && node.club.length === 1 ? node.club[0].slug : null;

    const mdxPostTempalte = path.resolve('./src/templates/post/index.tsx');
    createPage({
      path: node.slug,
      component: `${mdxPostTempalte}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        previous: previous?.slug ?? null,
        next: next?.slug ?? null,
        slug: node.slug,
        specifiedClub,
        club: node.club?.map(({ slug }) => slug) ?? null,
        draft: isProduction ? true : null,
      },
    });
  });

  // 4. 記事一覧のページを作成
  const numAllPostsPages = Math.ceil(allMdxPost.nodes.length / postsPerPage);
  const allPostsBasePath = '/posts';
  Array.from({ length: numAllPostsPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? allPostsBasePath : `${allPostsBasePath}/${i + 1}`,
      component: path.resolve('./src/templates/all-posts.tsx'),
      context: {
        limit: postsPerPage,
        skip: postsPerPage * i,
        numPages: numAllPostsPages,
        currentPage: i + 1,
        basePath: allPostsBasePath,
        totalCount: allMdxPost.nodes.length,
        draft: isProduction ? true : null,
      },
    });
  });

  // 5. クラブごとの記事一覧のページを作成
  allClub.nodes
    .filter((node) => node.posts.totalCount)
    .forEach((node) => {
      const { totalCount } = node.posts;
      const basePath = `/club/${node.slug}/posts`;
      const numPages = Math.ceil(totalCount / postsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `${basePath}` : `${basePath}/${i + 1}`,
          component: path.resolve('./src/templates/postsByClub.tsx'),
          context: {
            slug: node.slug,
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            basePath,
            totalCount,
            draft: isProduction ? true : null,
          },
        });
      });
    });

  // 6. 年別の記事一覧のページを作成
  allMdxPostByYears.forEach(({ year, basePath, totalCount, lt, gte }, index) => {
    const next = index === 0 ? null : allMdxPostByYears[index - 1];
    const previous = index === allMdxPostByYears.length - 1 ? null : allMdxPostByYears[index + 1];

    createPage({
      path: basePath,
      component: path.resolve('./src/templates/postsByYear.tsx'),
      context: {
        previous,
        next,
        year,
        gte,
        lt,
        totalCount,
        basePath,
        draft: isProduction ? true : null,
      },
    });
  });
  */
}
