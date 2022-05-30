import { Node } from 'gatsby';

export type Mode = 'club' | 'year';
export type Tab = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
export type MobileTab = 'summary' | 'figure' | 'article' | 'settings';

export type Category = 'J1' | 'J2' | 'J3';

export type Club = {
  id: string;
  slug: string;
  href: string;
  name: string;
  fullname: string;
  short_name: string;
  company: string;
  category: Category;
  hometown: string;
  // area: string;
  settlement: string | null;
  relatedCompanies: string[] | null;
};
export type ClubNode = Node & Club;
export type ClubBrowser = Club & { data: DatumBrowser[]; posts: { entries: MdxPost[]; totalCount: number } };

export type Year = {
  id: string;
  year: number;
  href: string;
  categories: Category[];
};
export type YearNode = Node & Year;
export type StatsValues = {
  values: number[];
  totalCount: number;
  average: number;
};
export type YearStats = {
  revenue: StatsValues;
  expense: StatsValues;
  net_worth: StatsValues;
  sponsor: StatsValues;
  ticket: StatsValues;
  broadcast: StatsValues;
  salary: StatsValues;
  average_attd: StatsValues;
  unit_price: StatsValues;
};

export type YearBrowser = Year & { data: DatumBrowser[]; stats: { J1: YearStats; J2: YearStats; J3: YearStats | null } };

export type General = {
  id: string;
  name: string;
  slug: string;
  fullname: string;
  year: number;
  category: string;
  license: string | null;
};
export type SeasonResult = {
  rank: number;
  points: number;
  ppg: number;
  elevation: '昇格' | '降格' | null;
};
export type PL = {
  /** 営業収入 */
  revenue: number;
  /** 営業費用 */
  expense: number;
  /** 営業利益 */
  op_profit: number;
  /** 営業外収入 */
  no_rev: number | null;
  /** 営業外費用 */
  no_exp: number | null;
  /** 経常利益 */
  ordinary_profit: number;
  /** 特別利益 */
  sp_rev: number | null;
  /** 特別損失 */
  sp_exp: number | null;
  /** 税引前当期利益 */
  profit_before_tax: number | null;
  /** 法人税および住民税等 */
  tax: number | null;
  /** 当期純利益 */
  profit: number;
  /** 関連する法人の営業収入 */
  related_revenue: number | null;
};
export type BS = {
  /** 流動資産 */
  curr_assets: number | null;
  /** 固定資産等 */
  fixed_assets: number | null;
  /** 総資産 */
  assets: number | null;
  /** 流動負債 */
  curr_liabilities: number | null;
  /** 固定負債 */
  fixed_liabilities: number | null;
  /** 総負債 */
  liabilities: number | null;
  /** 純資産 */
  net_worth: number | null;
  /** 資本金 */
  capital_stock: number | null;
  /** 資本剰余金 */
  capital_surplus: number | null;
  /** 利益剰余金 */
  retained_earnings: number | null;
  /** 当期純利益 */
  profit: number;
};
export type Revenue = {
  /** 営業収入 */
  revenue: number;
  /** 広告料収入 */
  sponsor: number | null;
  /** 入場料収入 */
  ticket: number | null;
  /** Jリーグ配分金 */
  broadcast: number | null;
  /** アカデミー関連収入 */
  academy_rev: number | null;
  /** 物販収入 */
  goods_rev: number | null;
  /** その他収入 */
  other_revs: number | null;
  /** 関連する法人の営業収入 */
  related_revenue: number | null;
};
export type Expense = {
  /** 営業費用 */
  expense: number;
  /** チーム人件費 */
  salary: number | null;
  /** 事業費 */
  manage_exp: number | null;
  /** 総事業費 */
  general_exp: number | null;
  /** 試合関連経費 */
  game_exp: number | null;
  /** トップチーム運営経費 */
  team_exp: number | null;
  /** アカデミー関連経費 */
  academy_exp: number | null;
  /** 女子チーム運営経費 */
  women_exp: number | null;
  /** 物販関連費 */
  goods_exp: number | null;
  /** 販売費および一般管理費 */
  sga: number | null;
};
export type Attd = {
  /** 入場料収入 */
  ticket: number | null;
  /** リーグ戦入場者数 */
  league_attd: number;
  /** リーグ戦ホーム試合数 */
  league_games: number;
  /** リーグカップ入場者数 */
  leaguecup_attd: number | null;
  /** リーグカップホーム試合数 */
  leaguecup_games: number | null;
  /** PO入場者数 */
  po_attd: number | null;
  /** POホーム試合数 */
  po_games: number | null;
  /** ACL入場者数 */
  acl_attd: number | null;
  /** ACLホーム試合数 */
  acl_games: number | null;
  /** セカンドチーム入場者数 */
  second_attd: number | null;
  /** セカンドチームホーム試合数 */
  second_games: number | null;
  /** 総入場者数 */
  all_attd: number;
  /** ホーム総試合数 */
  all_games: number;
};
export type AttdBrowser = Attd & {
  /** リーグ戦平均入場者数 */
  average_attd: number;
  /** 客単価 */
  unit_price: number | null;
};
export type Datum = General & SeasonResult & PL & BS & Revenue & Expense & Attd;
export type DatumNode = Node & Datum;
export type DatumBrowser = Datum &
  AttdBrowser & { previousData: (General & SeasonResult & PL & BS & Revenue & Expense & AttdBrowser) | null };
