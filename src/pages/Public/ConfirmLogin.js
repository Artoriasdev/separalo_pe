import React from "react";
import { useHistory, useParams } from "react-router";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ConfirmLogin = () => {
  const params = useParams();
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/login/C");
  };

  return (
    <div className="confirm-page">
      <div className="content-container">
        <p className="font-tittle">
          Usted ha seleccionado {params.title}, para reservar su cita inicie
          sesión en nuestra página web.
        </p>
        <Button
          size="large"
          color="primary"
          variant="contained"
          className="btn-primary"
          onClick={handleRedirect}
        >
          Iniciar sesión
        </Button>
        <div style={{ marginTop: "10px" }}>
          <Link to={`/reserve/invited/${params.id}`}>
            Continuar como invitado
          </Link>
        </div>
      </div>
    </div>
  );
};
