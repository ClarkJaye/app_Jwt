import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);



  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError("")
    setSuccess(false)

    axios.post('http://localhost:8081/auth/register', values)
    .then(res => {
      if(res.data.Status === "Success"){
        setSuccess(true)
        setTimeout(() => {
          navigate("/home")
        },2000)
      }else{
        setError(res.data.Error)
      }
    })
    .catch(err => {
      setError(err.response?.data?.Error || "An error occurred");
    });
  }

  return (
    <div className="bg-red-500 d-flex align-items-center justify-content-center vh-100">
      <div className="bg-white w-[500px] rounded-[10px] p-2">
        <h2 className="text-center">Sign Up</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Registration successful! Redirecting...</div>}
        
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter name"
                onChange={e => setValues({...values, name: e.target.value})}
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
                onChange={e => setValues({...values, email: e.target.value})}
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
                onChange={e => setValues({...values, password: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Register
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
