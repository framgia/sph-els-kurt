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
import Words from "./pages/admin/categories/words";
import CreateWords from "./pages/admin/categories/words/create";
import Users from "./pages/admin/users";
import EditUser from "./pages/admin/users/edit";
import EditProfile from "./pages/profile/edit";

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route exact path="/profile/:userId" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:lessonId" element={<Lesson />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/categories/create" element={<CreateCategory />} />
        <Route
          path="/admin/categories/:categoryId/edit"
          element={<EditCategory />}
        />
        <Route path="/admin/categories/:categoryId/words" element={<Words />} />
        <Route
          path="/admin/categories/:categoryId/words/create"
          element={<CreateWords />}
        />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:userId/edit" element={<EditUser />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
