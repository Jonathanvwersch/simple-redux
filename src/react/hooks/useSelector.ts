import { useContext } from "preact/hooks";
import { StoreContext } from "../store_context";
export const useSelector = () => {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error("useSelector must be used within a StoreContextProvider");
  }
  return store.getState();
};
