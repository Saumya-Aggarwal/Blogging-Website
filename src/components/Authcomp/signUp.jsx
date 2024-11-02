import React, { useState } from "react";
import { login as storeLogin } from "../../store/authSlice";
import { Input } from "../index";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [ error, setError ] = useState(" ");
  async function createAccount(data) {
    setError(" ");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <section
      className="vh-100 bg-image gradient-custom mb-5 "
      // style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3 ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 ">
              <div className="card bg-dark text-white" style={{borderRadius: "15px"}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit(createAccount)}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <Input
                        type="text"
                        label=" Your Full Name"
                        className=" form-control-lg"
                        placeholder = "Your Name"
                        {...register ("name",{
                          required: true,
                        })}
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
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

                    <div data-mdb-input-init className="form-outline mb-4">
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

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in{" "}
                        <a href="#!" className="text-body text-white-50 fw-bold">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center mt-4 mb-0">
                      Have already an account?{" "}
                      <Link to={"/login"} className="text-white-50 fw-bold">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
