import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "./index";
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return <Loader></Loader>;  //If authentication = true: Only logged-in users should access; logged-out users get redirected to "/login".
                               // If authentication = false: Only logged-out users should access; logged-in users get redirected to "/".
  }

  return <div>{children}</div>;
}
