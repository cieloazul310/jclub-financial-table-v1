import * as React from 'react';
import { HomeIcon, ArticleIcon, ArchiveIcon, SeriesIcon, DownloadIcon } from '../../icons';

export type Menu = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

const menu: Menu[] = [
  { title: 'トップページ', path: '/', icon: <HomeIcon /> },
  { title: '記事一覧', path: '/posts/', icon: <ArticleIcon /> },
  { title: '記事アーカイブ', path: '/posts/archive/', icon: <ArchiveIcon /> },
  { title: '項目別表示', path: '/series/', icon: <SeriesIcon /> },
  { title: 'データダウンロード', path: '/download/', icon: <DownloadIcon /> },
];

export default menu;
