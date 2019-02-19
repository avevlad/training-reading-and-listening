import axios from '../utils/axios';
import { Action, listen, Listen, thunk, Thunk } from 'easy-peasy';
import defaultTaskList from "../misc/default-task.js";
import parseYoutubeUrl from "../utils/parse-youtube-url";

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

    const defaultTasks = [];

    for (let i = 0; i < defaultTaskList.length; i++) {
      const defaultTaskListElement = defaultTaskList[i];
      const res = await axios.get(`/${defaultTaskListElement.subtitle}`);
      const t: Task = {
        id: i,
        plainSubtitles: res.data,
        source: TaskSource.YOUTUBE,
        url: parseYoutubeUrl(defaultTaskListElement.link),
      };
      defaultTasks.push(t);
    }

    actions.setItems(defaultTasks);
    actions.syncWithLocalstorage(null);
    actions.setFetching(false);
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
