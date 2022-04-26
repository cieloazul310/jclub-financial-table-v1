import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { SourceNodesArgs } from 'gatsby';
import { Club, Year } from '../types';

export default async function souceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode } = actions;

  const clubs: Omit<Club, 'href'>[] = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf-8'));

  clubs.forEach((data, index) => {
    const href = `/club/${data.slug}/`;
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

  const years: Omit<Year, 'href'>[] = yaml.parse(fs.readFileSync(path.resolve('./data/frames/years.yml'), 'utf-8'));

  years.forEach((data) => {
    const href = `/year/${data.year}/`;
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
