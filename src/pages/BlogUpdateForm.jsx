import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateBlog, reset } from "../redux/features/Blog/BlogSlice";
const BlogUpdateForm = () => {
  let navigate = useNavigate();
  let { isError, isSuccess, message, isLoading, blog } = useSelector(
    (state) => state.Blog
  );
  let { user } = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  let id = useId();
  let [blogData, setBlogData] = useState({
    title: blog.title,
    body: blog.body,
  });
  let handleChange = (e) => {
    setBlogData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogData);
    dispatch(updateBlog({ ...blogData, id: blog._id }));
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div className="container blog-form">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor={`title-${id}`}>Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor={`body-${id}`}>body</label>
          <textarea
            type="text"
            name="body"
            value={blogData.body}
            onChange={handleChange}
          />
        </div>
        <button>update</button>
      </form>
    </div>
  );
};

export default BlogUpdateForm;
