import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";

import Shopping from "../../assets/images/ShoppingPage.svg";
import { checkShoppingItems } from "../../actions/shoppingCar";
import { ShoppingList } from "../../components/ShoppingList";
import { MyModal } from "../../components/Modal";
// import { shoppingCarDone } from "../../actions/shoppingCarDone";

export const ShoppingPage = () => {
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);

  const { token } = useSelector((state) => state.auth.data);
  const { logged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (logged) {
      dispatch(checkShoppingItems(token));
    }
  }, [dispatch, logged, token]);

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
                Tu carrito de reservas esta vacio
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
