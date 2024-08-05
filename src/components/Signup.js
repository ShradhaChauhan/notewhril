import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (signupForm.userPassword !== signupForm.confirmPassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    } else {
      const response = await fetch(
        "http://localhost:5000/api/users/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signupForm.userName,
            email: signupForm.userEmail,
            password: signupForm.userPassword,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //Save the auth token and redirect to Login page
        localStorage.setItem("token", json.authToken);
        props.showAlert("Account created successfully", "success");
        navigate("/Login");
      } else {
        props.showAlert(json.errors[0].msg, "danger");
      }
    }
  };

  const onChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={signupForm.userName}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            name="userEmail"
            value={signupForm.userEmail}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="userPassword"
            value={signupForm.userPassword}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={signupForm.confirmPassword}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
