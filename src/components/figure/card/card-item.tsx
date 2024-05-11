import * as React from "react";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { AppLink } from "@cieloazul310/gatsby-theme-aoi";
import { useAppState, useDispatch } from "@appState/AppStateContext";
import type { AllDataFieldsFragment, Mode, General, SeasonResult } from "types";
import CategoryLabel from "../../category-label";
import CardItemStyle from "./card-item-style";
import CardValues from "./card-values";

type CardItemProps<T extends Mode> = {
  node: AllDataFieldsFragment;
  previous: Omit<
    AllDataFieldsFragment,
    keyof General | keyof SeasonResult
  > | null;
  mode: T;
  index: number;
  length: number;
};

function CardItem<T extends Mode>({
  node,
  previous,
  mode,
  index,
  length,
}: CardItemProps<T>) {
  const { tab, sortKey } = useAppState();
  const dispatch = useDispatch();
  const { category, name, year, fullname, slug, rank, elevation } = node;

  const onRankClick = () => {
    if (sortKey === "rank") {
      dispatch({ type: "TOGGLE_SORTASC" });
    } else {
      dispatch({ type: "CHANGE_SORTKEY", sortKey: "rank" });
    }
  };

  const header = React.useMemo(
    () => (
      <>
        <CategoryLabel category={category} />
        <Typography
          component="span"
          flexGrow={1}
          color="text.secondary"
          ml={1}
          display="flex"
          alignItems="center"
        >
          <ButtonBase
            sx={{
              fontSize: "inherit",
              color:
                mode === "year" && sortKey === "rank"
                  ? "secondary.main"
                  : "inherit",
              "&:hover": {
                textDecoration: mode === "year" ? "underline" : undefined,
                cursor: mode === "year" ? "pointer" : undefined,
              },
            }}
            disableRipple
            disabled={mode === "club"}
            onClick={onRankClick}
          >
            {mode === "club" ? name : `${year}年`}
            {` ${category} ${rank}位`}
          </ButtonBase>
          {elevation && (
            <Typography
              component="span"
              ml={1}
              color={elevation === "昇格" ? "success.main" : "error.main"}
            >
              {elevation}
            </Typography>
          )}
        </Typography>
        {mode === "year" && (
          <Typography component="span" fontWeight="bold">
            {(index + 1).toString()} / {length}
          </Typography>
        )}
      </>
    ),
    [category, name, year, rank, elevation, index, length, mode, sortKey],
  );

  const title = React.useMemo(
    () => (
      <AppLink
        color="inherit"
        href={mode === "club" ? `/year/${year}/` : `/club/${slug}/`}
      >
        {mode === "club" ? `${year}年度決算` : fullname}
      </AppLink>
    ),
    [year, slug, fullname, mode],
  );

  const subtitle = React.useMemo(() => {
    if (tab === "pl") return "損益計算書 (P/L)";
    if (tab === "bs") return "貸借対照表 (B/S)";
    if (tab === "revenue") return "営業収入";
    if (tab === "expense") return "営業費用";
    return "入場者数";
  }, [tab]);

  return (
    <CardItemStyle header={header} title={title} subtitle={subtitle}>
      <CardValues data={node} previous={previous} mode={mode} tab={tab} />
    </CardItemStyle>
  );
}

export default CardItem;
