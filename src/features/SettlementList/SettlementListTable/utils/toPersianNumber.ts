export function toPersianNumber(input: string) {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input.replace(/\d/g, (d) => persianNumbers[parseInt(d)]);
}
