import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "components/layouts/AppLayout";
import Loading from "components/Loading";
import { fetchUsers } from "actions";

const Profiles = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!users.data || !users.data.length) {
    return <Loading />;
  }

  const filteredUsers = users.data.filter((user) => {
    return user.id !== auth.user.data.id;
  });

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profiles
        </h2>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredUsers.map((user) => (
          <Link
            to={`/profile/${user.id}`}
            key={user.email}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={process.env.REACT_APP_BACKEND_URL + user.avatar}
                alt=""
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
};

export default Profiles;
