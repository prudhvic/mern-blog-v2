import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../redux/features/auth/authSlice";
import { FaSignInAlt, FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  return (
    <header>
      <h1>
        <Link to="/">Blogger</Link>
      </h1>
      <nav>
        <ul>
          {!user && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/login"
                >
                  <FaSignInAlt />
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/register"
                >
                  <FaUserAlt />
                  Register
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(reset());
                    navigate("/");
                  }}
                >
                  logout
                </button>
              </li>
              <li>
                <NavLink
                  to="/blogs/create"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  create blog
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
