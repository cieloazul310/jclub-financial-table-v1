import { useLocation } from '@reach/router';
import { useAppState } from '../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';

export default function useTableId() {
  const { tab } = useAppState();
  const { pathname } = useLocation();
  return `${pathname.split('/').join('')}${tab}`;
}
