import { Action, Select, select, thunk, Thunk } from 'easy-peasy';
// @ts-ignore
import * as subtitleLib from 'subtitle';
import { IStore } from './index';

export interface ISubtitleItem {
  start: number,
  end: number,
  text: string,
  settings?: string,
}

interface IPlayerState {
  subtitles: ISubtitleItem[],
  isFetching: boolean,
}

interface IPlayerActions {
  setSubtitles: Action<IPlayerState, ISubtitleItem[]>,
  setFetching: Action<IPlayerState, boolean>,
  fetchSubtitlesFromTasksStore: Thunk<IPlayerActions, string, any, IStore>;
}

export type IPlayerStore = IPlayerState & IPlayerActions;

const store: IPlayerStore = {
  subtitles: [],
  isFetching: true,
  setSubtitles: (state, payload) => {
    state.subtitles = payload;
  },
  setFetching: (state, payload) => {
    state.isFetching = payload;
  },
  fetchSubtitlesFromTasksStore: thunk(async (actions, payload, helpers) => {
    const state = helpers.getState();
    const id = Number(payload);
    const task = state.getTaskById(id);

    if (!task) {
      return;
    }

    const sb = subtitleLib.parse(task.plainSubtitles);
    actions.setSubtitles(sb);
    actions.setFetching(false);
  })
};

export default store;
