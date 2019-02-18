import range from 'lodash/range';
import { Action, listen, Listen, thunk, Thunk } from 'easy-peasy';
import { func } from "prop-types";

enum TaskSource {
  YOUTUBE = 'youtube',
  AUDIO = 'audio',
}

interface Task {
  id: number,
  url: string,
  source: TaskSource,
  plainSubtitles: string,
}

interface ITasksState {
  items: Task[],
  listeners: Listen<ITasksActions>;
}

interface ITasksActions {
  add: Action<ITasksState, Task>,
  delete: Action<ITasksState, number>,
  syncWithLocalstorage: Action<ITasksState>;
  fetch: Thunk<ITasksState>;
}

export type ITasksStore = ITasksState & ITasksActions;

const defaultItems = range(1, 10).map((__, i): Task => {
  return {
    id: __,
    url: 'url',
    source: TaskSource.AUDIO,
    plainSubtitles: 'plainSubtitles',
  }
});


const store: ITasksStore = {
  items: defaultItems,
  add: (state, payload) => {
    state.items.push(payload)
  },
  delete: (state, payload) => {
    let index = state.items.findIndex(__ => __.id === payload);
    state.items.splice(index, 1)
  },
  // setItems: () => {
  //
  // },
  fetch: thunk(async (actions, payload) => {
    console.log("actions = ", actions);
  }),
  syncWithLocalstorage: (state) => {
    localStorage.setItem("app_items", JSON.stringify(state.items));
  },
  listeners: listen(on => {
    on(store.delete, (actions) => {
      actions.syncWithLocalstorage(null);
    });
  })
};

export default store;
