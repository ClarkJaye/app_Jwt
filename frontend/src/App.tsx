import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth } from "./store/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    verifyAuth();
  }, [dispatch]);

  // Only redirect from root path to home if authenticated
  useEffect(() => {
    if (isAuthenticated && window.location.pathname === "/") {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <Outlet />
    </div>
  );
}

export default App;
