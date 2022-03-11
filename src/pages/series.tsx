import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import { Section, Article } from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import AttributionDoc from '../components/Article/Attribution';
import { AdInSectionDividerOne } from '../components/Ads';
import { allSortableFields } from '../utils/allFields';
import { j1color, j2color, j3color, othersColor } from '../utils/categoryColors';
import useCopy from '../utils/useCopy';
import { useDictionary } from '../utils/graphql-hooks';
import { DatumBrowser, ClubBrowser, YearBrowser, SortableKeys } from '../../types';

function isFields(input: string): input is SortableKeys {
  return allSortableFields.includes(input as SortableKeys);
}

type CategoryTableCellProps = {
  datum: DatumBrowser | null;
  field: SortableKeys;
};

function CategoryTableCell({ datum, field }: CategoryTableCellProps) {
  return (
    <TableCell
      align="right"
      sx={{
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: ({ palette }) => {
          if (!datum) return undefined;
          const { category } = datum;
          if (category === 'J1') return alpha(j1color[600], palette.action.activatedOpacity);
          if (category === 'J2') return alpha(j2color[600], palette.action.activatedOpacity);
          if (category === 'J3') return alpha(j3color[600], palette.action.activatedOpacity);
          return alpha(othersColor[600], palette.action.activatedOpacity);
        },
        py: 1,
      }}
    >
      {datum ? datum[field] : ''}
    </TableCell>
  );
}

type SeriesPageData = {
  allClub: {
    edges: {
      node: Pick<ClubBrowser, 'short_name' | 'slug' | 'data'>;
    }[];
  };
  allYear: {
    edges: {
      node: Pick<YearBrowser, 'year'>;
    }[];
  };
};

