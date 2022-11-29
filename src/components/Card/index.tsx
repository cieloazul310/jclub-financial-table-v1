import * as React from 'react';
import Box from '@mui/material/Box';
import { type Swiper as SwiperCore, Navigation, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardItem from './CardItem';
import useIsMobile from '../../utils/useIsMobile';
import useStateEdges from '../../utils/useStateEdges';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import type { DatumBrowser, Mode } from '../../../types';

import 'swiper/css';
import 'swiper/css/navigation';

function rangeIsNumbers(range: (number | string)[], mode: Mode): range is number[] {
  return mode === 'club';
}
function rangeIsStrings(range: (number | string)[], mode: Mode): range is string[] {
  return mode === 'year';
}

function useRange(edges: { node: DatumBrowser }[], mode: Mode) {
  const range = edges.map(({ node }) => (mode === 'club' ? node.year : node.slug));
  return {
    range,
    totalCount: edges.length,
  };
}

function useInitialIndex(range: (string | number)[], mode: Mode) {
  if (rangeIsNumbers(range, mode)) {
    const storaged = window.sessionStorage.getItem('currentYear');
    if (!storaged) return range.length - 1;
    const currentYear = parseInt(storaged, 10);
    const index = range.indexOf(currentYear);
    if (index < 0) return range.length - 1;
    return index;
  }
  if (rangeIsStrings(range, mode)) {
    const storaged = window.sessionStorage.getItem('currentClub');
    if (!storaged) return 0;
    const index = range.indexOf(storaged);
    if (index < 0) return 0;
    return index;
  }
  return 0;
}

type CardProps = {
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
};

function Card({ edges, mode }: CardProps) {
  const [swiper, setSwiper] = React.useState<SwiperCore | null>(null);
  const isMobile = useIsMobile();
  const stateEdges = useStateEdges(edges, mode);
  const { range, totalCount } = useRange(stateEdges, mode);
  const { sortAsc, sortKey } = useAppState();
  const initialIndex = useInitialIndex(range, mode);

  const modules = React.useMemo(() => {
    if (!isMobile) return [Navigation, Mousewheel];
    return [Mousewheel];
  }, [isMobile]);

  /**
   * 年度別表示 ソート順とソート項目を変更した場合に先頭へ戻るエフェクト
   */
  React.useLayoutEffect(() => {
    if (mode !== 'year') return;
    swiper?.slideTo(0);
  }, [sortAsc, sortKey]);

  const onSwiper = (currentSwiper: SwiperCore) => {
    setSwiper(currentSwiper);
  };

  /**
   * 表示中の年度、クラブをsessionStorage に保存
   */
  const onSlideChange = (currentSwiper: SwiperCore) => {
    const { activeIndex } = currentSwiper;
    if (rangeIsNumbers(range, mode)) {
      const currentYear = range[activeIndex];
      window.sessionStorage.setItem('currentYear', currentYear.toString());
    }
    if (rangeIsStrings(range, mode)) {
      const currentClub = range[activeIndex];
      window.sessionStorage.setItem('currentClub', currentClub);
    }
  };

  return (
    <Box
      display="flex"
      flexGrow={1}
      width={1}
      minHeight={400}
      p={1}
      bgcolor={({ palette }) => (palette.mode === 'light' ? 'grey.100' : 'Background.default')}
    >
      <Swiper
        modules={modules}
        cssMode
        mousewheel
        centeredSlides
        simulateTouch={false}
        initialSlide={initialIndex}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
      >
        {stateEdges.map((edge, index) => (
          <SwiperSlide key={edge.node.id}>
            <CardItem edge={edge} previous={edge.node.previousData} mode={mode} index={index} length={totalCount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Card;
/*
function rangeIsNumbers(range: (number | string)[], mode: Mode): range is number[] {
  return mode === 'club';
}
function rangeIsStrings(range: (number | string)[], mode: Mode): range is string[] {
  return mode === 'year';
}

function useRange(edges: { node: DatumBrowser }[], mode: Mode) {
  const range = edges.map(({ node }) => (mode === 'club' ? node.year : node.slug));
  return {
    range,
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
  mode: Mode;
};

function Card({ edges, mode }: CardProps) {
  const isMobile = useIsMobile();
  const stateEdges = useStateEdges(edges, mode);
  const { range, totalCount } = useRange(stateEdges, mode);
  const [squareRef, { width }] = useElementSize();
  const ref = React.useRef<HTMLDivElement>(null);
  const { sortAsc, sortKey } = useAppState();
  let timer: NodeJS.Timeout;

  const { contentWidth, px } = React.useMemo(() => {
    const itemWidth = isMobile ? Math.min(Math.max(320, width - 10), 400) : 400;
    const padding = Math.max((width - itemWidth) / 2, 5);

    return { contentWidth: itemWidth, px: padding };
  }, [width, isMobile]);

  React.useEffect(() => {
    if (rangeIsNumbers(range, mode)) {
      const storaged = window.sessionStorage.getItem('currentYear');
      if (!storaged || !ref.current) return;
      const currentYear = parseInt(storaged, 10);
      const index = range.indexOf(currentYear);
      if (index < 0) return;
      ref.current.scrollTo({ left: contentWidth * index });
    }
    if (rangeIsStrings(range, mode)) {
      const storaged = window.sessionStorage.getItem('currentClub');
      if (!storaged || !ref.current) return;
      const index = range.indexOf(storaged);
      if (index < 0) return;
      ref.current.scrollTo({ left: contentWidth * index });
    }
  }, [contentWidth]);

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTo({ left: mode === 'year' ? 0 : contentWidth * (totalCount - 1) });
  }, [sortAsc, sortKey]);

  const handleChange = (newIndex: number) => () => {
    const { current } = ref;
    if (!current) return;
    const { scrollWidth, scrollLeft } = current;

    current.scrollTo({ left: Math.max(0, Math.min(scrollLeft + contentWidth * newIndex, scrollWidth)), behavior: 'smooth' });
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    clearTimeout(timer);
    const { currentTarget } = event;
    timer = setTimeout(() => {
      const left = currentTarget.scrollLeft;
      const index = Math.round(left / contentWidth);

      if (rangeIsNumbers(range, mode)) {
        const currentYear = range[index];
        window.sessionStorage.setItem('currentYear', currentYear.toString());
      }
      if (rangeIsStrings(range, mode)) {
        const currentClub = range[index];
        window.sessionStorage.setItem('currentClub', currentClub);
      }
    }, 250);
  };

  return (
    <Box
      display="flex"
      flexGrow={1}
      width={1}
      overflow="hidden"
      minHeight={400}
      ref={squareRef}
      position="relative"
      bgcolor={({ palette }) => (palette.mode === 'light' ? 'grey.100' : 'Background.default')}
    >
      <Box
        sx={{
          px: `${px}px`,
          display: 'flex',
          flexDirection: 'row',
          width: 'max-content',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: `${px}px`,
          scrollPaddingRight: `${px}px`,
        }}
        ref={ref}
        onScroll={onScroll}
      >
        {stateEdges.map((edge, index) => (
          <Box
            key={edge.node.id}
            sx={{
              minWidth: 320,
              maxWidth: 400,
              width: contentWidth,
              flexShrink: 0,
              flexBasis: '100%;',
              flexGrow: 1,
              p: '20px',
              display: 'flex',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
            }}
          >
            <CardItem edge={edge} previous={edge.node.previousData} mode={mode} index={index} length={totalCount} />
          </Box>
        ))}
      </Box>
      {!isMobile && totalCount ? (
        <>
          <CarouselButton onClick={handleChange(-1)} />
          <CarouselButton onClick={handleChange(1)} next />
        </>
      ) : null}
    </Box>
  );
}

export default Card;
*/
