import React from "react";
import { ImBlog } from "react-icons/im";
import { Container, LogoutButton } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => {
    return state.auth.status;
  });
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();
  const navItemsBasic = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add-Posts",
      slug: "/add-posts",
      active: authStatus,
    },
  ];
  const navItemsAuth = [
    {
      name: "Logout",
      slug: "/logout",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      class: " btn btn-outline-light me-2",
      active: !authStatus,
    },
    {
      name: "Sign-Up",
      slug: "/sign-up",
      class: "btn btn-warning",
      active: !authStatus,
    },
  ];
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom text-bg-dark p-3 ">
      <div className="col-md-3 mb-2 mb-md-0 ms-3" bis_skin_checked="1">
        <a
          href="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <ImBlog style={{ width: "2rem", height: "2rem", color: "#ffc107" }} />
        </a>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        {/* <li>
          <a href="#" className="nav-link px-2 link-secondary">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            Features
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            Pricing
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            FAQs
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            About
          </a>
        </li> */}
        {navItemsBasic.map((item) =>
          item.active ? (
            <li key={item.name}>
              <Link
                to={item.slug}
                className={`nav-link px-2 ${
                  activeTab === item.name ? "link-secondary" : ""
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ) : null
        )}
      </ul>

      <div className="col-md-3 text-end me-3" bis_skin_checked="1">
        {/* <button type="button" className="btn btn-outline-light me-2">
          Login
        </button>
        <button type="button" className="btn btn-warning">
          Sign-up
        </button> */}
        {navItemsAuth.map((item) =>
          item.active ? (
            item.name === "Logout" ? (
              <LogoutButton key={item.name} />
            ) : (
              <Link to={item.slug} key={item.name} className={item.class}>
                {item.name}
              </Link> 
              //! or we can use a button and then onCLick = {()=>(navigate(item.slug))}
            )
          ) : null
        )}
      </div>
    </header>
  );
}

export default Header;
