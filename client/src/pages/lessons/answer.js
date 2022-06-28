import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchUserCategoryAnswers, storeAnswer } from "actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowNarrowRightIcon, ChevronRightIcon } from "@heroicons/react/solid";

import AppLayout from "components/layouts/AppLayout";
import NotFound from "pages/404";
import Loading from "../../components/Loading";
import ValidationErrors from "../../components/ValidationErrors";
import SuccessMessage from "../../components/SuccessMessage";

const AnswerLesson = () => {
  const lesson = useSelector((state) => state.categories);
  const answers = useSelector((state) => state.answers);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCategory(lessonId));
    dispatch(fetchUserCategoryAnswers(auth.user.data.id, lessonId));
  }, [dispatch, lessonId]);

  const renderLesson = () => {
    if (answers?.data?.length === lesson.data.words?.length) {
      navigate(`/404`);
    }

    if (wordIndex >= lesson.data.words?.length) {
      return <NotFound />;
    }

    if (!lesson.data || !lesson.data.words) {
      return <Loading />;
    }

    if (lesson.errors?.message) {
      return <NotFound />;
    }

    return (
      <div className="mt-5 bg-white ">
        <div className="-ml-4 -mt-4 px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {lesson.data.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {lesson.data.description}
            </p>
          </div>
        </div>
        <div className="-ml-4 -mt-4 px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="ml-4 mt-4">
            <h2 className="text-3xl leading-6 font-medium text-gray-900 mb-2 text-center">
              {lesson.data.words[wordIndex].name}
            </h2>
            <p className="text-sm text-gray-500 text-center">
              {wordIndex + 1}/{lesson.data.words.length}
            </p>
            <Form
              onSubmit={(values) => {
                dispatch(storeAnswer(values));
                setWordIndex(wordIndex + 1);
              }}
              validate={(values) => {
                const errors = {};

                if (!values.choice_id) {
                  errors.choice = "Required";
                }

                return errors;
              }}
            >
              {({ handleSubmit, pristine, submitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className="mt-4 space-y-8 divide-y divide-gray-200 max-w-2xl mx-auto"
                >
                  <div className="divide-y divide-gray-200">
                    {lesson.errors && (
                      <ValidationErrors
                        className="mb-2"
                        errors={lesson.errors}
                      />
                    )}
                    {lesson.message && (
                      <SuccessMessage
                        className="mb-2"
                        message={lesson.message}
                      />
                    )}

                    {lesson.data.words[wordIndex].choices.map((choice) => {
                      return (
                        <Field
                          name="choice_id"
                          type="radio"
                          key={choice.id}
                          value={choice.id}
                        >
                          {(field) => (
                            <div
                              className="relative flex items-start py-4 cursor-pointer"
                              onClick={() => {
                                field.input.onChange(choice.id);
                              }}
                            >
                              <div className="min-w-0 flex-1 text-sm">
                                <label
                                  htmlFor={choice.id}
                                  className="inline-flex items-center"
                                >
                                  {choice.name}
                                </label>
                              </div>
                              <div className="ml-3 flex items-center h-5">
                                <input
                                  {...field.input}
                                  name="choice_id"
                                  id="choice"
                                  className="form-radio h-4 w-4 text-indigo-600"
                                  onChange={() => {
                                    field.input.onChange(choice.id);
                                  }}
                                />
                              </div>
                              {field.meta.touched && field.meta.error && (
                                <span className="ml-2 text-red-600 text-xs">
                                  {field.meta.error}
                                </span>
                              )}
                            </div>
                          )}
                        </Field>
                      );
                    })}
                    <button
                      type="submit"
                      className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={pristine || submitting}
                    >
                      Submit
                      <ArrowNarrowRightIcon
                        className="ml-3 -mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </form>
              )}
            </Form>
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
            Answer
          </h2>
        </div>
      }
    >
      {renderLesson()}
    </AppLayout>
  );
};

export default AnswerLesson;
