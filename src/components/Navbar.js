import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteWhrilLogo from '../assets/noteWhrilLogo.png'
import './styles.css'

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/Login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" style={{ boxShadow: '0px 0px 3px 0px gray' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/about">
            <img className="mx-2" src={noteWhrilLogo} alt="noteWhrilLogo" height={30} width={30} />NoteWhirl
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  Why NoteWhirl
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">              
              <Link className="btn btn-outline-secondary mx-1" to="/login" role="button">
                Log in
              </Link>
              <Link className="btn mx-1 purpleBtn" style={{backgroundColor: '#6f76e8', color: 'white'}} to="/signup" role="button">
                Start for free
              </Link>
            </form>: <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/home"
                >
                Your Notes
              </Link></li></ul> <button className="btn purpleBtn mx-1" to="/login" onClick={handleLogout}>Logout</button></div>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
