import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUser,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
  fetchActivityLogs,
} from "actions";
import AppLayout from "components/layouts/AppLayout";
import Loading from "components/Loading";
import ActivityLog from "../../components/ActivityLog";

const Profile = () => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const followers = useSelector((state) => state.followers);
  const following = useSelector((state) => state.following);
  const auth = useSelector((state) => state.auth);
  const activities = useSelector((state) => state.activity_logs);

  const follow = (id) => {
    dispatch(followUser(id));

    navigate("/");
  };

  const unfollow = (id) => {
    dispatch(unfollowUser(id));

    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchFollowers(userId));
    dispatch(fetchFollowing(userId));
    dispatch(fetchActivityLogs(userId));
  }, [dispatch, userId]);

  if (
    !user.data ||
    !followers.data ||
    !following.data ||
    !auth ||
    !activities.data
  ) {
    return <Loading />;
  }

  if (user.is_admin === 1) {
    navigate("/404");
  }

  const renderFollowButton = () => {
    const isFound = followers.data.some((element) => {
      if (element.id === auth.user.data.id) {
        return true;
      }
      return false;
    });

    if (isFound) {
      return (
        <button
          onClick={() => unfollow(user.data.id)}
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500"
        >
          Unfollow
        </button>
      );
    }

    if (auth.user.data.id !== user.data.id) {
      return (
        <button
          onClick={() => follow(user.data.id)}
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          Follow
        </button>
      );
    }
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.data.name}
            </h1>
            <div className="text-sm font-medium text-gray-500">
              <div className="mr-4">Following: {following.data.length}</div>
              <div className="mr-4">Followers: {followers.data.length}</div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          {renderFollowButton()}
        </div>
      </div>
      <ActivityLog activities={activities} />
    </AppLayout>
  );
};

export default Profile;
