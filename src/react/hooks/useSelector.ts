import { useContext, useEffect, useState } from "preact/hooks";
import { StoreContext } from "../store_context";
import { State } from "../../types";

export const useSelector = (selector: (state: State) => any) => {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error("useSelector must be used within a StoreContextProvider");
  }

  const [selectedState, setSelectedState] = useState(
    selector(store.getState())
  );

  useEffect(() => {
    const checkForUpdates = () => {
      const newState = selector(store.getState());
      if (newState !== selectedState) {
        setSelectedState(newState);
      }
    };

    const unsubscribe = store.subscribe(checkForUpdates);

    return () => {
      unsubscribe();
    };
  }, [store, selectedState, selector]);

  return selectedState;
};
