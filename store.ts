type State = Record<string, any>;
type ActionPayload = any;
type Action = { type: string; payload: ActionPayload };
type Reducer = (state: State, action: Action) => State;
type Listeners = Array<() => void>;
type Reducers = Record<string, Reducer>;

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

  dispatch(key: string, action: Action) {
    if (!this.reducers[key]) {
      return;
    }

    const reducer = this.reducers[key];
    const previousStateForKey = this.state[key] || {};
    const newStateForKey = reducer(previousStateForKey, action);

    this.state[key] = newStateForKey;
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

    // return unsubscribe callback
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  configureStore(initialState: State, reducers: Reducers) {
    const store = new Store(initialState);
    store.combineReducers(reducers);
    return store;
  }
}
