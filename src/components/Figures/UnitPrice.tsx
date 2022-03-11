import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme, alpha } from '@mui/material/styles';
import FigureWrapper from './Wrapper';

type UnitPriceContainerProps = {
  width: number;
  height: number;
  children: React.ReactNode;
  title: string;
};

function UnitPriceContainer({ children, width, height, title }: UnitPriceContainerProps) {
  const { palette } = useTheme();
  return (
    <FigureWrapper caption={title}>
      <Box width={width + 60} display="flex" height={height + 40}>
        <Box display="flex" flexDirection="column" width={40}>
          <Box height={height}>
            <Typography variant="caption">客単価</Typography>
          </Box>
          <Box height={40} display="flex" justifyContent="flex-end">
            <Typography variant="caption">0</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" width={width}>
          <Box height={height} sx={{ borderLeft: 1, borderBottom: 1, borderColor: 'text.secondary' }}>
            <svg width={width} height={height}>
              <defs>
                <marker
                  id="triangle"
                  viewBox="0 0 8 8"
                  refX="10"
                  refY="4"
                  markerUnits="strokeWidth"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill={palette.secondary.main} />
                </marker>
              </defs>
              {children}
            </svg>
          </Box>
          <Box height={40} display="flex" justifyContent="flex-end">
            <Typography variant="caption">入場者数</Typography>
          </Box>
        </Box>
        <Box width={20} />
      </Box>
    </FigureWrapper>
  );
}

export function UnitPrice() {
  const { palette, typography } = useTheme();
  const width = 240;
  const height = 240;
  const x1 = 80;
  const demandOne = (x: number) => height - (-x + 180);
  return (
    <UnitPriceContainer width={width} height={height} title="客単価と入場者数の関係">
      <line x1={20} x2={220} y1={demandOne(20)} y2={demandOne(220)} stroke={palette.primary.main} strokeWidth={2} />
      <line
        x1={0}
        x2={x1}
        y1={demandOne(x1)}
        y2={demandOne(x1)}
        stroke={palette.secondary.main}
        strokeWidth={1}
        markerEnd="url(#triangle)"
      />
      <line x1={x1} x2={x1} y1={demandOne(x1)} y2={height} stroke={palette.secondary.main} strokeWidth={1} markerEnd="url(#triangle)" />
      <rect
        x={0}
        y={demandOne(x1)}
        width={x1}
        height={height - demandOne(x1)}
        fill={alpha(palette.secondary.main, palette.action.selectedOpacity)}
      />
      <text
        x={x1 / 2}
        y={(height + demandOne(x1)) / 2}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={palette.text.primary}
        fontSize={typography.caption.fontSize}
      >
        入場料収入
      </text>
    </UnitPriceContainer>
  );
}

export function UnitPriceTwo() {
  const { palette, typography } = useTheme();
  const width = 240;
  const height = 240;
  const x1 = 80;
  const x2 = 120;
  const demandOne = (x: number) => height - (-x + 180);
  const demandTwo = (x: number) => height - (-x + 220);

  return (
    <UnitPriceContainer width={width} height={height} title="需要曲線のシフトによる入場料収入の増大">
      <g strokeDasharray="4, 2" opacity={0.4}>
        <line x1={20} x2={220} y1={demandOne(20)} y2={demandOne(220)} stroke={palette.primary.main} strokeWidth={2} />
        <line x1={0} x2={x1} y1={demandOne(x1)} y2={demandOne(x1)} stroke={palette.secondary.main} strokeWidth={1} />
        <line x1={x1} x2={x1} y1={demandOne(x1)} y2={height} stroke={palette.secondary.main} strokeWidth={1} />
      </g>
      <g>
        <line x1={20} x2={220} y1={demandTwo(20)} y2={demandTwo(220)} stroke={palette.primary.main} strokeWidth={2} />
        <line
          x1={0}
          x2={x2}
          y1={demandTwo(x2)}
          y2={demandTwo(x2)}
          stroke={palette.secondary.main}
          strokeWidth={1}
          markerEnd="url(#triangle)"
        />
        <line x1={x2} x2={x2} y1={demandTwo(x2)} y2={height} stroke={palette.secondary.main} strokeWidth={1} markerEnd="url(#triangle)" />
        <rect
          x={0}
          y={demandTwo(x2)}
          width={x2}
          height={height - demandTwo(x2)}
          fill={alpha(palette.secondary.main, palette.action.selectedOpacity)}
        />
        <text
          x={x2 / 2}
          y={(height + demandTwo(x2)) / 2}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={palette.text.primary}
          fontSize={typography.caption.fontSize}
        >
          入場料収入
        </text>
      </g>
    </UnitPriceContainer>
  );
}
