export default function val(value: number | null, separator: boolean) {
  if (typeof value !== 'number') return '';
  if (!separator) return value.toString();
  return value.toLocaleString('en-US');
}
