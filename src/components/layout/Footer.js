import React from "react";

const Footer = ({ fixed }) => (
  <footer
    className={`bg-light text-center py-3 border-top`}
    style={{
      fontFamily: "'Roboto', sans-serif",
      fontSize: "1rem",
      color: "#888",
      boxShadow: "0 -1px 8px rgba(0,0,0,0.04)",
      position: fixed ? "fixed" : "static",
      left: 0,
      bottom: 0,
      width: "100%",
      zIndex: 100,
    }}
  >
    <span className="text-muted">
      &copy; {new Date().getFullYear()} Nation Insight. All rights reserved.
    </span>
  </footer>
);

export default Footer;
