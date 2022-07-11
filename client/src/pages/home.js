import AppLayout from "../components/layouts/AppLayout";
import { useSelector } from "react-redux";
import { authSelector } from "slices/auth";

const Home = () => {
  const auth = useSelector(authSelector);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      Hello {auth.user?.data.name}
    </AppLayout>
  );
};

export default Home;
