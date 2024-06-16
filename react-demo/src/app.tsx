import "./app.css";
import { StoreProvider } from "../../src/react/store_provider";
import store from "./store/store";
import { useSelector } from "../../src/react/hooks/useSelector";
import { useDispatch } from "../../src/react/hooks/useDispatch";
import { useState } from "preact/hooks";
import { userActions } from "./store/user_slice";

function Inner() {
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p>First Name</p>
        <input
          value={firstName}
          onInput={(e) => setFirstName(e.currentTarget.value)}
        ></input>
        <button onClick={() => dispatch(userActions.setFirstName(firstName))}>
          Update First Name
        </button>
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
