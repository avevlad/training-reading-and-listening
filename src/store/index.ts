import { Select } from "easy-peasy";

import app, { IAppStore } from './app.store';
import tasks, { ITasksStore } from './tasks.store';
import player, { IPlayerStore } from './player.store';
import { getTaskById } from './selectors';

export interface IStore {
  app: IAppStore,
  tasks: ITasksStore,
  player: IPlayerStore,
  getTaskById: Select<IStore>,
}

export default {
  app,
  tasks,
  player,
  // 👇 selectors
  getTaskById,
}
