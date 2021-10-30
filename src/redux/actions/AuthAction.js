import { ACTION_TYPE, ENDPOINTS } from "../../services/constants/Index";
import Api from "../../services/utills/Axios";

export const login = (body) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STARTED" });
    const res = await Api.post(ENDPOINTS.LOGIN, body);
    await dispatch({
      type: ACTION_TYPE.LOGIN,
      payload: { data: res },
    });
    dispatch({ type: "LOADING_COMPLETED" });

    return res;
  } catch (error) {
    dispatch({ type: "LOADING_FAILURE" });
    // dispatch(handleError+(error));
  }
};
export const signUp = (body) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STARTED" });
    const res = await Api.post(ENDPOINTS.SIGNUP, body);
    dispatch({
      type: ACTION_TYPE.SIGNUP,
      payload: res.data,
    });
    return res?.data?.status;

    dispatch({ type: "LOADING_COMPLETED" });
  } catch (err) {
    dispatch({ type: "LOADING_FAILURE" });
    // dispatch(handleError(err));
  }
};
export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STARTED" });
    sessionStorage.clear();
    dispatch({
      type: ACTION_TYPE.LOGOUT_USER,
    });
    dispatch({ type: "LOADING_COMPLETED" });
  } catch (err) {
    dispatch({ type: "LOADING_FAILURE" });
    // dispatch(handleError(err));
  }
};
export const matchToken = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    // try {

    let token = localStorage.getItem("token");
    var myHeaders = new Headers(); // Currently empty
    myHeaders.append("Authorization", "Bearer" + token);

    Api.post(ENDPOINTS.MATCH_TOKEN)
      .then(async (res) => {
        if (res.data.status === false) {
          dispatch({ type: "LOGOUT_USER" });

          resolve(res?.data?.status);
        }

        await dispatch({
          type: ACTION_TYPE.MATCHTOKEN,
          payload: res.data,
        });

        resolve(res?.data?.status);
      })
      .catch((err) => {
        // dispatch(handleError(err));
        // // const history = useHistory();
        // // history.push(ROUTES.Login);
        // dispatch({ type: "LOGOUT_USER" });
      });
  });
};
