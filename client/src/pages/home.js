import AppLayout from "components/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchActivityLogs,
  fetchFollowers,
  fetchFollowing,
  fetchUser,
} from "actions";
import Loading from "components/Loading";
import ActivityLog from "components/ActivityLog";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const followers = useSelector((state) => state.followers);
  const following = useSelector((state) => state.following);
  const auth = useSelector((state) => state.auth);
  const activities = useSelector((state) => state.activity_logs);

  useEffect(() => {
    dispatch(fetchUser(auth.user.data.id));
    dispatch(fetchFollowers(auth.user.data.id));
    dispatch(fetchFollowing(auth.user.data.id));
    dispatch(fetchActivityLogs(auth.user.data.id));
  }, [dispatch]);

  if (
    !user.data ||
    !followers.data ||
    !following.data ||
    !auth ||
    !activities.data
  ) {
    return <Loading />;
  }

  const renderProfileSection = () => {
    return (
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
      </div>
    );
  };
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      {renderProfileSection()}
      <ActivityLog activities={activities} />
    </AppLayout>
  );
};

export default Home;
