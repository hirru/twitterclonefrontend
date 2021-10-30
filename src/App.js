import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "./redux/actions/Index";
import Routes from "./Routes";
import "./App.css";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        dispatch(AuthAction.matchToken()).then((status) => {
          if (status === false) {
            dispatch({ type: "LOGOUT_USER" });
          }
        });
      }

      // else dispatch(AuthAction.logOut());
    })();
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
