import * as React from "react";
import Grid from "@mui/material/Grid";
import {
  Jumbotron,
  Section,
  Article,
  Seo,
} from "@cieloazul310/gatsby-theme-aoi";
import Layout from "@/layout";
import GridItemMenu from "@/components/grid-item-menu";

function DocsPage() {
  return (
    <Layout title="経営情報の見方">
      <Jumbotron title="経営情報の見方" maxWidth="md" component="header" />
      <Section component="main">
        <Article maxWidth="md">
          <Grid container spacing={4} component="nav">
            <GridItemMenu
              title="損益計算書 (P/L)"
              href="/docs/pl"
              description="企業の一年間の経済活動の内容と収支を示す財務諸表"
            />
            <GridItemMenu
              title="貸借対照表 (B/S)"
              href="/docs/bs"
              description="企業の決算時点の財務状況を表す財務諸表"
            />
            <GridItemMenu
              title="営業収入"
              href="/docs/revenue"
              description="スポンサー収入、入場料収入、配分金などJクラブの営業収入の項目についての説明"
            />
            <GridItemMenu
              title="営業費用"
              href="/docs/expense"
              description="チーム人件費、トップチーム運営費用などJクラブの営業費用の項目についての説明"
            />
            <GridItemMenu
              title="入場者数"
              href="/docs/attd"
              description="入場者数、入場料収入、客単価について"
            />
            <GridItemMenu
              title="クラブライセンス関連"
              href="/docs/license"
              description="Jリーグクラブライセンス制度の財務基準に関する説明"
            />
          </Grid>
        </Article>
      </Section>
    </Layout>
  );
}

export default DocsPage;

export function Head() {
  return <Seo title="経営情報の見方" />;
}
