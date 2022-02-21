import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha, Theme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CardItem from './CardItem';
import useIsMobile from '../../utils/useIsMobile';
import useElementSize from '../../utils/useElementSize';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { DatumBrowser, Tab, Mode } from '../../../types';

function useRange(edges: { node: DatumBrowser }[]) {
  return {
    range: edges.map(({ node }) => node.year),
    totalCount: edges.length,
  };
}

function CarouselButton({
  next = false,
  disabled = false,
  onClick,
}: {
  next?: boolean;
  disabled?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}) {
  return (
    <ButtonBase
      sx={{
        position: 'absolute',
        top: 0,
        left: next ? undefined : 0,
        right: next ? 0 : undefined,
        zIndex: 100,
        width: 48,
        opacity: 0.4,
        height: '100%',
        bgcolor: ({ palette }: Theme) => (palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        transition: (theme: Theme) => theme.transitions.create('opacity'),
        '&:hover': !disabled ? { opacity: 0.8 } : undefined,
      }}
      onClick={onClick}
    >
      {next ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
    </ButtonBase>
  );
}

CarouselButton.defaultProps = {
  next: false,
  disabled: false,
};

type CardProps = {
  edges: {
    node: DatumBrowser;
  }[];
  tab: Tab;
  mode: Mode;
};

function Card({ edges, tab, mode }: CardProps) {
  const isMobile = useIsMobile();
  const { card } = useAppState();
  const dispatch = useDispatch();
  const { range } = useRange(edges);
  const [squareRef, { width }] = useElementSize();
  const px = React.useMemo(() => {
    if (isMobile) return 5;
    return Math.max((width - 400) / 2 - 40, 0);
  }, [width, isMobile]);

  React.useEffect(() => {
    if (card < range[0]) {
      dispatch({ type: 'SET_CARD_YEAR', year: range[0] });
    }
  }, [range]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue < range[0] || newValue > range[range.length - 1]) return;
    dispatch({ type: 'SET_CARD_YEAR', year: newValue });
  };

  const handleChangeIndex = (index: number) => {
    if (index < 0 || index >= edges.length) return;
    dispatch({ type: 'SET_CARD_YEAR', year: range[index] });
  };
  const useHandleChange = (newValue: number) => (event: React.SyntheticEvent) => {
    handleChange(event, newValue);
  };

  return (
    <Box
      display="flex"
      flexGrow={1}
      ref={squareRef}
      position="relative"
      bgcolor={({ palette }) => (palette.mode === 'light' ? 'grey.100' : 'Background.default')}
    >
      <SwipeableViews
        resistance
        enableMouseEvents
        index={range.indexOf(card)}
        onChangeIndex={handleChangeIndex}
        style={{
          flexGrow: 1,
          padding: `0 ${px}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
        containerStyle={{
          flexGrow: 1,
          flexShrink: 1,
        }}
        slideStyle={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile ? '5px' : '20px',
        }}
      >
        {edges.map((edge, index) => (
          <Box key={edge.node.id} minWidth={320} maxWidth={400} flexGrow={1} display="flex" flexShrink={1}>
            <CardItem
              edge={edge}
              previous={index !== 0 ? edges[index - 1] : null}
              tab={tab}
              index={index}
              handleChangeIndex={handleChangeIndex}
            />
          </Box>
        ))}
      </SwipeableViews>
      {!isMobile ? (
        <>
          <CarouselButton onClick={useHandleChange(card - 1)} disabled={card === range[0]} />
          <CarouselButton onClick={useHandleChange(card + 1)} next disabled={card === range[range.length - 1]} />
        </>
      ) : null}
    </Box>
  );
}

export default Card;
