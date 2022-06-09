import Navigation from "components/layouts/Navigation";
import { useSelector } from "react-redux";

const AppLayout = ({ header, children }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="min-h-full">
      <Navigation user={auth.user} />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
