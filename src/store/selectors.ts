import { select } from 'easy-peasy';
import { IStore } from './index';
import { Task } from "./tasks.store";

export const getTaskById = select<IStore>(state => (id: number) => {
  const [task] = state.tasks.items.filter((item: Task) => item.id === id);
  return task;
});
