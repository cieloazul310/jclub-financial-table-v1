import { CreateNodeArgs, Node } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { MdxNode } from '../types';

function isMdxNode(node: Node & Record<string, unknown>): node is MdxNode {
  return node.internal.type === `Mdx`;
}

export default async function onCreateNode({
  node,
  actions: { createNode, createParentChildLink },
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) {
  const parentFileNode = getNode(node.parent ?? '');
  const source = parentFileNode?.sourceInstanceName;

  if (isMdxNode(node) && source !== 'docs') {
    const value = createFilePath({ node, getNode });
    const slug = `/posts${value}`;

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
      },
    });

    if (mdxPostNode) {
      createParentChildLink({ parent: node, child: mdxPostNode });
    }
  }
}
