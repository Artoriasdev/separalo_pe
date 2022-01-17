import React from "react";
import { useSelector } from "react-redux";
import Error from "../assets/images/error-icon.svg";

export const ErrorModal = () => {
  const { error } = useSelector((state) => state.modal);

  return (
    <div
      className="mdal"
      style={{
        backgroundColor: "white",
        zIndex: "10",
        display: error ? "" : "none",
      }}
    >
      <div
        className="mdal_content"
        style={{ alignItems: "center", textAlign: "center" }}
      >
        <img src={Error} alt="error" style={{ maxWidth: "74px" }} />
        <h2
          style={{
            fontSize: "24px",
            color: "#594FA1",
            lineHeight: "29px",
            margin: "5px 0",
          }}
        >
          ¡Ocurrió un error inesperado!
        </h2>
        <h4
          style={{
            fontSize: "15px",
            lineHeight: "18px",
            color: "rgba(35, 35, 35, 0.6)",
            margin: "5px 0",
          }}
        >
          Estamos trabajando para resolverlo, inténtalo más tarde.
        </h4>
      </div>
    </div>
  );
};
