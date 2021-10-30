import { ACTION_TYPE } from "../../services/constants/Index";
export const initialState = {
  userData: {},
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SIGNUP:
      return {
        ...state,
        userData: action.payload,
      };
    case ACTION_TYPE.LOGIN:
      localStorage.setItem("token", action.payload.data.data.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.data.data.data)
      );

      return {
        ...state,
        userData: action.payload.data.data.data,
      };
    case ACTION_TYPE.MATCHTOKEN:
      console.log("match token reducer", action.payload.data.data);
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("user", JSON.stringify(action.payload.data.data));

      return {
        ...state,
        userData: action.payload.data.data,
      };

    default:
      return state;
  }
};
