class Store {
  constructor() {
    if (Store._instance) {
      return Store._instance;
    }
    Store._instance = this;

    this.store = {};
    this.reducers = {};
    this.listeners = [];
  }

  get store() {
    return this.store;
  }

  dispatch(action) {}

  combineReducers() {}

  subscribe(listener) {
    this.listeners.push(listener);

    // return unsubscribe callback
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  static createStore() {}
}
