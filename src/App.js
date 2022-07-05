import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import BlogPage from "./pages/BlogPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import BlogUpdateForm from "./pages/BlogUpdateForm";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/create" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/blogs/:id/update" element={<BlogUpdateForm />} />
      </Routes>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        position="bottom-center"
      />
    </div>
  );
}

export default App;
