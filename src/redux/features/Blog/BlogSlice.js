import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  comments: [],
  blog: {},
};
export let getAllBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (_, thunkAPI) => {
    try {
      let response = await axios.get(
        "https://mern-blog-v2.herokuapp.com/api/blogs/all"
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export let getBlog = createAsyncThunk("blog/getBlog", async (id, thunkAPI) => {
  console.log(id);
  try {
    let response = await axios.get(
      `https://mern-blog-v2.herokuapp.com/api/blogs/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export let getAllComments = createAsyncThunk(
  "blog/getAllComments",
  async (id, thunkAPI) => {
    try {
      let response = await axios.get(
        `https://mern-blog-v2.herokuapp.com/comments/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export let deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      let response = await axios.delete(
        `https://mern-blog-v2.herokuapp.com/api/blogs/${id}`,

        {
          "Content-Type": "application/json",

          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export let deleteComment = createAsyncThunk(
  "blog/deleteComment",
  async (id, thunkAPI) => {
    try {
      let response = await axios.delete(
        `https://mern-blog-v2.herokuapp.com/comments/${id}`,

        {
          "Content-Type": "application/json",

          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export let updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (blog, thunkAPI) => {
    console.log(blog);
    try {
      let response = await axios.patch(
        `https://mern-blog-v2.herokuapp.com/api/blogs/${blog.id}`,
        { ...blog },

        {
          "Content-Type": "application/json",

          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export let PostComment = createAsyncThunk(
  "blog/PostComment",
  async (comment, thunkAPI) => {
    try {
      let response = await axios.post(
        `https://mern-blog-v2.herokuapp.com/comments`,
        {
          comment: comment.text,
          id: comment.id,
        }
      );
      return response.data;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export let createBlog = createAsyncThunk(
  "blog/createBlog",
  async (blog, thunkAPI) => {
    try {
      let response = await axios.post(
        "https://mern-blog-v2.herokuapp.com/api/blogs",
        {
          ...blog,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
let BlogSlice = createSlice({
  initialState,
  name: "blog",
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.blogs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload.blogs;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.blogs.push(action.payload.blog);
        console.log(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        console.log(action.payload);
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload.id
        );
        console.log(action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        // state.blogs = state.blogs.map((blog) =>
        //   blog._id === action.payload.blog._id
        //     ? blog
        //     : { ...action.payload.blog }
        // );
        console.log(action.payload);
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(PostComment.fulfilled, (state, action) => {
        console.log(action.payload);
        state.comments.push(action.payload.newcomment);
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        console.log(action);
        state.blog = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.id
        );
      });
  },
});
export let { reset } = BlogSlice.actions;
export default BlogSlice.reducer;
