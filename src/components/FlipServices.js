import { Button } from "@mui/material";
import React from "react";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RatingService } from "../helpers/RatingService";

export const FlipServices = ({ typeCategorys }) => {
  const history = useHistory();
  const { logged } = useSelector((state) => state.auth);

  const handleRedirect = (title, id) => {
    if (!logged) {
      history.push(`/confirm/${title}/${id}`);
    } else {
      history.push(`/customer/reserve/${id}`);
    }
  };
  return (
    <div>
      {typeCategorys &&
        typeCategorys.map(
          ({ id, title, description, currencySymbol, price, duration }) => (
            <Flippy
              flipOnHover={true} // default false
              flipOnClick={false} // default false
              flipDirection="horizontal" // horizontal or vertical
              className="flip-card"
              key={id}
            >
              <FrontSide className="flip-card-background">
                <div
                  className="flip-card-service"
                  style={{
                    height: "100%",
                  }}
                >
                  <h3>{title}</h3>
                  <RatingService rate={5} />
                  <span>
                    <br></br>
                  </span>
                  <p className="text">Precio</p>
                  <div className="price">
                    {currencySymbol} {price}
                  </div>
                  <p className="font-p text">Duración : {duration}</p>
                </div>
              </FrontSide>
              <BackSide className="flip-card-background">
                <div
                  className="flip-card-service"
                  style={{
                    height: "92%",
                  }}
                >
                  <h3>{title}</h3>
                  <h4 style={{ textAlign: "justify" }}>{description}</h4>
                  <p>Duración : {duration}</p>
                </div>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn_card"
                  onClick={() => handleRedirect(title, id)}
                  fullWidth
                >
                  Separar cita
                </Button>
              </BackSide>
            </Flippy>
          )
        )}
    </div>
  );
};
