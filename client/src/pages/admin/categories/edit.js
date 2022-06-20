import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { ArrowNarrowLeftIcon, SaveIcon } from "@heroicons/react/solid";
import { fetchCategory, updateCategory } from "actions";
import AppLayout from "components/layouts/AppLayout";
import ValidationErrors from "components/ValidationErrors";
import SuccessMessage from "components/SuccessMessage";

import NotFound from "pages/404";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.categories);

  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(categoryId));
  }, [categoryId, dispatch]);

  const renderForm = () => {
    if (category.errors) {
      return <NotFound />;
    }

    return (
      <AppLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit Category
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

        <Form
          onSubmit={(values) => {
            dispatch(updateCategory(categoryId, values));
          }}
          initialValues={{
            name: category.data.name,
            description: category.data.description,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = "Name is required";
            }

            if (!values.description) {
              errors.description = "Description is required";
            }
            return errors;
          }}
        >
          {({ handleSubmit, pristine, submitting }) => (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-8 divide-y divide-gray-200"
            >
              <div className="mb-0">
                {category.errors && (
                  <ValidationErrors className="mb-2" errors={category.errors} />
                )}
                {category.message && (
                  <SuccessMessage className="mb-2" message={category.message} />
                )}

                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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

                  <Field name="description">
                    {(field) => (
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>

                        <textarea
                          {...field.input}
                          id="description"
                          name="description"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
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
                    <SaveIcon
                      className="ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </form>
          )}
        </Form>
      </AppLayout>
    );
  };

  return renderForm();
};

export default EditCategory;
