import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthProvider'; // Update the path as needed

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.data.Status === "Success") {
        login(response.data.user); // Update auth context
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.response?.data?.Error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-500 d-flex align-items-center justify-content-center vh-100">
      <div className="bg-white w-[500px] rounded-[10px] p-2">
        <h2 className="text-center">Login</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="@example.com"
                required
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                required
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                >
                  {loading ? "" : 'Logging in...'}
                </span>
              ) : (
                "Login"
              )}
            </button>
            <hr />
            <Link to="/register" className="btn btn-secondary w-100">
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
