import subtitles, { ISubtitlesStore } from './subtitles.store';

export interface IStore {
  subtitles: ISubtitlesStore
}

export default {
  subtitles,
}
