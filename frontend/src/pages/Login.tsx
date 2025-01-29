import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearError, login } from "../store/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      const returnTo = location.state?.returnTo || '/home';
      navigate(returnTo);
    }
  }, [isAuthenticated, navigate, location.state]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await dispatch(login(values)).unwrap();
      toast.success("Login Successfully.");
    } catch (err: any) {
      setValues((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  return (
    <div className="h-screen bg-red-400">
      <Link
        to="/"
        className="flex text-[14px] items-center gap-1 p-1 px-2 bg-gray-600 hover:bg-gray-500 text-white rounded absolute mt-2 ml-2"
      >
        <ArrowLeft className="size-[18px]" />
        <span>Go back</span>
      </Link>
      <div className="h-full flex items-center justify-center">
        <div className="bg-white rounded p-6 w-[400px] shadow-2xl border border-gray-200">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold">Login</h2>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className=" block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className=" block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                      required
                      className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center flex-col">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded cursor-pointer bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      >
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <span>Or</span>
                  <Link
                    to="/register"
                    className="flex w-full justify-center rounded px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
