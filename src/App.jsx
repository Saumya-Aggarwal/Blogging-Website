import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, Loader } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for an active Appwrite session
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));  // User is authenticated
        } else {
          dispatch(logout());  // No active session
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        dispatch(logout());  // Handle errors with logout
      })
      .finally(() => {
        setLoading(false);  // Remove loader after session check
      });
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main>{loading ? <Loader /> : <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default App;
