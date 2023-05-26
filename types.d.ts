import type { Node } from 'gatsby';

export type Mode = 'club' | 'year';
export type Tab = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
export type MobileTab = 'summary' | 'figure' | 'article' | 'settings';

export type Category = 'J1' | 'J2' | 'J3';

export type Club<T extends 'bare' | 'node' | 'browser' = 'browser'> = (T extends 'bare' ? Record<string, unknown> : Node) & {
  slug: string;
  href: T extends 'bare' ? never : string;
  name: string;
  fullname: string;
  short_name: string;
  company: string;
  category: Category;
  hometown: string;
  settlement: string | null;
  relatedCompanies: string[] | null;
  annotation: string[] | null;
  data: T extends 'browser' ? Datum<'browser'>[] : never;
  posts: T extends 'browser'
    ? {
        entries: MdxPost[];
        totalCount: number;
      }
    : never;
};

export type Year<T extends 'bare' | 'node' | 'browser' = 'browser'> = (T extends 'bare' ? Record<string, unknown> : Node) & {
  year: number;
  href: T extends 'bare' ? never : string;
  categories: Category[];
  data: T extends 'browser' ? Datum<'browser'>[] : never;
  stats: T extends 'browser'
    ? {
        J1: YearStats;
        J2: YearStats;
        J3: YearStats | null;
      }
    : never;
};

export type StatsValues = {
  values: { name: string; value: number }[];
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
  /** 女子チーム関連収入 */
  women_rev: number | null;
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
  /** その他売上原価 */
  other_cost: number | null;
  /** 販売費および一般管理費 */
  sga: number | null;
};
export type Attd<T extends 'bare' | 'node' | 'browser' = 'browser'> = {
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
  /** リーグ戦平均入場者数 */
  average_attd: T extends 'browser' ? number : never;
  unit_price: T extends 'browser' ? number | null : never;
};

export type AllDataFieldsFragment = General & SeasonResult & PL & BS & Revenue & Expense & Attd;

export type Datum<T extends 'bare' | 'node' | 'browser' = 'browser'> = (T extends 'bare' ? Record<string, unknown> : Node) &
  AllDataFieldsFragment &
  (T extends 'browser'
    ? {
        previousData: AllDataFieldsFragment;
      }
    : Record<string, unknown>);

export type SortableKeys = keyof (Omit<SeasonResult, 'elevation'> & PL & BS & Revenue & Expense & Attd<'browser'>);

export type Dict = {
  [K in Exclude<keyof Datum<'browser'>, 'slug' | 'previousData'>]: string;
};

export type MdxFrontmatter = {
  title: string;
  date: string;
  lastmod: string | null;
  club: string[] | null;
  draft: boolean;
};

export type Mdx<T extends 'bare' | 'node' = 'node'> = (T extends 'node' ? Node : Record<string, unknown>) & {
  frontmatter: MdxFrontmatter;
};

export type MdxPost<T extends 'node' | 'browser' = 'browser'> = Node & {
  title: string;
  year: T extends 'browser' ? string : null;
  date: string;
  draft: boolean;
  slug: string;
  club: (T extends 'browser' ? Club : string)[] | null;
  lastmod: string;
};

export type MdxPostListFragment = Pick<MdxPost, 'title' | 'date' | 'slug'>;

export type DocsQueryData = {
  mdx: {
    frontmatter: {
      title: string;
      lastmod?: string;
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

export type MdxPostByYear = {
  id: string;
  year: string;
  basePath: string;
  totalCount: number;
};
