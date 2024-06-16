import Slice from "../../../src/slice";
import { Action } from "../../../src/types";

const slice = new Slice();

type InitialState = { firstName: string; lastName: string; email: string };

const initialState: InitialState = {
  firstName: "",
  lastName: "",
  email: "",
};

const userSlice = slice.create({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state: InitialState, action: Action) => {
      return { ...state, firstName: action.payload };
    },
  },
});

const userReducer = userSlice.reducers;
const userInitialState = userSlice.initialState;
const userActions = userSlice.actions;
export { userReducer, userInitialState, userActions };
