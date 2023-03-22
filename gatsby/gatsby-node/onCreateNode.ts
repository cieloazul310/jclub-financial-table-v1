import * as path from 'path';
import type { CreateNodeArgs, Node } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import type { Mdx } from '../../types';

function isMdx(node: Node & Record<string, unknown>): node is Mdx<'node'> {
  return node.internal.type === `Mdx`;
}

/**
 * onCreateNode で何をするか
 *
 * 1. Mdx ノードから MdxPost ノードを作成
 * 2. docs のために Mdx ノードに fields.slug を追加
 */
export default async function onCreateNode({
  node,
  actions: { createNode, createParentChildLink, createNodeField },
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) {
  const parentFileNode = getNode(node.parent ?? '');
  const source = parentFileNode?.sourceInstanceName;

  if (isMdx(node) && source === 'docs') {
    const value = createFilePath({ node, getNode });
    const slug = path.join('/docs', value);
    createNodeField({ node, name: 'slug', value: slug });
  }

  if (isMdx(node) && source !== 'docs') {
    const value = createFilePath({ node, getNode });
    const slug = path.join('/posts', value);

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`);
    const mdxPostNode = getNode(mdxPostId);

    const fieldData: Record<string, unknown> = {
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      lastmod: node.frontmatter.lastmod ?? node.frontmatter.date,
      slug,
      club: node.frontmatter.club ?? null,
      draft: node.frontmatter.draft ?? true,
    };

    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`,
        contentFilePath: node.internal.contentFilePath,
      },
    });

    if (mdxPostNode) {
      createParentChildLink({ parent: node, child: mdxPostNode });
    }
  }
}
