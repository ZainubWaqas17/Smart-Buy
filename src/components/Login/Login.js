import {
  faFacebookF,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  //used to navigate to different routes
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    //if firstName and lastName feilds are empty - give error message
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    //error for invalid email
    if (!email) {
      newErrors.email = "Email address is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email))
        newErrors.email = "Please enter a valid email address.";
    }

    //error for password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    //return true if there are no errors (length of errors is 0)
    return Object.keys(newErrors).length === 0;
  };

  //If all data entered succesfully, navigate to home page
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      navigate("/");
    }
  };

  //render component
  return (
    <div className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-3 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-4 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)", alignContent: "center" }}
            >
              Your Gateway to the Best <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Electronics Deals
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              Sign in to access exclusive offers on laptops, smartphones, and
              more. Discover unbeatable prices on the latest tech gadgets at our
              store!
            </p>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <small className="text-danger">
                          {errors.firstName}
                        </small>
                      )}
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {errors.lastName && (
                        <small className="text-danger">{errors.lastName}</small>
                      )}
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      id="button"
                    >
                      Sign up
                    </button>
                  </div>
                  <div className="text-center">
                    <p>or sign up with:</p>
                    <button className="btn btn-link btn-floating mx-1">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button className="btn btn-link btn-floating mx-1">
                      <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <button className="btn btn-link btn-floating mx-1">
                      <FontAwesomeIcon icon={faTwitter} />
                    </button>
                    <button className="btn btn-link btn-floating mx-1">
                      <FontAwesomeIcon icon={faGithub} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
