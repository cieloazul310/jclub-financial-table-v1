import * as React from "react";
import { Swiper as SwiperCore } from "swiper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

type HandlerProps = {
  swiper: SwiperCore | null;
};

function Handler({ swiper }: HandlerProps) {
  const onClick = (index: number) => () => {
    if (!swiper) return;
    const { activeIndex } = swiper;
    swiper?.slideTo(activeIndex + index);
  };

  return (
    <div>
      <IconButton onClick={onClick(-4)}>
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton onClick={onClick(-1)}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton onClick={onClick(1)}>
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton onClick={onClick(4)}>
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </div>
  );
}

export default Handler;
