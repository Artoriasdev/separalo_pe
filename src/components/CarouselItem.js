import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselItem from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { useHistory } from "react-router";
import { ArrowLeftSVG, ArrowRightSVG } from "../assets/images/svg";
import { cleanSearch } from "../actions/search";

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

export const ItemCarousel = (props) => {
  const { categorys } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirect = (id) => {
    dispatch(cleanSearch());
    history.push(`/services-menu/${id}`);
  };

  return (
    <div>
      <CarouselItem
        swipeable={["mobile"] ? true : false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={false}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={false}
        deviceType={props.deviceType}
        itemClass="carousel-item-padding-100-px"
        renderButtonGroupOutside={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {categorys &&
          categorys.map(({ id, image, name, description }) => (
            <div
              className="flip-home"
              onClick={() => handleRedirect(id)}
              key={id}
            >
              <Flippy
                flipOnHover={true}
                flipOnClick={false}
                flipDirection="horizontal"
                className="flip-home-container"
              >
                <FrontSide
                  className="flip-home-front"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></FrontSide>
                <BackSide className="flip-home-back">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </BackSide>
              </Flippy>
              <h3>{name}</h3>
            </div>
          ))}
      </CarouselItem>
    </div>
  );
};
