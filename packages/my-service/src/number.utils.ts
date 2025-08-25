export function toTwoDecimalPlaces(num: number): string {
  const regex = /^(\d+)(\.\d{0,2})?/;
  const match = num.toString().match(regex);
  if (match) {
    return match[1] + (match[2] ? match[2].padEnd(3, '0') : '.00');
  }
  return '0.00';
}
