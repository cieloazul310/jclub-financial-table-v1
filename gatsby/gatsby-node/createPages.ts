import * as path from 'path';
import type { Node, CreatePagesArgs } from 'gatsby';
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
  docs: {
    group: {
      fieldValue: string;
      nodes: {
        fields: {
          slug: string;
        };
        internal: Pick<Node['internal'], 'contentFilePath'>;
      }[];
    }[];
  };
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
 * 7. 用語解説のページを作成
 */
export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const isProduction = process.env.NODE_ENV === 'production';

  const result = await graphql<GraphQLResult>(
    `
      query CreatePages($draft: Boolean, $limit: Int) {
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
        allMdxPost(limit: $limit, filter: { draft: { ne: $draft } }, sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }]) {
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
        docs: allMdx(sort: { frontmatter: { order: ASC } }, filter: { fields: { slug: { regex: "/docs/" } } }) {
          group(field: { frontmatter: { group: SELECT } }) {
            fieldValue
            nodes {
              fields {
                slug
              }
              frontmatter {
                title
              }
              internal {
                contentFilePath
              }
            }
          }
        }
      }
    `,
    {
      draft: isProduction ? true : null,
      limit: isProduction ? 9999 : 20,
    }
  );
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no data');
  const { allClub, allYear, allMdxPost, allMdxPostByYears, docs } = result.data;

  const postsPerPage = 20;

  // 1. クラブごとの経営情報一覧ページを作成
  const clubTemplate = path.resolve(`./src/templates/club/index.tsx`);
  allClub.nodes.forEach((node, index) => {
    const left = index !== 0 ? allClub.nodes[index - 1] : null;
    const right = index !== allClub.nodes.length - 1 ? allClub.nodes[index + 1] : null;

    createPage({
      path: node.href,
      component: clubTemplate,
      context: {
        left: left?.slug ?? null,
        right: right?.slug ?? null,
        slug: node.slug,
        draft: isProduction ? true : null,
      },
    });
  });

  // 2. 年度別の経営情報一覧ページを作成
  const yearTemplate = path.resolve(`./src/templates/year/index.tsx`);
  allYear.nodes.forEach((node, index) => {
    const left = index !== 0 ? allYear.nodes[index - 1] : null;
    const right = index !== allYear.nodes.length - 1 ? allYear.nodes[index + 1] : null;

    createPage({
      path: node.href,
      component: yearTemplate,
      context: {
        left: left?.year ?? null,
        right: right?.year ?? null,
        year: node.year,
      },
    });
  });

  // 3. 記事ごとのページを作成
  const mdxPostTempalte = path.resolve('./src/templates/post/index.tsx');
  // const mdxPostTempalte = path.resolve('./src/templates/post/light.tsx');
  allMdxPost.nodes.forEach((node, index, arr) => {
    const newer = index !== 0 ? arr[index - 1] : null;
    const older = index !== arr.length - 1 ? arr[index + 1] : null;
    const specifiedClub = node.club && node.club.length === 1 ? node.club[0].slug : null;

    createPage({
      path: node.slug,
      component: `${mdxPostTempalte}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        older: older?.slug ?? null,
        newer: newer?.slug ?? null,
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
    const pagePath = i === 0 ? allPostsBasePath : path.join(allPostsBasePath, (i + 1).toString());
    createPage({
      path: pagePath,
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
      const basePath = path.join('/club', node.slug, 'posts');
      const numPages = Math.ceil(totalCount / postsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        const pagePath = i === 0 ? basePath : path.join(basePath, (i + 1).toString());

        createPage({
          path: pagePath,
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
    const older = index === 0 ? null : allMdxPostByYears[index - 1];
    const newer = index === allMdxPostByYears.length - 1 ? null : allMdxPostByYears[index + 1];

    createPage({
      path: basePath,
      component: path.resolve('./src/templates/postsByYear.tsx'),
      context: {
        older,
        newer,
        year,
        gte,
        lt,
        totalCount,
        basePath,
        draft: isProduction ? true : null,
      },
    });
  });

  // 7. 用語解説のページを作成
  const docsTemplate = path.resolve('./src/templates/docs/index.tsx');
  docs.group.forEach((group) => {
    group.nodes.forEach(({ fields, internal }, index) => {
      const { slug } = fields;
      const next = index === group.nodes.length - 1 ? null : group.nodes[index + 1].fields.slug;
      const { contentFilePath } = internal;
      createPage({
        path: slug,
        component: `${docsTemplate}?__contentFilePath=${contentFilePath}`,
        context: {
          slug,
          next,
        },
      });
    });
  });
}
