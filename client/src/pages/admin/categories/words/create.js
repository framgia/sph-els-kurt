import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "components/layouts/AppLayout";
import { Link, useParams } from "react-router-dom";
import ValidationErrors from "components/ValidationErrors";
import SuccessMessage from "components/SuccessMessage";
import { ChevronRightIcon, SaveIcon } from "@heroicons/react/solid";
import { storeWord } from "actions";

const CreateWords = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  const { categoryId } = useParams();

  return (
    <AppLayout
      header={
        <div className="flex items-center">
          <Link
            to="/admin/categories"
            className="font-semibold text-xl text-gray-400 leading-tight"
          >
            Categories
          </Link>
          <ChevronRightIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Link
            to={`/admin/categories/${categoryId}/words`}
            className="font-semibold text-xl text-gray-400 leading-tight"
          >
            Words
          </Link>
          <ChevronRightIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create a Word
          </h2>
        </div>
      }
    >
      <Form
        onSubmit={(values) => {
          dispatch(storeWord(values));
        }}
        initialValues={{
          category_id: categoryId,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Name is required";
          }

          if (!values.category_id) {
            errors.name = "Name is required";
          }

          return errors;
        }}
      >
        {({ handleSubmit, pristine, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-8 divide-y divide-gray-200"
          >
            <div className="mb-0">
              {categories.errors && (
                <ValidationErrors className="mb-2" errors={categories.errors} />
              )}
              {categories.message && (
                <SuccessMessage className="mb-2" message={categories.message} />
              )}

              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <Field name="category_id">
                  {(field) => (
                    <input
                      {...field.input}
                      type="text"
                      name="category_id"
                      id="category_id"
                      className="hidden"
                    />
                  )}
                </Field>
                <Field name="name">
                  {(field) => (
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>

                      <input
                        {...field.input}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />

                      {field.meta.touched && field.meta.error && (
                        <span className="text-red-600 text-xs">
                          {field.meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={pristine || submitting}
                >
                  Save
                  <SaveIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </AppLayout>
  );
};

export default CreateWords;
