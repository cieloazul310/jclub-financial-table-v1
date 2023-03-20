import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItemLink, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import type { MdxPostListFragment } from '../../types';

type PostListProps = {
  posts: MdxPostListFragment[];
  title?: string;
  more?: {
    href: string;
    title?: string;
  };
};

function PostList({ posts, title, more }: PostListProps) {
  return (
    <>
      {title ? (
        <Typography variant="subtitle1" component="h3" gutterBottom>
          {title}
        </Typography>
      ) : null}
      <List>
        {posts.map((node, index) => (
          <ListItemLink
            key={node.slug}
            href={node.slug}
            primaryText={node.title}
            secondaryText={node.date}
            divider={index !== posts.length - 1}
            disableGutters
          />
        ))}
      </List>
      {more ? (
        <PanelLink href={more.href} disableMargin>
          {more.title}
        </PanelLink>
      ) : null}
    </>
  );
}

PostList.defaultProps = {
  title: undefined,
  more: undefined,
};

export default PostList;
