import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import type { SourceNodesArgs } from 'gatsby';
import type { Club, Year } from '../../types';

/**
 * sourceNodes で何をするか
 *
 * 1. クラブ一覧のデータを読み込み Club ノードを作成
 * 2. 年度一覧のデータを読み込み Year ノードを作成
 */
export default async function sourceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode } = actions;

  // 1. クラブ一覧のデータを読み込み Club ノードを作成
  const clubs: Club<'bare'>[] = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf-8'));

  clubs.forEach((data, index) => {
    const href = path.join('/club', data.slug, '/');
    const nodeId = createNodeId(`club-${data.slug}`);
    const nodeContent = JSON.stringify({ ...data, href, index });
    const nodeMeta = {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Club`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest({ ...data, href }),
      },
    };

    const node = { ...data, href, index, ...nodeMeta };
    createNode(node);
  });

  // 2. 年度一覧のデータを読み込み Year ノードを作成
  const years: Year<'bare'>[] = yaml.parse(fs.readFileSync(path.resolve('./data/frames/years.yml'), 'utf-8'));

  years.forEach((data) => {
    const href = path.join('/year', data.year.toString(), '/');
    const nodeId = createNodeId(`year-${data.year}`);
    const nodeContent = JSON.stringify({ ...data, href });
    const nodeMeta = {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Year`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest({ ...data, href }),
      },
    };

    const node = { ...data, href, ...nodeMeta };
    createNode(node);
  });
}
