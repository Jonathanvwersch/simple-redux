import Slice from "../../../slice";
import { StoreState } from "../../../types";

const slice = new Slice();

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};

const userSlice = slice.create({ name: "user", initialState, reducers: {} });
const userReducer = userSlice.reducers;
const userInitialState = userSlice.initialState;

export { userReducer, userInitialState };
