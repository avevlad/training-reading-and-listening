import { Action } from "easy-peasy";

interface IAppState {
  isOpenListModal: boolean,
}

export interface IAppActions {
  setIsOpenListModal: Action<IAppState, boolean>,
}

export type IAppStore = IAppState & IAppActions;

const store: IAppStore = {
  isOpenListModal: false,
  setIsOpenListModal: (state, payload) => {
    state.isOpenListModal = payload
  }
};

export default store;
