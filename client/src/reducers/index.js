import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import followersReducer from "./followersReducer";
import followingReducer from "./followingReducer";

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  followers: followersReducer,
  following: followingReducer,
});
