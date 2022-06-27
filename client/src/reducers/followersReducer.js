import { FOLLOW_USER, GET_FOLLOWERS, UNFOLLOW_USER } from "actions/types";

const INITIAL_STATE = {
  data: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return { ...state, data: action.payload.data };
    case FOLLOW_USER:
      return { ...state, data: action.payload.data };
    case UNFOLLOW_USER:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.data.id),
      };
    default:
      return state;
  }
};
