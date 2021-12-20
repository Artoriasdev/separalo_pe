import React from "react";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { useHistory } from "react-router";

import { Button } from "@mui/material";
import CarouselItem from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { ArrowLeftSVG, ArrowRightSVG } from "../assets/images/svg";
import { RatingService } from "../helpers/RatingService";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1700 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1700, min: 1200 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 1200, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <div className="arrow-container_left">
      <button onClick={() => onClick()}>
        <ArrowLeftSVG />
      </button>
    </div>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <div className="arrow-container_right">
      <button onClick={() => onClick()}>
        <ArrowRightSVG />
      </button>
    </div>
  );
};

export const PublicBusiness = ({ typeBusiness, category, ...props }) => {
  const history = useHistory();
  const handleRedirect = (id) => {
    history.push(`/services-menu-category/${id}/${category}`);
  };

  return (
    <div className="flip-div">
      <CarouselItem
        swipeable={["mobile"] ? true : false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={false}
        transitionDuration={500}
        containerClass="carousel-container-flippy"
        removeArrowOnDeviceType={false}
        deviceType={props.deviceType}
        itemClass="carousel-item-padding-100-px"
        renderButtonGroupOutside={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
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
      </CarouselItem>
    </div>
  );
};
