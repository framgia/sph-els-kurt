import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";

import AppLayout from "components/layouts/AppLayout";
import NotFound from "pages/404";
import { fetchCategory } from "slices/categories";

const Lesson = () => {
  const lesson = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lessonId } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(lessonId));
  }, [dispatch, lessonId]);

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
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start answering
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Lessons
        </h2>
      }
    >
      <div className="px-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
          <ArrowNarrowLeftIcon
            className="ml-3 -mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>

      {renderLesson()}
    </AppLayout>
  );
};

export default Lesson;
