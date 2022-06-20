import { GET_FOLLOWING } from "actions/types";

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FOLLOWING:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
