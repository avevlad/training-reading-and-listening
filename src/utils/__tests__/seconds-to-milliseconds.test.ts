import secondsToMilliseconds from '../seconds-to-milliseconds';

describe('Seconds to milliseconds', () => {
  const arr = [
    [1.343, 1343],
    [1.3402, 1340],
    [1.30035564, 1300],
    [43.232545, 43232],
    [0.2102, 210],
    [30.29, 30290],
  ];

  for (let i = 0; i < arr.length; i++) {
    const [expVal, eqVal] = arr[i];
    it(`s  to m #${i} ${expVal}`, () => {
      expect(secondsToMilliseconds(expVal)).toEqual(eqVal);
    });
  }
});


