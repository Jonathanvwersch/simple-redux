import {
  Action,
  Listeners,
  Reducer,
  Reducers,
  State,
  StoreReducers,
  StoreState,
} from "./types";

class Store {
  private static _instance: Store;
  private state: State = {};
  private reducers: StoreReducers = {};
  private listeners: Listeners = [];

  constructor(initialState: State = {}) {
    if (Store._instance) {
      return Store._instance;
    }
    Store._instance = this;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  configure(store: StoreState) {
    this.combineReducers(store.reducers);
    this.state = store.initialState; // Ensure this aligns with your StoreState type
    return this;
  }

  dispatch(action: Action) {
    const [sliceName, actionName] = action.type.split("/");

    if (!this.reducers[sliceName]) {
      return;
    }

    const reducer = this.reducers[sliceName][actionName];
    const stateForKey = this.state[sliceName] || {};
    const newStateForKey = reducer(stateForKey, action);
    this.state[sliceName] = newStateForKey;
    this.listeners.forEach((listener) => listener());
  }

  registerReducer(key: string, reducer: Reducers) {
    this.reducers[key] = reducer;
  }

  combineReducers(reducers: StoreReducers) {
    Object.keys(reducers).forEach((key) =>
      this.registerReducer(key, reducers[key])
    );
    return this.reducers;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export default Store;
