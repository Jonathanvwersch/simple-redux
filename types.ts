export type State = Record<string, any>;
export type ActionPayload = any;
export type Action = { type: string; payload: ActionPayload };
export type Reducer = (state: State, action: Action) => State;
export type Listeners = Array<() => void>;
export type Reducers = Record<string, Reducer>;
export type Slice = { name: string; reducers: Reducers; initialState: State };
