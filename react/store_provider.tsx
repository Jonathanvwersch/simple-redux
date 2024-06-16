import React from "react";
import { StoreContext } from "./store_context";
import Store from "../store";

type Props = {
  children: React.ReactNode;
  store: Store;
};

export const StoreProvider = ({ children, store }: Props) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
