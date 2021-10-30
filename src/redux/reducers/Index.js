import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { PostReducer } from "./PostReducer";

const appReducer = combineReducers({
  AuthReducer,
  PostReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = initialState;
  }

  return appReducer(state, action);
};
export default rootReducer;
