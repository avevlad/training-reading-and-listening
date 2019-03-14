import { Action } from "easy-peasy";

interface IKeyboardShortcuts {
  isOpen: boolean,
  set: Action<IKeyboardShortcuts, boolean>,
  toggle: Action<IKeyboardShortcuts, undefined>,
}

export interface IAppStore {
  isOpenListModal: boolean,
  setIsOpenListModal: Action<IAppStore, boolean>,
  toggleOpenListModal: Action<IAppStore, undefined>,
  keyboardShortcuts: IKeyboardShortcuts
}

const store: IAppStore = {
  isOpenListModal: false,
  setIsOpenListModal: (state, payload) => {
    state.isOpenListModal = payload
  },
  toggleOpenListModal: (state) => {
    state.isOpenListModal = !state.isOpenListModal
  },
  keyboardShortcuts: {
    isOpen: false,
    set: (state, payload) => {
      state.isOpen = payload
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen
    }
  },
};

export default store;
