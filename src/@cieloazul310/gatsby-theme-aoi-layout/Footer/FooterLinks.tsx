import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AppLink } from "@cieloazul310/gatsby-theme-aoi";
import type { Club } from "types";
import useClubsByCategory from "@/utils/graphql-hooks/useClubsByCategory";
import useAllYears from "@/utils/graphql-hooks/useAllYears";

type CategoryLinksProps = {
  title: string;
  clubs: Pick<Club, "short_name" | "href">[];
};

function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  return (
    <div>
      <Typography variant="subtitle1" component="p" gutterBottom>
        {title}
      </Typography>
      <Typography sx={{ p: 0, m: 0 }} component="ul">
        {clubs.map((node) => (
          <Typography
            sx={{ p: 0, mr: 1, my: 0, ml: 0, display: "inline-block" }}
            key={node.short_name}
            variant="body2"
            component="li"
          >
            <AppLink href={node.href} color="inherit">
              {node.short_name}
            </AppLink>
          </Typography>
        ))}
      </Typography>
    </div>
  );
}

function YearsLinks() {
  const years = useAllYears();

  return (
    <div>
      <Typography variant="subtitle1" component="p" gutterBottom>
        年度別
      </Typography>
      <Typography sx={{ p: 0, m: 0 }} component="ul">
        {years.map((node) => (
          <Typography
            sx={{ p: 0, mr: 1, my: 0, ml: 0, display: "inline-block" }}
            key={node.id}
            variant="body2"
            component="li"
          >
            <AppLink href={node.href} color="inherit">
              {node.year}
            </AppLink>
          </Typography>
        ))}
      </Typography>
    </div>
  );
}

function FooterLinks() {
  const { j1, j2, j3 } = useClubsByCategory();
  return (
    <Grid container spacing={2} component="nav">
      <Grid item xs={12} sm={6} md={3}>
        <CategoryLinks title="J1" clubs={j1.nodes} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CategoryLinks title="J2" clubs={j2.nodes} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CategoryLinks title="J3" clubs={j3.nodes} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <YearsLinks />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <AppLink href="/posts/" color="inherit">
            記事一覧
          </AppLink>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <AppLink href="/posts/archive/" color="inherit">
            記事アーカイブ
          </AppLink>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <AppLink href="/series/" color="inherit">
            項目別表示
          </AppLink>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <AppLink href="/download/" color="inherit">
            データダウンロード
          </AppLink>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FooterLinks;
