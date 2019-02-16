interface IAppState {
}

interface IAppActions {
}

export type IAppStore = IAppState & IAppActions;

const store: IAppStore = {};

export default store;
