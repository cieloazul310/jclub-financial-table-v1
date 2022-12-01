import type { Tab } from '../../types';

export default function useUnitString(tab: Tab): string {
  const unit = tab === 'attd' ? '入場料収入のみ百万円' : '百万円';
  return `単位: ${unit}`;
}
