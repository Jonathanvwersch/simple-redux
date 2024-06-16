import { Action, Listeners, Reducer, Reducers, State } from "./types";

class Store {
  private static _instance: Store;
  private state: State = {};
  private reducers: Reducers = {};
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

  configure(reducers: Reducers, initialState: State = {}) {
    this.combineReducers(reducers);
    this.state = initialState;
    return this;
  }

  dispatch(action: Action) {
    const [sliceName, _] = action.type.split("/");

    if (!this.reducers[sliceName]) {
      return;
    }

    const reducer = this.reducers[sliceName];
    const previousStateForKey = this.state[sliceName] || {};
    const newStateForKey = reducer(previousStateForKey, action);

    this.state[sliceName] = newStateForKey;
    this.listeners.forEach((listener) => listener());
  }

  registerReducer(key: string, reducer: Reducer) {
    this.reducers[key] = reducer;
  }

  combineReducers(reducers: Reducers) {
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
