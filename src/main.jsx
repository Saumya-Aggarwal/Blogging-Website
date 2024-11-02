import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  AddPostPage,
  AllPostPage,
  EditPostPage,
  LoginPage,
  MyPostPage,
  SignUpPage,
  PostPage,
} from "./pages/pages.js";
import Protected from "./components/authLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element:( <Protected authentication = {false}><LoginPage /></Protected> )},
      { path: "/sign-up", element:( <Protected authentication = {false}><SignUpPage /></Protected> )},
      { path: "/all-posts", element:( <Protected authentication = {true}><AllPostPage /></Protected> )},
      { path: "/add-post", element:( <Protected authentication = {true}><AddPostPage /></Protected> )},
      { path: "/edit-post/:slug", element:( <Protected authentication = {true}><EditPostPage /></Protected> )},
      { path: "/my-posts", element:( <Protected authentication = {true}><MyPostPage /></Protected> )},
      { path: `/post/:slug`, element:( <Protected authentication = {true}><PostPage /></Protected> )},
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
