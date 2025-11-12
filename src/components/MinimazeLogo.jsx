import React from "react";
import logoMinimized from "../images/MinimazeLogo.png";

const MinimazeLogo = () => {
  return (
    <img
      src={logoMinimized}
      alt="Logo da empresa"
      style={{ maxWidth: "50px" }}
    />
  );
};

export default MinimazeLogo;
