import { FOLLOW_USER, GET_FOLLOWING, UNFOLLOW_USER } from "actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FOLLOWING:
      return { ...state, data: action.payload.data };
    case FOLLOW_USER:
      return { ...state, data: action.payload.data };
    case UNFOLLOW_USER:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
