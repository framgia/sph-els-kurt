import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchUserCategoryAnswers, storeAnswer } from "actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";

import AppLayout from "components/layouts/AppLayout";
import NotFound from "pages/404";
import Loading from "../../components/Loading";

const ResultLesson = () => {
  const lesson = useSelector((state) => state.categories);
  const answers = useSelector((state) => state.answers);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lessonId } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(lessonId));
    dispatch(fetchUserCategoryAnswers(auth.user.data.id, lessonId));
  }, [dispatch, lessonId]);

  if (!answers.data) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  const correctAnswers = answers.data?.filter((answer) => answer.correct);

  const renderLesson = () => {
    if (!lesson.data || !lesson.data.words) {
      return <Loading />;
    }

    return (
      <div className="mt-5 bg-white ">
        <div className="-ml-4 -mt-4 px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {lesson.data.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {lesson.data.description}
            </p>
          </div>
          <div className="font-bold text-lg">
            Result: {correctAnswers.length} / {lesson.data.words.length}
          </div>
        </div>
        <div className="-ml-4 -mt-4 px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="ml-4 mt-4">
            <h2 className="text-3xl leading-6 font-medium text-gray-900 mb-8 text-center">
              Summary Results
            </h2>

            <div className="flex flex-wrap -mx-2 justify-around">
              <div>
                <h3 className="text-sm leading-6 font-medium uppercase text-gray-600 mb-2 underline text-center">
                  Words
                </h3>
                {lesson.data.words.map((lesson, index) => {
                  return (
                    <div key={index} className="px-2 py-2 m-2 text-center">
                      {lesson.name}
                    </div>
                  );
                })}
              </div>
              <div>
                <h3 className="text-sm leading-6 font-medium uppercase text-gray-600 mb-2 underline text-center">
                  Correct Answer
                </h3>
                {answers.data.map((answer, index) => {
                  return (
                    <div key={index} className="px-2 py-2 m-2 text-center">
                      {answer.correct_choice}
                    </div>
                  );
                })}
              </div>
              <div>
                <h3 className="text-sm leading-6 font-medium uppercase text-gray-600 mb-2 underline text-center">
                  Your Answers
                </h3>
                {answers.data.map((answer, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        answer.correct ? "bg-green-100" : "bg-red-100"
                      } px-2 py-2 rounded-lg m-2 text-center`}
                    >
                      {answer.choice}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
          <Link
            to={`/lessons/${lessonId}`}
            className="font-semibold text-xl text-gray-400 leading-tight"
          >
            {lesson.data.name}
          </Link>
          <ChevronRightIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Result
          </h2>
        </div>
      }
    >
      {renderLesson()}
    </AppLayout>
  );
};

export default ResultLesson;
