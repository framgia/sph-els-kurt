import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "actions";
import AppLayout from "components/layouts/AppLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/solid";
import SuccessMessage from "components/SuccessMessage";

const Words = () => {
  const category = useSelector((state) => state.categories);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(categoryId));
  }, [dispatch, categoryId]);

  if (!auth.user?.data?.is_admin) {
    navigate("/404");
  }

  if (!category.data || !Array.isArray(category.data.words)) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Words
          </h2>
        </div>
      }
    >
      <div className="px-0">
        <Link
          to={`/admin/categories/${categoryId}/words/create`}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add word
          <PlusIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      {category.message && (
        <SuccessMessage className="mb-2" message={category.message} />
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Choices
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {category.data?.words?.map((word, wordIdx) => (
                    <tr
                      key={word.name}
                      className={wordIdx % 2 === 0 ? undefined : "bg-gray-50"}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {word.name}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        {word.choices.map((choice) => (
                          <span
                            key={choice.name}
                            className="bg-blue-100 inline-block px-2.5 py-0.5 rounded-full text-sm font-medium text-gray-700 mr-2"
                          >
                            {choice.name}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Words;
