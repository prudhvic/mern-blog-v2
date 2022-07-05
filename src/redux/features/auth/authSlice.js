import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export let register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      let response = await axios.post(
        "https://mern-blog-v2.herokuapp.com/api/auth/user/register",
        { ...user }
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
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
export let login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    let response = await axios.post(
      "https://mern-blog-v2.herokuapp.com/api/auth/user/login",
      {
        ...user,
      }
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export let logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await localStorage.removeItem("user");
});
let authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    reset: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export let { reset } = authSlice.actions;
export default authSlice.reducer;
