import subtitles, { ISubtitlesStore } from './tasks.store';

export interface IStore {
  subtitles: ISubtitlesStore
}

export default {
  subtitles,
}
