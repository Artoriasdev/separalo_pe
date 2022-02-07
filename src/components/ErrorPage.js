import React from "react";
import Error from "../assets/images/error-icon.svg";

export const ErrorPage = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
