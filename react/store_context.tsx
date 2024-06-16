import { createContext, ReactNode } from "react";
import Store from "../store";

export const StoreContext = createContext<Store | undefined>(undefined);
