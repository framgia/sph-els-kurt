import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { ArrowNarrowLeftIcon, SaveIcon } from "@heroicons/react/solid";
import { fetchUser, updateUser } from "actions";
import AppLayout from "components/layouts/AppLayout";
import ValidationErrors from "components/ValidationErrors";
import SuccessMessage from "components/SuccessMessage";

import NotFound from "pages/404";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  const onSubmitForm = async (formObject) => {
    const formData = new FormData();

    formData.append("_method", "PATCH");

    if (formObject.hasOwnProperty("avatar")) {
      formData.append("avatar", formObject.avatar[0]);
    }

    for (let key in formObject) {
      formData.append(key, formObject[key]);
    }

    await dispatch(updateUser(auth.user.data.id, formData));
  };

  useEffect(() => {
    dispatch(fetchUser(auth.user.data.id));
  }, [dispatch]);

  const renderForm = () => {
    if (user.errors?.message) {
      return <NotFound />;
    }

    return (
      <AppLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit Profile
          </h2>
        }
      >
        <div className="px-0">
          <button
            type="button"
            onClick={() => navigate(`/profile/${auth.user.data.id}`)}
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
          onSubmit={(values, event) => {
            onSubmitForm(values, event);
          }}
          initialValues={{
            name: user.data.name,
            email: user.data.email,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = "Name is required";
            }

            if (!values.email) {
              errors.email = "Email is required";
            }

            if (values.password !== values.password_confirmation) {
              errors.password =
                "Password and password confirmation do not match";
            }

            if (values.password?.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }
            return errors;
          }}
        >
          {({ handleSubmit, pristine, submitting }) => (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-8 divide-y divide-gray-200"
              encType="multipart/form-data"
            >
              <div className="mb-0">
                {user.errors && (
                  <ValidationErrors className="mb-2" errors={user.errors} />
                )}
                {user.message && (
                  <SuccessMessage className="mb-2" message={user.message} />
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

                  <Field name="email">
                    {(field) => (
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>

                        <input
                          {...field.input}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
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

                  <Field name="avatar" type="file">
                    {({ input: { value, onChange, ...input } }) => (
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="avatar"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Avatar
                        </label>

                        {user.data.avatar && (
                          <img
                            className={`w-16 h-auto rounded-full mb-2`}
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              user.data.avatar
                            }
                            alt="avatar"
                          />
                        )}

                        <input
                          {...input}
                          onChange={({ target }) => onChange(target.files)}
                          className="shadow-sm py-2 px-2 focus:ring-indigo-500 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="password">
                    {(field) => (
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>

                        <input
                          {...field.input}
                          id="password"
                          name="password"
                          type="password"
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

                  <Field name="password_confirmation">
                    {(field) => (
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="password_confirmation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password confirmation
                        </label>

                        <input
                          {...field.input}
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          autoComplete="password_confirmation"
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

export default EditProfile;
