import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlog, reset } from "../redux/features/Blog/BlogSlice";

const BlogPage = () => {
  let navigate = useNavigate();
  let { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.Blog
  );
  let { user } = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  let id = useId();
  let [blogData, setBlogData] = useState({
    title: "",
    body: "",
  });
  let handleChange = (e) => {
    setBlogData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogData);
    dispatch(createBlog(blogData));
    navigate("/");
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }

    return () => dispatch(reset());
  }, [isError, isSuccess, dispatch, message, isLoading, user, navigate]);
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
        <button>save</button>
      </form>
    </div>
  );
};

export default BlogPage;
