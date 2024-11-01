import React, { useState } from "react";
import { login as storeLogin } from "../store/authSlice";
import { Input } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { error, setError } = useState();
    async function createAccount(data) {
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session){
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
      class="vh-100 bg-image"
      style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');"
    >
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px;">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form  onSubmit={handleSubmit(createAccount)}>
                    <div data-mdb-input-init class="form-outline mb-4">
                      <Input
                        type="text"
                        label = " Your Full Name"
                        class=" form-control-lg"
                      />
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
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

                    <div data-mdb-input-init class="form-outline mb-4">
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

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label class="form-check-label" for="form2Example3g">
                        I agree all statements in{" "}
                        <a href="#!" class="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to={"/login"} class="fw-bold text-body">
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
