import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { BackSide, Flippy, FrontSide } from "react-flippy";

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

export const FlipServices = ({ typeCategorys, ...props }) => {
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
    <div className="carousel">
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
      </CarouselItem>
    </div>
  );
};
