import range from 'lodash/range';
import axios from 'axios';
import { Action, listen, Listen, thunk, Thunk } from 'easy-peasy';
import defaultTaskList from "../misc/default-task.js";

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
  isFetching: boolean,
  listeners: Listen<ITasksActions>;
}

interface ITasksActions {
  add: Action<ITasksState, Task>,
  delete: Action<ITasksState, number>,
  setItems: Action<ITasksState, Task[]>,
  setFetching: Action<ITasksState, boolean>,
  syncWithLocalstorage: Action<ITasksState>;
  fetch: Thunk<ITasksActions>;
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
  items: [],
  isFetching: true,
  add: (state, payload) => {
    state.items.push(payload)
  },
  delete: (state, payload) => {
    let index = state.items.findIndex(__ => __.id === payload);
    state.items.splice(index, 1)
  },
  setItems: (state, payload) => {
    state.items = payload;
  },
  setFetching: (state, payload) => {
    state.isFetching = payload;
  },
  fetch: thunk(async (actions) => {
    actions.setFetching(true);
    const raw = localStorage.getItem("app_items");
    if (raw) {
      const tasks = JSON.parse(raw);
      actions.setItems(tasks);
      actions.setFetching(false);
      return;
    }

    for (let i = 0; i < defaultTaskList.length; i++) {
      const defaultTaskListElement = defaultTaskList[i];
      const res = await axios.get(`/${defaultTaskListElement.subtitle}`);
      console.log("res = ", res);
      console.log("defaultTaskListElement = ", defaultTaskListElement);
    }

    // actions.setItems(defaultItems);
    // actions.setFetching(false);
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
