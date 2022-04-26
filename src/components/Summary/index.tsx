import * as React from 'react';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import ClubInfo from './ClubInfo';
import YearInfo from './YearInfo';
import PostList from '../PostList';
import useIsClub from '../../utils/useIsClub';

import { Mode, DatumBrowser, ClubBrowser, YearBrowser, MdxPost } from '../../../types';

type SummarySectionProps<T extends Mode> = {
  mode: T;
  edges: {
    node: DatumBrowser;
  }[];
  item: T extends 'club' ? Omit<ClubBrowser, 'data' | 'posts'> : Omit<YearBrowser, 'data'>;
  prevYear: T extends 'year' ? Pick<YearBrowser, 'stats'> | null : null;
  posts: T extends 'club' ? { node: Pick<MdxPost, 'slug' | 'title' | 'date'> }[] : null;
};

function SummarySection<T extends Mode>({ mode, edges, item, prevYear, posts }: SummarySectionProps<T>) {
  const isClub = useIsClub<Omit<ClubBrowser, 'data' | 'posts'>>(mode);
  return (
    <section>
      <Section>
        <Article maxWidth="md">
          {isClub(item) ? <ClubInfo club={item} edges={edges} /> : <YearInfo year={item} prevYear={prevYear} />}
        </Article>
      </Section>
      {isClub(item) && posts && posts.length ? (
        <>
          <SectionDivider />
          <Section>
            <Article maxWidth="md">
              <PostList posts={posts} title="最新の記事" more={{ to: `${item.href}posts/`, title: `${item.name}の記事一覧` }} />
              {/*
              <Typography variant="h6" component="h3" gutterBottom>
                最新の記事
              </Typography>
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
              <PanelLink to={`${item.href}posts/`} disableMargin>
                {item.name}の記事一覧
              </PanelLink>
              */}
            </Article>
          </Section>
        </>
      ) : null}
    </section>
  );
}

export default SummarySection;
