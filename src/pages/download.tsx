import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPane, Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import ItemFilter from '../components/Download/ItemFilter';
import FieldFilter from '../components/Download/FieldFilter';
import Preview from '../components/Download/Preview';
import AttributionDoc from '../components/Article/Attribution';
import { AdInSectionDividerOne } from '../components/Ads';
import allFields from '../utils/allFields';
import useIsMobile from '../utils/useIsMobile';
import { useDictionary } from '../utils/graphql-hooks';
import { DatumBrowser, ClubBrowser, YearBrowser, Dict, DownloadDatum } from '../../types';

function getCategory(category: string | number | null) {
  return category === 'J1' || category === 'J2' || category === 'J3' ? category : 'others';
}

type DownloadPageData = {
  allData: {
    edges: {
      node: Omit<DatumBrowser, 'previousData'>;
    }[];
  };
  j1: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  j2: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  j3: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  allYear: {
    edges: {
      node: Pick<YearBrowser, 'year'>;
    }[];
  };
};

function DownloadPage({ data }: PageProps<DownloadPageData>) {
  const { allData, j1, j2, j3, allYear } = data;
  const isMobile = useIsMobile();
  const dictionary = useDictionary();
  const allCategories = ['J1', 'J2', 'J3', 'others'];
  const slugs = [...j1.edges, ...j2.edges, ...j3.edges].map(({ node }) => node.slug);
  const years = allYear.edges.map(({ node }) => node.year);

  const [tab, setTab] = React.useState(0);
  const [clubsFilter, setClubsFilter] = React.useState(slugs);
  const [yearsFilter, setYearsFilter] = React.useState([years[years.length - 1]]);
  const [categoriesFilter, setCategoriesFilter] = React.useState(allCategories);
  const [fields, setFields] = React.useState<string[]>(allFields);

  const handleTabChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTab(value);
  };
  React.useEffect(() => {
    if (!isMobile && tab === 2) {
      setTab(0);
    }
  }, [isMobile, tab]);

  const dataset = React.useMemo(() => {
    const selectedFields = allFields.filter((field) => fields.includes(field));
    return allData.edges
      .filter(({ node }) => yearsFilter.includes(node.year))
      .filter(({ node }) => clubsFilter.includes(node.slug))
      .filter(({ node }) => categoriesFilter.includes(node.category))
      .map(({ node }) => {
        const obj: DownloadDatum = {
          クラブ: node.name,
          id: node.slug,
          年: node.year,
          所属: node.category,
        };
        for (let i = 0; i < selectedFields.length; i += 1) {
          const field = selectedFields[i] as keyof Dict;
          const fieldName = dictionary[field];
          obj[fieldName] = node[field] ?? null;
        }
        return obj;
      })
      .sort(
        (a, b) =>
          a['年'] - b['年'] ||
          allCategories.indexOf(getCategory(a['所属'])) - allCategories.indexOf(getCategory(b['所属'])) ||
          slugs.indexOf(a.id) - slugs.indexOf(b.id)
      );
  }, [allData, clubsFilter, yearsFilter, fields]);

  return (
    <Layout title="データダウンロード">
      <Box display="flex" flexGrow={1}>
        <Box display="flex" flexDirection={{ xs: 'column-reverse', sm: 'column' }} flex={1}>
          <Box flexShrink={0}>
            <Tabs value={tab} textColor="secondary" indicatorColor="secondary" onChange={handleTabChange}>
              <Tab label="フィルタ" value={0} />
              <Tab label="項目" value={1} />
              {isMobile ? <Tab label="プレビュー" value={2} /> : null}
            </Tabs>
          </Box>
          <Box flexGrow={1} height={{ xs: 'calc(100vh - 104px)', sm: 'calc(100vh - 112px)' }} overflow="auto">
            <TabPane index={0} currentTab={tab}>
              <ItemFilter
                clubsFilter={clubsFilter}
                yearsFilter={yearsFilter}
                categoriesFilter={categoriesFilter}
                setClubsFilter={setClubsFilter}
                setYearsFilter={setYearsFilter}
                setCategoriesFilter={setCategoriesFilter}
              />
            </TabPane>
            <TabPane index={1} currentTab={tab}>
              <FieldFilter fields={fields} setFields={setFields} />
            </TabPane>
            {isMobile ? (
              <TabPane index={2} currentTab={tab}>
                <Container maxWidth="sm">
                  <Preview dataset={dataset} />
                </Container>
              </TabPane>
            ) : null}
          </Box>
        </Box>
        {!isMobile ? (
          <Box flex={1} maxHeight="calc(100vh - 64px)" overflow="auto">
            <Container maxWidth="sm">
              <Preview dataset={dataset} />
            </Container>
          </Box>
        ) : null}
      </Box>
      <AdInSectionDividerOne />
      <Section>
        <Article maxWidth="md">
          <AttributionDoc />
        </Article>
      </Section>
    </Layout>
  );
}
export default DownloadPage;

export const query = graphql`
  query {
    allData(sort: { fields: [year, slug] }) {
      edges {
        node {
          ...generalFields
          ...seasonResultFields
          ...plFields
          ...bsFields
          ...revenueFields
          ...expenseFields
          ...attdFields
        }
      }
    }
    j1: allClub(filter: { category: { eq: "J1" } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    j2: allClub(filter: { category: { eq: "J2" } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    j3: allClub(filter: { category: { eq: "J3" } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    allYear(sort: { fields: year }) {
      edges {
        node {
          year
        }
      }
    }
  }
`;
