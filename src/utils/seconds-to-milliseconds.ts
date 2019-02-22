export default function secondsToMilliseconds(second: number): number {
  const arr = second.toString().split('.');
  const [sec, next] = arr;
  const fixedNext = String(next + '000').substr(0, 3);
  const final = `${sec}${fixedNext}`;

  return Number(final);
}
