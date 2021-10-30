import { ACTION_TYPE, ENDPOINTS } from "../../services/constants/Index";
import Api from "../../services/utills/Axios";

// Action to post a status
export const postStatus = (body) => async (dispatch) => {
  try {
    const res = await Api.post(`/post/postStatus`, body);

    await dispatch({
      type: ACTION_TYPE.POST_LIST,
      payload: { data: res.data },
    });
  } catch (error) {}
};

export const getStatus = (userId) => async (dispatch) => {
  try {
    const res = await Api.get(`/post/getFeed/${userId}`);

    await dispatch({
      type: ACTION_TYPE.POST_LIST,
      payload: { data: res.data },
    });
  } catch (error) {}
};

export const peopleList = (userId) => async (dispatch) => {
  try {
    const res = await Api.get(`/user/getPeople/${userId}`);

    await dispatch({
      type: ACTION_TYPE.PEOPLE_LIST,
      payload: { data: res.data },
    });
  } catch (error) {}
};
export const followUnFollow = (body) => async (dispatch) => {
  try {
    const res = await Api.post(`/user/follow`, body);
    return res;
  } catch (error) {}
};
