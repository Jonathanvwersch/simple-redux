import "./app.css";
import { StoreProvider } from "../../src/react/store_provider";
import store from "./store/store";
import { useSelector } from "../../src/react/hooks/useSelector";

function Inner() {
  const { user } = useSelector();
  console.log(user.firstName);

  return (
    <>
      <div>
        <p>First Name</p>
        <div>{user.firstName}</div>
      </div>
    </>
  );
}

export function App() {
  return (
    <StoreProvider store={store}>
      <Inner />
    </StoreProvider>
  );
}
