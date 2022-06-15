import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Categories from "./pages/admin/categories";
import CreateCategory from "./pages/admin/categories/create";

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*admin*/}
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/categories/create" element={<CreateCategory />} />

        {/*user*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
