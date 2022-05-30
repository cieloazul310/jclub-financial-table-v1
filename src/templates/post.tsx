import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import { Jumbotron, Section, SectionDivider, Article, PanelLink, Alert, AppLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem, muiComponents } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import PostList from '../components/PostList';
import shortcodes from '../components/Shortcodes';
import { AdInSectionDividerOne } from '../components/Ads';
import Layout from '../layout';
import { ClubBrowser, MdxPost } from '../../types';

type PostTemplatePageData = {
  mdxPost: Pick<MdxPost, 'body' | 'title' | 'lastmod' | 'date' | 'excerpt' | 'draft'> & {
    lastmodDate: string;
    club: Pick<ClubBrowser, 'short_name' | 'name' | 'href'>[] | null;
  };
  previous: { to: string; title: string } | null;
  next: { to: string; title: string } | null;
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'title' | 'date' | 'slug'>;
    }[];
  };
};
type PostTemplatePageContext = {
  slug: string;
  previous: string | null;
  next: string | null;
  club: string[] | null;
  specifiedClub: string | null;
};

function PostTemplate({ data }: PageProps<PostTemplatePageData, PostTemplatePageContext>) {
  const { mdxPost, previous, next, allMdxPost } = data;
  const { title, body, excerpt, date, lastmod, lastmodDate, club, draft } = mdxPost;
  const daysFromLastmod = React.useMemo(() => {
    const today = new Date();
    return Math.floor((today.valueOf() - new Date(lastmodDate).valueOf()) / (1000 * 60 * 60 * 24));
  }, [lastmodDate]);
  const specifiedClub = club && club.length === 1 ? club[0] : null;

  return (
    <Layout title={title} headerTitle="記事" previous={previous} next={next} description={excerpt}>
      <article>
        <header>
          <Jumbotron maxWidth="md">
            <Typography>{date}</Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
          </Jumbotron>
        </header>
        <SectionDivider />
        <Section>
          <Article maxWidth="md">
            <NoSsr>
              {draft ? <Alert severity="warning">この記事は下書きです。</Alert> : null}
              {daysFromLastmod > 183 ? <Alert severity="warning">この記事は最終更新日から6ヶ月以上経過しています。</Alert> : null}
            </NoSsr>
            <MDXProvider components={{ ...muiComponents, ...shortcodes }}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          </Article>
        </Section>
        <AdInSectionDividerOne />
        <footer>
          <Section>
            <Article maxWidth="md">
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography>日付: {date}</Typography>
              <Typography>最終更新日: {lastmod}</Typography>
              {club ? (
                <Typography>
                  クラブ:{' '}
                  {club.map(({ name, short_name, href }) => (
                    <AppLink key={name} to={`${href}posts/`} mr={1} color="inherit">
                      {short_name}
                    </AppLink>
                  ))}
                </Typography>
              ) : null}
            </Article>
          </Section>
          <SectionDivider />
          {specifiedClub ? (
            <>
              <Section>
                <Article maxWidth="md">
                  <PostList
                    posts={allMdxPost.edges}
                    title={`${specifiedClub.name}の最新の記事`}
                    more={{ to: `${specifiedClub.href}posts/`, title: `${specifiedClub.name}の記事一覧` }}
                  />
                </Article>
              </Section>
              <SectionDivider />
              <Section>
                <Container maxWidth="md" disableGutters>
                  <PanelLink to={specifiedClub.href} disableBorder disableMargin>
                    {specifiedClub.name}の経営情報一覧
                  </PanelLink>
                </Container>
              </Section>
              <SectionDivider />
            </>
          ) : null}
          <Section>
            <PageNavigationContainer>
              <PageNavigationItem to={previous?.to ?? '#'} disabled={!previous}>
                <Typography variant="body2">{previous?.title}</Typography>
              </PageNavigationItem>
              <PageNavigationItem to={next?.to ?? '#'} disabled={!next} next>
                <Typography variant="body2">{next?.title}</Typography>
              </PageNavigationItem>
            </PageNavigationContainer>
          </Section>
          <SectionDivider />
          <Section>
            <Container maxWidth="md" disableGutters>
              <PanelLink to="/posts/" disableBorder disableMargin>
                記事一覧へ
              </PanelLink>
            </Container>
          </Section>
        </footer>
      </article>
    </Layout>
  );
}

export default PostTemplate;

export const query = graphql`
  query Post($slug: String!, $previous: String, $next: String, $specifiedClub: String, $draft: Boolean) {
    mdxPost(slug: { eq: $slug }) {
      date(formatString: "YYYY年MM月DD日")
      title
      lastmod(formatString: "YYYY年MM月DD日")
      lastmodDate: lastmod(formatString: "YYYY-MM-DD")
      body
      draft
      excerpt(truncate: true)
      club {
        short_name
        href
        name
      }
    }
    previous: mdxPost(slug: { eq: $previous }) {
      to: slug
      title
    }
    next: mdxPost(slug: { eq: $next }) {
      to: slug
      title
    }
    allMdxPost(
      filter: { club: { elemMatch: { slug: { eq: $specifiedClub } } }, draft: { ne: $draft } }
      sort: { fields: [date, lastmod, slug], order: [DESC, DESC, DESC] }
      limit: 5
    ) {
      edges {
        node {
          title
          date(formatString: "YYYY年MM月DD日")
          slug
        }
      }
    }
  }
`;
