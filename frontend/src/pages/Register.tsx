import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="bg-white p-2 border shadow" style={{width: "500px", borderRadius: "10px"}}>
        <h2 className="text-center mt-2">Sign Up</h2>

        <div className="p-4">
          <form>
            <div className="mb-3">
              <label htmlFor="userName">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile">
                <strong>Mobile Number</strong>
              </label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                placeholder="Enter mobile number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                name="Password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <hr />
            <Link to="/login" className="btn btn-secondary w-100">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
