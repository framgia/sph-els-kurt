import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "actions";
import { Link } from "react-router-dom";

import AppLayout from "components/layouts/AppLayout";
import Loading from "components/Loading";
import NotFound from "../404";

const Lessons = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!Array.isArray(categories.data)) {
    return <Loading />;
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Lessons
        </h2>
      }
    >
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.data.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <p className="text-2xl font-semibold text-gray-900 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="pb-4 flex items-baseline sm:pb-4">
              <p className="text-sm font-medium text-gray-600 truncate">
                {item.description}
              </p>

              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    to={`/lessons/${item.id}/`}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {" "}
                    View lesson
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </AppLayout>
  );
};

export default Lessons;