function SeriesPage({ data }: PageProps<SeriesPageData>) {
  const { allClub, allYear } = data;
  const dict = useDictionary();
  const slugs = allClub.edges.map(({ node }) => node.slug);
  const yearsRange = [allYear.edges[0].node.year, allYear.edges[allYear.edges.length - 1].node.year];
  const [field, setField] = React.useState<SortableKeys>('revenue');
  const [sortField, setSortField] = React.useState<SortableKeys>('revenue');
  const [clubFilter, setClubFilter] = React.useState(slugs);
  const [sortIndex, setSortIndex] = React.useState(allYear.edges.length - 1);
  const [sortAsc, setSortAsc] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const allClubValues = React.useMemo(() => {
    return allClub.edges.map(({ node }) => {
      if (node.data.length === allYear.edges.length) return node;

      const firstYear = node.data[0].year;
      const lastYear = node.data[node.data.length - 1].year;
      return {
        ...node,
        data: [
          ...Array.from({ length: firstYear - yearsRange[0] }, () => null),
          ...node.data,
          ...Array.from({ length: yearsRange[1] - lastYear }, () => null),
        ],
      };
    });
  }, [allClub]);
  const statedClubs = React.useMemo(() => {
    return allClubValues
      .filter(({ slug }) => clubFilter.includes(slug))
      .sort((a, b) => (sortAsc ? 1 : -1) * ((a.data[sortIndex]?.[sortField] ?? 0) - (b.data[sortIndex]?.[sortField] ?? 0)));
  }, [allClubValues, clubFilter, sortIndex, sortField, sortAsc]);

  const handleClose = () => {
    setOpen(false);
  };
  const onLabelClicked = (index: number) => () => {
    if (field !== sortField) {
      setSortField(field);
    }
    if (index === sortIndex) {
      setSortAsc(!sortAsc);
    } else {
      setSortIndex(index);
      setSortAsc(false);
    }
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const onMenuItemClick = (slug: string) => () => {
    if (clubFilter.includes(slug)) {
      setClubFilter(clubFilter.filter((club) => club !== slug));
    } else {
      setClubFilter([...clubFilter, slug]);
    }
  };
  const setAllFilter = (bool: boolean) => () => {
    if (bool) {
      setClubFilter(slugs);
    } else {
      setClubFilter([]);
    }
  };
  const onFieldChange = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
    if (isFields(event.target.value)) {
      setField(event.target.value);
    }
  };
  const tableId = 'series-table';
  const onCopy = useCopy(tableId, () => {
    setOpen(true);
  });

  return (
    <Layout title="項目別表示">
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'column' },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        }}
      >
        <Container maxWidth="lg" sx={{ flexShrink: 0 }}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent={{ xs: 'flex-start', sm: 'center' }} alignItems="center" py={2}>
              <NativeSelect value={field} onChange={onFieldChange}>
                {allSortableFields.map((fieldName) => (
                  <option value={fieldName} key={fieldName}>
                    {(() => {
                      if (dict && dict[fieldName]) return dict[fieldName];
                      return '';
                    })()}
                  </option>
                ))}
              </NativeSelect>
              <Tooltip title="フィルタ">
                <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={handleMenuClick}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Menu id="filter-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={setAllFilter(true)}>全て選択</MenuItem>
                <MenuItem onClick={setAllFilter(false)}>全て解除</MenuItem>
                {allClub.edges.map(({ node }) => (
                  <MenuItem key={node.slug} onClick={onMenuItemClick(node.slug ?? '')}>
                    <ListItemIcon>{clubFilter.includes(node.slug ?? '') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
                    {node.short_name}
                  </MenuItem>
                ))}
              </Menu>
              <Box display={{ xs: 'none', sm: 'block' }}>
                <Tooltip title="表をクリップボードにコピー">
                  <IconButton onClick={onCopy}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                単位: 百万円
              </Typography>
              <Typography variant="body2" sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                ソート: {`${dict[sortField]}(${allYear.edges[sortIndex].node.year}) ${sortAsc ? '少ない順' : '多い順'}`}
              </Typography>
            </Box>
          </Box>
        </Container>
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            overflowY: 'auto',
            display: 'flex',
            flexGrow: 1,
            pb: 1,
          }}
        >
          <TableContainer sx={{ scrollSnapType: 'both mandatory' }}>
            <Table id={tableId} stickyHeader sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 'caption.fontSize',
                      py: 1,
                      lineHeight: 1.2,
                      zIndex: 3,
                      position: 'sticky',
                      left: 0,
                    }}
                  >
                    クラブ
                  </TableCell>
                  {allYear.edges.map(({ node }, index) => (
                    <TableCell
                      key={node.year.toString()}
                      component="th"
                      align="center"
                      sx={{ fontWeight: 'bold', fontSize: 'caption.fontSize', p: 1, lineHeight: 1.2, zIndex: 2 }}
                      sortDirection={sortIndex !== index && sortAsc ? 'asc' : 'desc'}
                    >
                      <TableSortLabel
                        active={field === sortField && sortIndex === index}
                        direction={sortIndex === index && sortAsc ? 'asc' : 'desc'}
                        onClick={onLabelClicked(index)}
                      >
                        {node.year}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {statedClubs.map(({ slug, short_name, ...club }) => (
                  <TableRow key={slug}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: 'caption.fontSize',
                        py: 1,
                        lineHeight: 1.2,
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        bgcolor: 'background.default',
                        minWidth: '8em',
                      }}
                    >
                      {short_name}
                    </TableCell>
                    {club.data.map((datum, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <CategoryTableCell key={`${slug}-${index}`} datum={datum} field={field} />
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <AdInSectionDividerOne />
      <Section>
        <Article maxWidth="md">
          <AttributionDoc />
        </Article>
      </Section>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="クリップボードにコピーしました"
        autoHideDuration={2500}
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            OK
          </Button>
        }
      />
    </Layout>
  );
}
export default SeriesPage;

export const query = graphql`
  query {
    allClub {
      edges {
        node {
          data {
            ...generalFields
            ...seasonResultFields
            ...plFields
            ...bsFields
            ...revenueFields
            ...expenseFields
            ...attdFields
          }
          short_name
          slug
        }
      }
    }
    allYear(sort: { fields: year, order: ASC }) {
      edges {
        node {
          year
        }
      }
    }
  }
`;
