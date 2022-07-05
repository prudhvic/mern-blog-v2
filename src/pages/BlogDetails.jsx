import React, { useState } from "react";
import {
  getAllComments,
  getBlog,
  PostComment,
  deleteComment,
} from "../redux/features/Blog/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const BlogDetails = () => {
  let [comment, setComment] = useState("");
  let navigate = useNavigate();
  let { id } = useParams();
  let dispatch = useDispatch();
  let { blogs, comments, blog } = useSelector((state) => state.Blog);

  let handleSubmit = (e) => {
    e.preventDefault();

    dispatch(PostComment({ text: comment, id }));
    setComment("");
  };
  console.log(comments);
  let fetchComments = () => {
    dispatch(getAllComments(id));
  };
  useEffect(() => {
    dispatch(getBlog(id));
    fetchComments();
  }, [id]);
  return (
    <div className="details">
      <div className="content">
        <h2>{blog?.title}</h2>
        <p>{blog?.body}</p>
        <blockquote> written by {blog?.author}</blockquote>
        <button onClick={() => navigate(`/blogs/${blog._id}/update`)}>
          update
        </button>
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <div>
          <label htmlFor="comment">Add Comments</label>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button>save comments</button>
      </form>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <button onClick={() => dispatch(deleteComment(comment._id))}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
