import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import GetAppIcon from '@mui/icons-material/GetApp';
import { csvFormat } from 'd3';
import { H4 } from '@cieloazul310/gatsby-theme-aoi';
import { useAllClubs, useAllYears } from '../../utils/graphql-hooks';
import type { DownloadDatum } from '../../../types';

type PreviewProps = {
  dataset: DownloadDatum[];
};

function Preview({ dataset }: PreviewProps) {
  const allClubs = useAllClubs();
  const allYears = useAllYears();
  const slugs = allClubs.map(({ node }) => node.slug);
  const [dataFormat, setDataFormat] = React.useState('json');
  const [grouping, setGrouping] = React.useState('none');
  const handleChangeDataFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFormat(event.target.name);
  };
  const handleChangeGrouping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrouping(event.target.name);
  };
  const output = React.useMemo(() => {
    if (dataFormat === 'csv') {
      const csv = grouping === 'club' ? [...dataset].sort((a, b) => slugs.indexOf(a.id) - slugs.indexOf(b.id)) : dataset;

      return csvFormat(csv);
    }
    const json = (() => {
      if (grouping === 'year')
        return allYears
          .map(({ node }) => ({
            year: node.year,
            items: dataset.filter((datum) => datum['年'] === node.year),
          }))
          .filter(({ items }) => items.length > 0);
      if (grouping === 'club')
        return allClubs
          .map(({ node }) => {
            const { id, href, slug, ...club } = node;
            return {
              id: slug,
              ...club,
              items: dataset.filter((datum) => datum.id === slug),
            };
          })
          .filter(({ items }) => items.length > 0);
      return dataset;
    })();

    return JSON.stringify(json, null, 2);
  }, [dataset, dataFormat, grouping, slugs, allClubs, allYears]);

  const href = React.useMemo(() => {
    if (typeof window !== 'object') return '#';
    const blob = new Blob([output], { type: dataFormat === 'csv' ? 'text/csv' : 'application/json' });
    return URL.createObjectURL(blob);
  }, [dataFormat, output]);

  return (
    <Box
      sx={{
        maxHeight: 'calc(100vh - 112px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box py={2}>
        <H4>プレビュー</H4>
        <FormGroup row>
          <FormControlLabel
            control={<Radio checked={dataFormat === 'json'} name="json" onChange={handleChangeDataFormat} color="secondary" />}
            label="JSON"
          />
          <FormControlLabel
            control={<Radio checked={dataFormat === 'csv'} name="csv" onChange={handleChangeDataFormat} color="secondary" />}
            label="CSV"
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={<Radio checked={grouping === 'none'} name="none" onChange={handleChangeGrouping} color="secondary" />}
            label="グループ化しない"
          />
          <FormControlLabel
            control={<Radio checked={grouping === 'club'} name="club" onChange={handleChangeGrouping} color="secondary" />}
            label="クラブ別"
          />
          <FormControlLabel
            control={<Radio checked={grouping === 'year'} name="year" onChange={handleChangeGrouping} color="secondary" />}
            label="年別"
          />
        </FormGroup>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', py: 2 }}>
        <TextareaAutosize
          style={{
            width: '100%',
          }}
          maxRows={20}
          spellCheck={false}
          readOnly
          value={output}
        />
      </Box>
      <Box py={1}>
        <Button variant="contained" color="primary" startIcon={<GetAppIcon />} href={href} download component="a">
          ダウンロード
        </Button>
      </Box>
    </Box>
  );
}

export default Preview;
