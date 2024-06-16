import { Action, Reducers, State } from "./types";

class Slice {
  initialState: State = {};
  reducers: Reducers = {};
  name: string = "";

  create(slice: { name: string; initialState: State; reducers: Reducers }) {
    this.reducers = slice.reducers;
    this.name = slice.name;
    this.initialState = slice.initialState;

    const actions: Record<string, (payload?: any) => Action> = {};

    // grab action from each reducer in the slice
    for (const key of Object.keys(this.reducers)) {
      actions[key] = (payload) => ({ type: `${this.name}/${key}`, payload });
    }

    return {
      reducers: this.reducers,
      name: this.name,
      initialState: this.initialState,
      actions,
    };
  }
}

export default Slice;
