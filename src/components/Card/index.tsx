import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import CardItem from './CardItem';
import useIsMobile from '../../utils/useIsMobile';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { DatumBrowser, Tab, Mode } from '../../../types';

function useRange(edges: { node: DatumBrowser }[]) {
  return {
    range: edges.map(({ node }) => node.year),
    totalCount: edges.length,
  };
}

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch({ type: 'SET_CARD_YEAR', year: newValue });
  };

  const handleChangeIndex = (index: number) => {
    dispatch({ type: 'SET_CARD_YEAR', year: range[index] });
  };

  return (
    <Box display="flex" flexGrow={1}>
      <SwipeableViews
        enableMouseEvents
        index={range.indexOf(card)}
        onChangeIndex={handleChangeIndex}
        style={{
          flexGrow: 1,
          backgroundColor: '#eef',
          padding: `0 ${isMobile ? 5 : 150}px`,
          height: 'calc(100vh - 106px)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden',
        }}
        containerStyle={{
          flexGrow: 1,
          flexShrink: 1,
          minHeight: 0,
        }}
        slideStyle={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#eff',
          border: '1px solid #ddd',
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
    </Box>
  );
}

export default Card;
