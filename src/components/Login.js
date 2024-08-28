import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Penguin from "./Penguin";

const Login = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      console.log("Error occured while logging in" + props);
      props.showAlert(
        "Invalid credentials. Please enter a valid email and password",
        "danger"
      );
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "Login to your NoteWhril account";
  }, []);

  return (
    <main className="bg-Purple">
      <div className="h-100vh">
        <div className="d-flex align-items-center row">
          <div className="col-md-2"></div>
          <div className="col-md-4 col-md-offset-4 marginTop-70 p-5 bg-white border border-secondary-subtle rounded shadow">
            <h2 className="d-flex justify-content-center mb-4">Log In</h2>
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  value={credentials.email}
                  onChange={onChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn purpleBtn mt-3">
                Login
              </button>
            </form>
          </div>
          <div className="col-6">
            <Penguin />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
