import { BookOpenIcon, UserIcon } from "@heroicons/react/solid";
import { classNames } from "helpers";

const ActivityLog = ({ activities }) => {
  return (
    <div className="flow-root max-w-2xl mx-auto bg-white p-8 border rounded-xl mt-8 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Activities</h3>

      <ul role="list" className="-mb-8 mt-2">
        {activities.data.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.data.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      activity.event === "learned"
                        ? "bg-blue-500"
                        : "bg-red-500",
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    {activity.event === "learned" ? (
                      <BookOpenIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <UserIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>

                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>

                  <div className="text-right text-xs whitespace-nowrap text-gray-500">
                    <time dateTime={activity.created_at}>
                      {new Date(activity.created_at).toLocaleString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
