import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUser,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
  fetchUserAnswers,
} from "actions";
import AppLayout from "components/layouts/AppLayout";
import Loading from "components/Loading";

const Profile = () => {
  let { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const followers = useSelector((state) => state.followers);
  const following = useSelector((state) => state.following);
  const auth = useSelector((state) => state.auth);
  const answers = useSelector((state) => state.answers);

  const wordsLearned = answers.data.filter((answer) => answer.correct === 1);

  const categoriesLearned = answers.data
    .filter((answer) => answer.correct === 1)
    .map((answer) => answer.category_id)
    .filter((category, index, array) => array.indexOf(category) === index);

  const follow = (id) => {
    dispatch(followUser(id));

    navigate("/");
  };

  const unfollow = (id) => {
    dispatch(unfollowUser(id));

    navigate("/");
  };

  const stats = [
    { name: "Following", url: "following", stat: following.data?.length },
    { name: "Followers", url: "followers", stat: followers.data?.length },
    { name: "Words Learned", url: "words", stat: wordsLearned.length },
    { name: "Lessons Learned", url: "lessons", stat: categoriesLearned.length },
  ];

  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchFollowers(userId));
    dispatch(fetchFollowing(userId));
    dispatch(fetchUserAnswers(userId));
  }, [dispatch, userId, navigate]);

  if (!user.data || !followers.data || !following.data || !auth) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
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
  console.log(categoriesLearned);
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
                src={`https://i.pravatar.cc/150?img=${user.data.id}`}
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
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          {renderFollowButton()}
        </div>
      </div>
      <div>
        <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-2 py-2 bg-white shadow rounded-lg overflow-hidden sm:p-4 cursor-pointer"
              onClick={() => {
                setTitle(item.name);
              }}
            >
              <dt className="text-xs font-medium text-gray-500 truncate uppercase tracking-tight">
                {item.name}
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {title !== "" && (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 drop-shadow-md max-w-xl mt-4 mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <ul role="list" className="divide-y divide-gray-200">
            {title === "Following" &&
              following.data?.map((person) => (
                <li key={person.email} className="py-4 flex">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://i.pravatar.cc/150?img=${person.id}`}
                    alt=""
                  />
                  <div className="ml-3">
                    <Link
                      to={`/profile/${person.id}`}
                      className="text-sm font-medium text-gray-900"
                    >
                      {person.name}
                    </Link>
                    <p className="text-sm text-gray-500">{person.email}</p>
                  </div>
                </li>
              ))}
            {title === "Followers" &&
              followers.data?.map((person) => (
                <li key={person.email} className="py-4 flex">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://i.pravatar.cc/150?img=${person.id}`}
                    alt=""
                  />
                  <div className="ml-3">
                    <Link
                      to={`/profile/${person.id}`}
                      className="text-sm font-medium text-gray-900"
                    >
                      {person.name}
                    </Link>
                    <p className="text-sm text-gray-500">{person.email}</p>
                  </div>
                </li>
              ))}
            {title === "Words Learned" &&
              wordsLearned.map((word, wordIdx) => (
                <li key={wordIdx} className="py-4">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {word.choice}
                    </p>
                  </div>
                </li>
              ))}
            {title === "Lessons Learned" &&
              categoriesLearned.map((category, wordIdx) => (
                <li key={wordIdx} className="py-4">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {category}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </AppLayout>
  );
};

export default Profile;
