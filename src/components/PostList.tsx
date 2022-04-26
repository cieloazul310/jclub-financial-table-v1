import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ListItemLink, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { MdxPost } from '../../types';

type PostListProps = {
  posts: {
    node: Pick<MdxPost, 'title' | 'date' | 'slug'>;
  }[];
  title?: string;
  more?: {
    to: string;
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
        {posts.map(({ node }, index) => (
          <ListItemLink
            key={node.slug}
            to={node.slug}
            primaryText={node.title}
            secondaryText={node.date}
            divider={index !== posts.length - 1}
          />
        ))}
      </List>
      {more ? (
        <PanelLink to={more.to} disableMargin>
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