export type DatumBrowserNode = DatumBrowser & Node;

export type SortableKeys = keyof (Omit<SeasonResult, 'elevation'> & PL & BS & Revenue & Expense & AttdBrowser);

export type Dict = {
  [K in Exclude<keyof DatumBrowser, 'slug' | 'previousData'>]: string;
};

export type YearPageNeighbor = {
  mode: Mode;
  node: Pick<YearBrowser, 'year' | 'href'>;
} | null;
export type YearPageData = {
  year: Omit<YearBrowser, 'data'>;
  previous: Pick<YearBrowser, 'year' | 'href' | 'stats'> | null;
  next: Pick<YearBrowser, 'year' | 'href'> | null;
  allData: {
    edges: {
      node: DatumBrowser;
    }[];
  };
};
export type YearPageContext = {
  previous: number | null;
  next: number | null;
};

export type ClubPageNeighbor = { mode: Mode; node: Pick<ClubBrowser, 'short_name' | 'name' | 'href'> } | null;
export type ClubPageData = {
  club: Omit<ClubBrowser, 'data' | 'posts'>;
  previous: Pick<ClubBrowser, 'name' | 'href'> | null;
  next: Pick<ClubBrowser, 'name' | 'href'> | null;
  allData: {
    edges: {
      node: DatumBrowser;
    }[];
  };
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'title' | 'slug' | 'date'>;
    }[];
  };
};
export type ClubPageContext = {
  previous: string | null;
  next: string | null;
};

export type DocsQueryData = {
  mdx: {
    frontmatter: {
      title: string;
    };
    body: string;
  };
};
export type DownloadDatum = {
  クラブ: string;
  id: string;
  年: number;
  所属: string;
  [key: string]: number | string | null;
};
export type Statistics = {
  year: number;
  category: string;
} & YearStats;

export type Frontmatter = {
  title: string;
  date: string;
  lastmod: string | null;
  club: string | null;
  draft: boolean;
};

export type MdxBare = {
  frontmatter: Frontmatter;
};
export type MdxNode = Node & MdxBare;

export type MdxPostBare = Node &
  Frontmatter & {
    slug: string;
    body: string;
    excerpt: string;
  };

export type MdxPost = Node &
  Pick<MdxPostBare, 'title' | 'date' | 'draft' | 'slug' | 'body' | 'excerpt'> & {
    lastmod: string;
    club: Club[] | null;
  };

export type MdxPostByYear = {
  id: string;
  year: string;
  basePath: string;
  gte: string;
  lt: string;
  totalCount: number;
};
