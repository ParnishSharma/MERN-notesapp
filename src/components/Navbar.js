import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();

  const handlelogout = () => {

    const token = localStorage.getItem('token');
console.log('Token in local storage:', token);

// To check all key-value pairs in local storage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`Key: ${key}, Value: ${value}`);
}
    
    try {
    const rtoken= localStorage.removeItem('token');
      console.log('Token removed from local storage.');
      navigate('/login');
      console.log('Token in local storage is:', rtoken);
    } catch (error) {
      console.error('Error removing token from local storage:', error);
    }
  };

  let location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Noteify
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
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <form className="d-flex">
                <Link className="btn btn-outline-success mx-2" type="submit" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success mx-3" type="submit" to="/signup">
                  Sign Up
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary" onClick={handlelogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
