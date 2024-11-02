import React, { useState } from "react";
import { login as storeLogin } from "../../store/authSlice";
import { Input } from "../index";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  async function login(data) {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
          console.log(userData);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>
                  <form onSubmit={handleSubmit(login)}>
                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4 text-start"
                    >
                      <Input
                        type="email"
                        className="form-control-lg"
                        label=" Email"
                        placeholder="Enter Your Email..."
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4 text-start"
                    >
                      <Input
                        type="password"
                        id="typePasswordX"
                        className="form-control-lg"
                        label="Password"
                        placeholder="Enter your Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      {error && (
                        <p className="text-danger text-center">{error}</p>
                      )}
                    </p>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to={"/sign-up"} className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
