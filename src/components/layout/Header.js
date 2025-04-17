import React from "react";

const Header = () => (
  <header
    className="bg-primary text-white py-3 text-center site-header"
    style={{ marginBottom: 0 }}
  >
    <div>
      <span
        className="brand-title"
        style={{
          fontSize: "2.2rem",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
        }}
      >
        Nation Insight
      </span>
    </div>
    <div>
      <small
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: "1.1rem",
          letterSpacing: "0.5px",
          display: "block",
          marginTop: "0.3rem",
        }}
      >
        Your Window to the World
      </small>
    </div>
  </header>
);

export default Header;
