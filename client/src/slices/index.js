import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import followersReducer from "./followers";
import followingReducer from "./following";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  followers: followersReducer,
  following: followingReducer,
  categories: categoriesReducer,
});

export default rootReducer;
