import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";
function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   if (authStatus){
  //     dispatch()
  //   }
  // },[authStatus])
  return (
    <div className="d-flex flex-column justify-content-center mt-auto">
      <section className="py-5 bg-light text-center align-self-center w-100">
        <div className="container">
          <h1 className="display-4">Welcome to My Blog</h1>
          <p className="lead mt-3">
            Sharing insights, ideas, and stories on topics that matter to you.
          </p>
          {authStatus ? (
            <Link to={"/all-posts"} className="btn btn-primary mt-4">
              Read Latest Posts
            </Link>
          ) : (
            <Link to={"/login"}>Login to See Posts</Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
