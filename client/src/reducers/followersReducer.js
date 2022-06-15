import { GET_FOLLOWERS } from "actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
