import React from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllBlogs,
  reset,
  deleteBlog,
} from "../redux/features/Blog/BlogSlice";

const Blogs = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { blogs, isLoading, isError, message } = useSelector(
    (state) => state.Blog
  );
  let { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("Hi");
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }

    return () => dispatch(reset());
  }, [isError, message]);
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  if (blogs.length === 0) {
    return <h3 className="center">No blogs you want to create one</h3>;
  }
  let handle_delete = (id) => {
    dispatch(deleteBlog(id));
  };
  return (
    <div className="blogs">
      {blogs &&
        blogs?.map((blog) => (
          <div key={blog._id} className="blog">
            {blog.author == user?.username && (
              <button
                className="delete-btn"
                onClick={() => handle_delete(blog._id)}
              >
                <FaTimes />
              </button>
            )}
            <img
              alt="blog"
              src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-4480.jpg?size=626&ext=jpg&ga=GA1.2.1570384650.1651304523"
            />
            <div>
              <h2>{blog.title}</h2>
              <h3>{new Date(blog.createdAt).toLocaleDateString()}</h3>
              <p>{blog.body.slice(0, 100)}</p>
              <Link to={`/blogs/${blog._id}`}>Read More</Link>
              <blockquote>written by {blog.author}</blockquote>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
