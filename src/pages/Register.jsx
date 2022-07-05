import React, { useEffect } from "react";
import { useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Register = () => {
  let navigate = useNavigate();
  let id = useId();
  let { isError, message, user, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );
  let dispatch = useDispatch();
  let [formData, setFormData] = useState({
    username: "",
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
    dispatch(register(formData));
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
        <h2>
          <FaUserAlt /> Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor={`${id}-username`}>username</label>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              value={formData.username}
            />
          </div>
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
          <button>submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
