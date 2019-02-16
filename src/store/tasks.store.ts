import { Action } from 'easy-peasy';

enum TaskSource {
  YOUTUBE = 'youtube',
  AUDIO = 'audio',
}

interface Task {
  source: TaskSource,
  plainSubtitles: string,
}

interface ISubtitlesState {
  items: Task[],
}

interface ISubtitlesActions {
  add: Action<ISubtitlesState, Task>,
}

export type ISubtitlesStore = ISubtitlesState & ISubtitlesActions;

// export const TaskSource = {}

const store: ISubtitlesStore = {
  items: [],
  add: (state, payload) => {
    state.items.push(payload)
  }
};


export default store;
