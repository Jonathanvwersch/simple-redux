import { useContext } from "preact/hooks";
import { StoreContext } from "../store_context";
import { Action } from "../../types";
export const useDispatch = () => {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error("useSelector must be used within a StoreContextProvider");
  }

  return (action: Action) => store.dispatch(action);
};
