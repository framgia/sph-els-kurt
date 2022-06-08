import AppLayout from "../components/layouts/AppLayout";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth);

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
