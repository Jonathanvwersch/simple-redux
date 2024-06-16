import Store from "../../../src/store";
import { userInitialState, userReducer } from "./user_slice";

export const store = new Store();
const reducers = { user: userReducer };
const initialState = { user: userInitialState };
const configuredStore = store.configure({ reducers, initialState });

export default configuredStore;
