import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Club, MdxPost, Year, MdxPostByYear } from '../types';

type GraphQLResult = {
  allClub: {
    edges: {
      node: Pick<Club, 'slug' | 'href'> & {
        posts: { totalCount: number };
      };
    }[];
  };
  allYear: {
    edges: {
      node: Pick<Year, 'year' | 'href'>;
    }[];
  };
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'slug' | 'draft'> & { club: Pick<Club, 'slug'> | null };
    }[];
  };
  allMdxPostByYears: MdxPostByYear[];
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const isProduction = process.env.NODE_ENV === 'production';

  const result = await graphql<GraphQLResult>(
    `
      query CreatePages($draft: Boolean) {
        allClub(sort: { fields: index, order: ASC }) {
          edges {
            node {
              slug
              href
              posts {
                totalCount
              }
            }
          }
        }
        allYear(sort: { fields: year, order: ASC }) {
          edges {
            node {
              year
              href
            }
          }
        }
        allMdxPost(filter: { draft: { ne: $draft } }, sort: { fields: [date, lastmod, slug], order: [ASC, ASC, ASC] }) {
          edges {
            node {
              slug
              draft
              club {
                slug
              }
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
  const { allClub, allYear, allMdxPost, allMdxPostByYears } = result.data;

  const postsPerPage = 20;

  // クラブ毎の経営情報ページを作成
  allClub.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allClub.edges[index - 1] : null;
    const next = index !== allClub.edges.length - 1 ? allClub.edges[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/club.tsx`),
      context: {
        previous: previous?.node.slug ?? null,
        next: next?.node.slug ?? null,
        slug: node.slug,
        draft: isProduction ? true : null,
      },
    });
  });

  // 年度毎の経営情報ページを作成
  allYear.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allYear.edges[index - 1] : null;
    const next = index !== allYear.edges.length - 1 ? allYear.edges[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/year.tsx`),
      context: {
        previous: previous?.node.year ?? null,
        next: next?.node.year ?? null,
        year: node.year,
        draft: isProduction ? true : null,
      },
    });
  });

  // 記事のページを作成
  allMdxPost.edges.forEach(({ node }, index, arr) => {
    const previous = index !== 0 ? arr[index - 1] : null;
    const next = index !== arr.length - 1 ? arr[index + 1] : null;

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/post.tsx'),
      context: {
        previous: previous?.node.slug ?? null,
        next: next?.node.slug ?? null,
        slug: node.slug,
        club: node.club?.slug ?? null,
        draft: isProduction ? true : null,
      },
    });
  });

  // 記事一覧ページを作成
  const numAllPostsPages = Math.ceil(allMdxPost.edges.length / postsPerPage);
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
        totalCount: allMdxPost.edges.length,
        draft: isProduction ? true : null,
      },
    });
  });

  // クラブ毎の記事一覧ページを作成
  allClub.edges
    .filter(({ node }) => node.posts.totalCount)
    .forEach(({ node }) => {
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

  // 年別の記事一覧ページを作成
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
}
