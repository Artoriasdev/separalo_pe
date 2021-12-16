import { Button } from "@mui/material";
import React from "react";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { useHistory } from "react-router";
import { RatingService } from "../helpers/RatingService";

export const PublicBusiness = ({ typeBusiness, category }) => {
  const history = useHistory();
  const handleRedirect = (id) => {
    history.push(`/services-menu-category/${id}/${category}`);
  };

  return (
    <div className="flip-container">
      {typeBusiness &&
        typeBusiness.map(({ id, tradename, logo, cardDescription }) => (
          <Flippy
            flipOnHover={true}
            flipOnClick={false}
            flipDirection="horizontal"
            className="flip-card"
            key={id}
          >
            <FrontSide className="flip-card-background">
              <div
                className="flip-card-service"
                style={{
                  height: "92%",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{ height: "240px", width: "300px" }}
                />
                <h2>{tradename}</h2>
              </div>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn_card"
                style={{
                  margin: "0.5px 0",
                  textTransform: "none",
                  maxWidth: "349px",
                }}
                fullWidth
                onClick={() => handleRedirect(id)}
              >
                Ver servicios
              </Button>
            </FrontSide>
            <BackSide className="flip-card-background">
              <div
                className="flip-card-service"
                style={{
                  height: "92%",
                }}
              >
                <h2>{tradename}</h2>
                <RatingService rate={5} />
                <p style={{ textAlign: "justify" }}>{cardDescription}</p>
              </div>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn_card"
                style={{
                  margin: "0.5px 0",
                  textTransform: "none",
                  maxWidth: "349px",
                }}
                fullWidth
                onClick={() => handleRedirect(id)}
              >
                Ver servicios
              </Button>
            </BackSide>
          </Flippy>
        ))}
    </div>
  );
};
