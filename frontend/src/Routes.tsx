import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import ("./pages/Home"))
const Login = lazy(() => import ("./pages/Login"))
const Register = lazy(() => import ("./pages/Register"))
const NotFound = lazy(() => import ("./pages/NotFound"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: <Home />,
  },
 
  {
    path: "*",
    element: <NotFound />,
  }

]);

export default router;
