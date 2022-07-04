import { GET_ACTIVITY_LOGS } from "../actions/types";

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITY_LOGS:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};
