import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchUserCategoryAnswers } from "actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowNarrowLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import AppLayout from "components/layouts/AppLayout";
import NotFound from "pages/404";
import Loading from "../../components/Loading";

const Lesson = () => {
  const lesson = useSelector((state) => state.categories);
  const auth = useSelector((state) => state.auth);
  const answers = useSelector((state) => state.answers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lessonId } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(lessonId));
    dispatch(fetchUserCategoryAnswers(auth.user.data.id, lessonId));
  }, [dispatch, lessonId]);

  if (!lesson.data || !lesson.data.words) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  const renderAnswerButton = () => {
    if (answers.data.length !== lesson.data.words?.length) {
      return (
        <Link
          to={`/lessons/${lessonId}/answer`}
          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start answering
        </Link>
      );
    } else {
      return (
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-400 bg-white hover:bg-gray-50 cursor-not-allowed"
          disabled
        >
          Answered
        </button>
      );
    }
  };

  const renderLesson = () => {
    if (lesson.errors?.message) {
      return <NotFound />;
    }

    return (
      <div className="mt-5 bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {lesson.data.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {lesson.data.description}
            </p>
          </div>

          <div className="ml-4 mt-4 flex-shrink-0">{renderAnswerButton()}</div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout
      header={
        <div className="flex items-center">
          <Link
            to="/lessons"
            className="font-semibold text-xl text-gray-400 leading-tight"
          >
            Lessons
          </Link>
          <ChevronRightIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {lesson.data.name}
          </h2>
        </div>
      }
    >
      {renderLesson()}
    </AppLayout>
  );
};

export default Lesson;
