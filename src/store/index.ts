import subtitles, { ISubtitlesStore } from './subtitles.store';
import { Action } from 'easy-peasy';

export interface IStore {
  subtitles: ISubtitlesStore
}

export default {
  subtitles,
  // subtitles: {
  //   kek: 123,
  //   items: ['123', 'dasd'],
  //   add: () => {
  //
  //   },
  // },
}
