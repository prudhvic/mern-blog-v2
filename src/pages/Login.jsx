import React from "react";
import { useId, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../redux/features/auth/authSlice";
import {FaSignInAlt} from "react-icons/fa";
const Login = () => {
  let navigate = useNavigate();
  let id = useId();
  let { isError, message, isLoading, isSuccess, user } = useSelector(
    (state) => state.auth
  );
  let dispatch = useDispatch();
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isLoading, isSuccess, navigate, message, dispatch, user]);
  return (
    <>
      <div className="container">
      <h2><FaSignInAlt/>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor={`${id}-email`}>Email</label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="form-control">
            <label htmlFor={`${id}-password`}>password</label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
