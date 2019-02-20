import { Action } from "easy-peasy";

interface IAppState {
  isOpenListModal: boolean,
}

export interface IAppActions {
  setIsOpenListModal: Action<IAppState, boolean>,
  toggleOpenListModal: Action<IAppState, undefined>,
}

export type IAppStore = IAppState & IAppActions;

const store: IAppStore = {
  isOpenListModal: false,
  setIsOpenListModal: (state, payload) => {
    state.isOpenListModal = payload
  },
  toggleOpenListModal: (state) => {
    state.isOpenListModal = !state.isOpenListModal
  }
};

export default store;
