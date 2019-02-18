import app, { IAppStore } from './app.store';
import tasks, { ITasksStore } from './tasks.store';

export interface IStore {
  app: IAppStore
  tasks: ITasksStore
}

export default {
  app,
  tasks,
}
