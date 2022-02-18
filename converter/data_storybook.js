const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const fileDir = path.resolve(__dirname, '../data/dataset/mitohollyhock');
const keys = [
  'id',
  'name',
  'slug',
  'fullname',
  'year',
  'category',
  'license',
  'rank',
  'points',
  'ppg',
  'elevation',
  'revenue',
  'expense',
  'op_profit',
  'no_rev',
  'no_exp',
  'ordinary_profit',
  'sp_rev',
  'sp_exp',
  'profit_before_tax',
  'tax',
  'profit',
  'curr_assets',
  'fixed_assets',
  'assets',
  'curr_liabilities',
  'fixed_liabilities',
  'liabilities',
  'net_worth',
  'capital_stock',
  'capital_surplus',
  'retained_earnings',
  'profit',
  'revenue',
  'sponsor',
  'ticket',
  'broadcast',
  'academy_rev',
  'goods_rev',
  'other_revs',
  'related_revenue',
  'expense',
  'salary',
  'manage_exp',
  'general_exp',
  'game_exp',
  'team_exp',
  'academy_exp',
  'women_exp',
  'goods_exp',
  'sga',
  'league_attd',
  'league_games',
  'leaguecup_attd',
  'leaguecup_games',
  'po_attd',
  'po_games',
  'acl_attd',
  'acl_games',
  'second_attd',
  'second_games',
  'all_attd',
  'all_games',
  // 'average_attd',
  // 'unit_price',
];

const data = fs
  .readdirSync(fileDir)
  .map((file) => yaml.parse(fs.readFileSync(path.join(fileDir, file), 'utf-8')))
  .map((source) => {
    let node = {};
    for (let i = 0; i < keys.length; i++) {
      node = { ...node, [keys[i]]: source[keys[i]] ?? null };
    }
    return ({
        node: {
          ...node,
          average_attd: Math.round(source.league_attd / source.league_games),
          unit_price: source.ticket ? Math.round((source.ticket * 1000000) / source.all_attd) : null,
        },
      });
  }
);

fs.writeFileSync(path.resolve(__dirname, '../src/stories/assets/data.ts'), JSON.stringify(data, null, 2));
