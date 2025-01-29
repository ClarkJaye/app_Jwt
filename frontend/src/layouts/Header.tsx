import { LogOut, Menu, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className=" border-b-1 border-b-gray-300">
      <div className="flex gap-10 lg:gap-20 items-center justify-between p-2 mx-4">
        <div className="flex gap-4 items-center flex-shrink-0">
          <Link to="/">
            <span className="font-bold text-xl text-gray-700">BlogPost</span>
          </Link>
        </div>

        <button
          type="button"
          className="flex sm:hidden p-1 border text-gray-600 border-gray-600 rounded cursor-pointer hover:bg-gray-700 hover:text-white "
        >
          <Menu />
        </button>

        <ul className="hidden sm:flex gap-6 items-center">
          <Link
            to="/home"
            className={`p-1 px-2 rounded hover:bg-gray-300 cursor-pointer ${location.pathname === '/home' ? 'bg-gray-300' : '' } `}
            // className={location.pathname === '/home' ? "p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/posts"
              className={`p-1 px-2 rounded hover:bg-gray-300 cursor-pointer ${location.pathname === '/posts' ? 'bg-gray-300' : '' } `}            >
              Post
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <li className="flex items-center gap-1 p-1 px-2 rounded hover:bg-gray-300 cursor-pointer">
                <User size={18} />
                <span>{user?.userName}</span>
              </li>

              <li
                className="p-1 px-2 rounded hover:bg-gray-300 cursor-pointer"
                onClick={handleLogout}
              >
                <button className="flex items-center gap-2 text-red-400 cursor-pointer">
                  <LogOut size={18} />
                  <span className="hidden md:flex">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="p-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                Register
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
