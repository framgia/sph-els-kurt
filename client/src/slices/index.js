import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import categoriesReducer from "./categories";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  categories: categoriesReducer,
});

export default rootReducer;
