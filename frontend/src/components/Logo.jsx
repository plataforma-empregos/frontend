import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/" style={{ display: "inline-block" }}>
      <img
        src={logo}
        alt="Logo da empresa"
        style={{ maxWidth: "200px", cursor: "pointer" }}
      />
    </Link>
  );
};

export default Logo;
