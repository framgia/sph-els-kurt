import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Profiles from "./pages/profile/index";
import Profile from "./pages/profile/profile";
import Categories from "./pages/admin/categories";
import CreateCategory from "./pages/admin/categories/create";
import EditCategory from "./pages/admin/categories/edit";
import Lessons from "./pages/lessons";
import Lesson from "./pages/lessons/show";

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route exact path="/profile/:userId" element={<Profile />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:lessonId" element={<Lesson />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/categories/create" element={<CreateCategory />} />
        <Route
          path="/admin/categories/:categoryId/edit"
          element={<EditCategory />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
