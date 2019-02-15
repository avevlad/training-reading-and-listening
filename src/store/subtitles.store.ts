import { Action } from 'easy-peasy';

interface ISubtitlesState {
  items: string[],
}

interface ISubtitlesActions {
  add: Action<ISubtitlesState, string>,
}

export type ISubtitlesStore = ISubtitlesState & ISubtitlesActions;

const store: ISubtitlesStore = {
  items: ['Install easy-peasy', 'Build app', 'Profit'],
  add: (state, payload) => {
    state.items.push(payload)
  }
};


export default store;
