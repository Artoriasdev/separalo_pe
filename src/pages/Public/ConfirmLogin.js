import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ConfirmLogin = () => {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("skip_confirm") === "true") {
      history.push(
        `/reserve/invited/${params.id}/${params.businessId}/${params.categoryId}`
      );
    }

    return () => {
      if (localStorage.getItem("skip_confirm") === "true") {
        history.push(
          `/reserve/invited/${params.id}/${params.businessId}/${params.categoryId}`
        );
      }
    };
  }, [history, params.id, params.businessId, params.categoryId]);

  const handleRedirect = () => {
    localStorage.setItem("log_invited", true);
    localStorage.setItem("service_id", params.id);
    localStorage.setItem("business_id", params.businessId);
    localStorage.setItem("category_id", params.categoryId);
    history.push("/login/C");
  };

  const skipConfirm = () => {
    localStorage.setItem("skip_confirm", true);
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
          <Link
            onClick={skipConfirm}
            to={`/reserve/invited/${params.id}/${params.businessId}/${params.categoryId}`}
          >
            Continuar como invitado
          </Link>
        </div>
      </div>
    </div>
  );
};
