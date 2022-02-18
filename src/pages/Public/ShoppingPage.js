import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";

import Shopping from "../../assets/images/ShoppingPage.svg";
import { ShoppingList } from "../../components/ShoppingList";
import { MyModal } from "../../components/Modal";

export const ShoppingPage = () => {
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);

  const history = useHistory();

  const handleFirstReserve = () => {
    history.push("/");
  };
  return (
    <div className="page-container" style={{ padding: "20px 0" }}>
      <MyModal />
      <h1>
        <img src={Shopping} alt="logo" style={{ marginRight: "8px" }} />
        Carrito de reservas
      </h1>
      <h3>Estos son los servicios que han sido registrados en tu carrito</h3>

      <div className="shopping-container">
        {shoppingCarItems.length < 1 ? (
          <div className="empty-container">
            <div className="empty-text">
              <p style={{ fontSize: "15px", color: "#23232399" }}>
                Tu carrito de reservas está vacío
              </p>
            </div>
            <div className="empty-accion">
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={handleFirstReserve}
              >
                Realizar una reserva
              </Button>
            </div>
          </div>
        ) : (
          <ShoppingList />
        )}
      </div>
    </div>
  );
};
