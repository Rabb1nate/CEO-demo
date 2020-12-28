import {SET_USER_ID} from "./constants";

export const setUserId = userId => ({
  type: SET_USER_ID,
  payload: userId
})
