import * as React from "react";
import Box from "@mui/material/Box";
import type { Swiper as SwiperCore } from "swiper";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "./CardItem";
import Handler from "./Handler";
import useStateData from "../../../../utils/useStateEdges";
import { useAppState } from "../../../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext";
import type { AllDataFieldsFragment, Mode } from "../../../../../types";

import "swiper/css";
import "swiper/css/scrollbar";

function rangeIsNumbers(
  range: (number | string)[],
  mode: Mode,
): range is number[] {
  return mode === "club";
}
function rangeIsStrings(
  range: (number | string)[],
  mode: Mode,
): range is string[] {
  return mode === "year";
}

function useRange(nodes: AllDataFieldsFragment[], mode: Mode) {
  const range = nodes.map((node) => (mode === "club" ? node.year : node.slug));
  return {
    range,
    totalCount: nodes.length,
  };
}

function useInitialIndex(range: (string | number)[], mode: Mode) {
  if (rangeIsNumbers(range, mode)) {
    const storaged = window.sessionStorage.getItem("currentYear");
    if (!storaged) return range.length - 1;
    const currentYear = parseInt(storaged, 10);
    const index = range.indexOf(currentYear);
    if (index < 0) return range.length - 1;
    return index;
  }
  if (rangeIsStrings(range, mode)) {
    const storaged = window.sessionStorage.getItem("currentClub");
    if (!storaged) return 0;
    const index = range.indexOf(storaged);
    if (index < 0) return 0;
    return index;
  }
  return 0;
}

type CardProps = {
  nodes: (AllDataFieldsFragment & {
    previousData: AllDataFieldsFragment | null;
  })[];
  mode: Mode;
};

function Card({ nodes, mode }: CardProps) {
  const [swiper, setSwiper] = React.useState<SwiperCore | null>(null);
  let timer: NodeJS.Timeout;
  const stateEdges = useStateData(nodes, mode);
  const { range, totalCount } = useRange(stateEdges, mode);
  const { sortAsc, sortKey } = useAppState();
  const initialIndex = useInitialIndex(range, mode);
  /**
   * 年度別表示 ソート順とソート項目を変更した場合に先頭へ戻るエフェクト
   */
  React.useLayoutEffect(() => {
    if (mode !== "year") return;
    swiper?.slideTo(0);
  }, [sortAsc, sortKey]);

  const onSwiper = (currentSwiper: SwiperCore) => {
    setSwiper(currentSwiper);
  };

  /**
   * スクロール終了時に表示中の年度、クラブをsessionStorage に保存
   */
  const onSlideChange = (currentSwiper: SwiperCore) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const { activeIndex } = currentSwiper;
      if (rangeIsNumbers(range, mode)) {
        const currentYear = range?.[activeIndex];
        if (currentYear) {
          window.sessionStorage.setItem("currentYear", currentYear.toString());
        }
      }
      if (rangeIsStrings(range, mode)) {
        const currentClub = range?.[activeIndex];
        if (currentClub) {
          window.sessionStorage.setItem("currentClub", currentClub);
        }
      }
    }, 250);
  };

  return (
    <Box display="flex" flexGrow={1} width={1} flexDirection="column">
      <Box
        display="flex"
        flexGrow={1}
        width={1}
        minHeight={400}
        p={1}
        bgcolor={({ palette }) =>
          palette.mode === "light" ? "grey.100" : "background.default"
        }
      >
        <Swiper
          modules={[Mousewheel, Scrollbar]}
          cssMode
          mousewheel
          centeredSlides
          simulateTouch={false}
          initialSlide={initialIndex}
          scrollbar={{
            draggable: true,
          }}
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
          {stateEdges.map((node, index) => (
            <SwiperSlide key={node.id}>
              <CardItem
                node={node}
                previous={node.previousData}
                mode={mode}
                index={index}
                length={totalCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Handler swiper={swiper} />
    </Box>
  );
}

export default Card;
