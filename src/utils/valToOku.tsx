function valToOku(value: number, abs?: boolean) {
  const oku = abs ? Math.abs(value / 100) : value / 100;
  return oku.toFixed(2);
}

export default valToOku;
