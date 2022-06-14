import { GET_USER, GET_USERS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, data: action.payload.data };
    case GET_USER:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
