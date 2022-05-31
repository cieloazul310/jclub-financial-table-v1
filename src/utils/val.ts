export default function val(value: number | null, separator: boolean, decimal?: number) {
  if (typeof value !== 'number') return '';
  const v = value.toFixed(decimal);
  if (!separator) return v;
  return parseFloat(v).toLocaleString('en-US');
}
