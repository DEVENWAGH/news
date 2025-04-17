import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#1976d2" }}
      >
        <div className="container-fluid">
          {/* Brand title visible on all screens */}
          <Link className="navbar-brand brand-title" to="/">
            Nation Insight
            <small
              className="d-block"
              style={{
                fontSize: "0.75rem",
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              Your Window to the World
            </small>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavExpanded ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={handleNavToggle}
          >
            {isNavExpanded ? (
              <span style={{ color: "white", fontSize: "1.25rem" }}>✕</span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
