import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top mt-auto footer bg-body-tertiary">
      <div className="col-md-4 d-flex align-items-center" bis_skin_checked="1">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        >
          
        </a>
        <span className="mb-3 mb-md-0 text-body-secondary">
          © 2024 Company, Inc
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-4">
        <li className="ms-3">
          <a className="text-body-secondary" href="#">
            <FaTwitter       style={{ width: "2rem", height: "2rem" }}
            />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-body-secondary" href="#">
          <FaSquareInstagram  style={{ width: "2rem", height: "2rem" }}/>

          </a>
        </li>
        <li className="ms-3">
          <a className="text-body-secondary" href="#">
          <FaFacebook  style={{ width: "2rem", height: "2rem" }}/>

          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
