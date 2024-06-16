import { createContext } from "preact";
import Store from "../store";

export const StoreContext = createContext<Store | undefined>(undefined);
