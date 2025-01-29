import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearError, register } from "../store/slices/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [values, setValues] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await dispatch(register(values)).unwrap();
      toast.success("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
            <h2 className="text-center text-2xl font-bold">Register</h2>

            {/* {error && (
              <div className="mt-4 p-4 mb-4 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            {success && (
              <div className="mt-4 p-4 mb-4 text-sm rounded-lg bg-green-50 text-green-600 border border-green-200">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Registration successful! Redirecting...</span>
                </div>
              </div>
            )} */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="userName"
                    className=" block text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="userName"
                      required
                      onChange={(e) =>
                        setValues({ ...values, userName: e.target.value })
                      }
                      className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="mobile"
                    className=" block text-sm font-medium text-gray-900"
                  >
                    Mobile No#
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="mobile"
                      required
                      maxLength={11}
                      onChange={(e) =>
                        setValues({ ...values, mobile: e.target.value })
                      }
                      className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
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
                      required
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                      className="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center flex-col">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded cursor-pointer bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
                  </button>
                  <span>Or</span>
                  <Link
                    to="/login"
                    className="flex w-full justify-center rounded px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Login
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

export default Register;
