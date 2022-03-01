import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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
import Layout from '../layout';
import { j1color, j2color, j3color, othersColor } from '../utils/categoryColors';
import { DatumBrowser, ClubBrowser, YearBrowser } from '../../types';

type CategoryTableCellProps = {
  datum: DatumBrowser | null;
  currentKey: keyof DatumBrowser;
};

function CategoryTableCell({ datum, currentKey }: CategoryTableCellProps) {
  return (
    <TableCell
      align="right"
      sx={{
        bgcolor: ({ palette }) => {
          if (!datum) return undefined;
          const { category } = datum;
          if (category === 'J1') return alpha(j1color[600], palette.action.selectedOpacity);
          if (category === 'J2') return alpha(j2color[600], palette.action.selectedOpacity);
          if (category === 'J3') return alpha(j3color[600], palette.action.selectedOpacity);
          return alpha(othersColor[600], palette.action.selectedOpacity);
        },
      }}
    >
      {datum ? datum[currentKey] : '-'}
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
  const yearsRange = [allYear.edges[0].node.year, allYear.edges[allYear.edges.length - 1].node.year];
  const [currentKey, setCurrentKey] = React.useState<keyof DatumBrowser>('revenue');

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

  return (
    <Layout title="項目別表示">
      <Box>hoge</Box>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>クラブ</TableCell>
                {allYear.edges.map(({ node }) => (
                  <TableCell key={node.year.toString()} component="th" scope="column">
                    {node.year}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allClubValues.map(({ slug, short_name, ...club }) => (
                <TableRow key={slug}>
                  <TableCell component="th" scope="row">
                    {short_name}
                  </TableCell>
                  {club.data.map((datum, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <CategoryTableCell key={`${slug}-${index}`} datum={datum} currentKey={currentKey} />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}
export default SeriesPage;
/*
import { graphql, PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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
import { makeStyles, createStyles } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import Layout from '../layout';
import { AppLink } from '../components/AppLink';
import { ContentBasisLarge, ContentBasis } from '../components/Basis';
import { AdInArticle } from '../components/Ads';
import { plFields, bsFields, revenueFields, expenseFields, attdFields, Fields } from '../components/download/fields';
import { useAllClubs, useAllYears, useDictionary } from '../utils/graphql-hooks';
import { SeriesQuery } from '../../graphql-types';

const allFields = [...plFields, ...bsFields, ...revenueFields, ...expenseFields, ...attdFields];

const useStyles = makeStyles((theme) =>
  createStyles({
    selector: {
      textAlign: 'center',
    },
    container: {
      flexGrow: 1,
      maxHeight: '75vh',
    },
    table: {
      minWidth: 1000,
      scrollSnapType: 'both mandatory',
    },
    theadLabel: {
      zIndex: 3,
      background: theme.palette.background.default,
    },
    tbodyLabel: {
      fontWeight: 'bold',
      zIndex: 2,
      position: 'sticky',
      left: 0,
      background: theme.palette.background.default,
      minWidth: '8em',
    },
    j1: {
      backgroundColor: theme.palette.type === 'light' ? '#fee' : '#633',
    },
    j2: {
      backgroundColor: theme.palette.type === 'light' ? '#efe' : '#363',
    },
    j3: {
      backgroundColor: theme.palette.type === 'light' ? '#eef' : '#336',
    },
  })
);

function createNullField(
  edges: SeriesQuery['allDataset']['group'][number]['edges'][number][]
): (allYears: ReturnType<typeof useAllYears>) => (SeriesQuery['allDataset']['group'][number]['edges'][number] | null)[] {
  return (allYears: ReturnType<typeof useAllYears>) => {
    if (allYears.length === edges.length) return edges;
    const first = allYears.map(({ year }) => year).indexOf(edges[0].node.year ?? 0);
    return [
      ...Array.from({ length: first }, () => null),
      ...edges,
      ...Array.from({ length: allYears.length - edges.length - first }, () => null),
    ];
    // return [...Array.from({ length: len - arr.length }, () => null), ...arr];
  };
}

function isFields(input: string): input is Fields {
  return allFields.includes(input as Fields);
}

function Series({ data }: PageProps<SeriesQuery>): JSX.Element {
  const classes = useStyles();
  const allClubs = useAllClubs();
  const allYears = useAllYears();
  const dict = useDictionary();
  const slugs = allClubs.map(({ node }) => node.slug ?? '');

  const [field, setField] = React.useState<Fields>('revenue');
  const [clubFilter, setClubFilter] = React.useState(slugs);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortYear, setSortYear] = React.useState(allYears.length - 1);
  const [sortAsc, setSortAsc] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const onLabelClicked = (index: number) => () => {
    if (index === sortYear) {
      setSortAsc(!sortAsc);
    } else {
      setSortYear(index);
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
  const onCopy = () => {
    const table = document.querySelector('#series-table');
    if (table) {
      const range = document.createRange();
      const selection = document.getSelection();

      selection?.removeAllRanges();

      try {
        range.selectNodeContents(table);
        selection?.addRange(range);
      } catch (e) {
        range.selectNode(table);
        selection?.addRange(range);
      }

      document.execCommand('copy');
      selection?.removeAllRanges();
      setOpen(true);
    }
  };
  const getFieldValue = React.useCallback(
    (edge: SeriesQuery['allDataset']['group'][number]['edges'][number] | null) => {
      if (!edge) return null;

      const { node } = edge;
      if (field === 'league_average') {
        return Math.round((node.league_attd ?? 0) / (node.league_games ?? 1));
      }
      if (field === 'unit_price') {
        return Math.round(((node.ticket ?? 0) * 1000000) / (node.all_attd ?? 1));
      }
      return node[field] as number;
    },
    [field]
  );

  const items = React.useMemo(() => {
    const clubs = data.allDataset.group.map(({ edges, fieldValue }) => {
      const club = allClubs[allClubs.map(({ node }) => node.slug).indexOf(fieldValue)];
      return {
        fieldValue,
        short_name: club.node?.short_name,
        edges: createNullField(edges)(allYears),
      };
    });
    return [...clubs]
      .filter((item) => clubFilter.includes(item.fieldValue ?? ''))
      .sort(
        (a, b) =>
          (sortAsc ? 1 : -1) *
          (sortYear !== -1
            ? (getFieldValue(a.edges[sortYear]) ?? -Infinity) - (getFieldValue(b.edges[sortYear]) ?? -Infinity)
            : slugs.indexOf(b.fieldValue ?? '') - slugs.indexOf(a.fieldValue ?? ''))
      );
  }, [data, allClubs, sortAsc, sortYear, getFieldValue, allYears, clubFilter, slugs]);

  return (
    <Layout title="項目別表示">
      <div className={classes.selector}>
        <ContentBasis>
          <NativeSelect value={field} onChange={onFieldChange}>
            {allFields.map((fieldName) => (
              <option value={fieldName} key={fieldName}>
                {(() => {
                  if (fieldName === 'league_average') return 'リーグ戦平均入場者数';
                  if (fieldName === 'unit_price') return '客単価';
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
            {allClubs.map(({ node }) => (
              <MenuItem key={node.slug} onClick={onMenuItemClick(node.slug ?? '')}>
                <ListItemIcon>{clubFilter.includes(node.slug ?? '') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
                {node.short_name}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="表をクリップボードにコピー">
            <IconButton onClick={onCopy}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
        </ContentBasis>
      </div>
      <Typography component="div" variant="body2" align="right">
        単位:{' '}
        {(() => {
          if (field === 'unit_price') return '円';
          if (['all_attd', 'league_average', 'league_attd', 'leaguecup_attd', 'po_attd', 'acl_attd', 'second_attd'].includes(field))
            return '人';
          if (['all_games', 'league_games', 'leaguecup_games', 'po_games', 'acl_games', 'second_games'].includes(field)) return '試合';
          return '百万円';
        })()}
      </Typography>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} size="small" stickyHeader id="series-table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.theadLabel}>
                <TableSortLabel
                  active={sortYear === -1}
                  direction={sortYear === -1 && sortAsc ? 'asc' : 'desc'}
                  onClick={onLabelClicked(-1)}
                >
                  クラブ
                </TableSortLabel>
              </TableCell>
              {allYears.map(({ year }, index) => (
                <TableCell key={year} align="center" padding="none" sortDirection={sortYear !== index && sortAsc ? 'asc' : 'desc'}>
                  <TableSortLabel
                    active={sortYear === index}
                    direction={sortYear === index && sortAsc ? 'asc' : 'desc'}
                    onClick={onLabelClicked(index)}
                  >
                    {year}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({ fieldValue, short_name, edges }) => (
              <TableRow key={fieldValue}>
                <TableCell className={classes.tbodyLabel} align="right" component="th" scope="row">
                  <AppLink color="inherit" to={`/club/${fieldValue}/`}>
                    {short_name}
                  </AppLink>
                </TableCell>
                {edges.map((edge, index) => (
                  <TableCell
                    key={index.toString()}
                    align={edge ? 'right' : 'center'}
                    className={(() => {
                      if (edge?.node?.category === 'J1') return classes.j1;
                      if (edge?.node?.category === 'J2') return classes.j2;
                      if (edge?.node?.category === 'J3') return classes.j3;
                      return undefined;
                    })()}
                  >
                    {getFieldValue(edge) ?? '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ContentBasisLarge>
        <AdInArticle />
      </ContentBasisLarge>
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

export default Series;
*/

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
