import parseYoutubeUrl from '../parse-youtube-url';

describe('Parse Youtube url', () => {

  const arr = [
    ['5VE9nihee7o', 'https://www.youtube.com/watch?time_continue=0&v=5VE9nihee7o'],
    ['pj8n78AuN3w', 'https://youtu.be/pj8n78AuN3w'],
    ['PjTc-EiwHqc', 'https://www.youtube.com/watch?v=PjTc-EiwHqc'],
  ];

  for (let i = 0; i < arr.length; i++) {
    const [eqVal, expVal] = arr[i];
    it(`parse youtube #${i} ${expVal}`, () => {
      expect(parseYoutubeUrl(expVal)).toEqual(eqVal);
    });
  }
});


