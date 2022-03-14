import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import FigureWrapper from './Wrapper';

type CapitalItemProps = {
  label: string;
  ratio: number;
  selected?: boolean;
  last?: boolean;
};

function CapitalItem({ label, ratio, selected = false, last = false }: CapitalItemProps) {
  return (
    <Box
      width={ratio}
      py={1}
      sx={{ borderColor: 'text.secondary', borderRight: !last ? 1 : 0 }}
      bgcolor={selected ? ({ palette }) => alpha(palette.success.dark, palette.action.activatedOpacity) : undefined}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 1 }}>
        <Typography variant="caption">{label}</Typography>
        <Typography variant="caption">{(100 * ratio).toFixed(1)}%</Typography>
      </Stack>
    </Box>
  );
}

CapitalItem.defaultProps = {
  selected: false,
  last: false,
};

function CapitalIncrease() {
  const beforeRatio = 3 / 4;
  return (
    <FigureWrapper caption="増資による株主構成変化の例">
      <Stack direction="column" spacing={2} py={2} width={1}>
        <Stack direction="column" spacing={1} width={1}>
          <Typography variant="body2" gutterBottom>
            増資前 (資本金3000万円)
          </Typography>
          <Box display="flex" width={beforeRatio} sx={{ borderColor: 'text.secondary', border: 1 }}>
            <CapitalItem label="A社" ratio={2 / 5} />
            <CapitalItem label="B社" ratio={3 / 10} />
            <CapitalItem label="C社" ratio={3 / 10} last />
          </Box>
        </Stack>
        <Stack direction="column" spacing={1} width={1}>
          <Typography variant="body2" gutterBottom>
            増資後 (資本金4000万円)
          </Typography>
          <Box display="flex" width={1} sx={{ borderColor: 'divider', border: 1 }}>
            <CapitalItem label="A社" ratio={(beforeRatio * 2) / 5} />
            <CapitalItem label="B社" ratio={(beforeRatio * 3) / 10} />
            <CapitalItem label="C社" ratio={(beforeRatio * 3) / 10} />
            <CapitalItem label="D社" ratio={1 - beforeRatio} last selected />
          </Box>
        </Stack>
      </Stack>
    </FigureWrapper>
  );
}

export default CapitalIncrease;
