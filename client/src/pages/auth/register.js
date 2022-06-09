import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "actions";
import ValidationErrors from "components/ValidationErrors";
import GuestLayout from "components/layouts/GuestLayout";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isSignedIn) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <GuestLayout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h3 className="text-xl leading-6 font-medium text-gray-900">
              Register
            </h3>

            <ValidationErrors className="mb-4" errors={auth.errors} />

            <Form
              onSubmit={(values) => {
                dispatch(signUp(values));
              }}
              validate={(values) => {
                const errors = {};

                if (!values.name) {
                  errors.name = "Name is required.";
                }
                if (!values.email) {
                  errors.email = "Email address is required.";
                }

                if (!values.password) {
                  errors.password = "Password is required.";
                }

                if (!values.password_confirmation) {
                  errors.password_confirmation =
                    "Password confirmation is required.";
                }

                if (values.password !== values.password_confirmation) {
                  errors.password_confirmation =
                    "Password confirmation does not match.";
                }

                return errors;
              }}
            >
              {({ handleSubmit, pristine, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="name">
                    {(field) => (
                      <div className="mt-4">
                        <label
                          htmlFor="name"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>

                        <div className="mt-1">
                          <input
                            {...field.input}
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

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
                      <div className="mt-4">
                        <label
                          htmlFor="email"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>

                        <div className="mt-1">
                          <input
                            {...field.input}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {field.meta.touched && field.meta.error && (
                          <span className="text-red-600 text-xs">
                            {field.meta.error}
                          </span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="password">
                    {(field) => (
                      <div className="mt-4">
                        <label
                          htmlFor="password"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>

                        <div className="mt-1">
                          <input
                            {...field.input}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

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
                      <div className="mt-4">
                        <label
                          htmlFor="password-confirmation"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Password Confirmation
                        </label>

                        <div className="mt-1">
                          <input
                            {...field.input}
                            id="password-confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        {field.meta.touched && field.meta.error && (
                          <span className="text-red-600 text-xs">
                            {field.meta.error}
                          </span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={pristine || submitting}
                    >
                      Sign up
                    </button>
                  </div>

                  <div className="relative mt-4">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-sm text-gray-500">
                        Or
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      to="/login"
                      className="w-full flex justify-center items-center text-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log in
                    </Link>
                  </div>
                </form>
              )}
            </Form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Register;
