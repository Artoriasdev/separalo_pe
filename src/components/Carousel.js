import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import Image from "../assets/images/Banner_web_3.jpg";

function Project(props) {
  return (
    <Paper className="Project" elevation={0}>
      <div
        className="image-container"
        style={{
          //   position: "relative",
          height: "100%",
          width: "100%",
          //   textAlign: "center",
        }}
      >
        <img src={props.item.link} alt="¡logo separalo.pe!" />
      </div>
    </Paper>
  );
}

const items = [
  {
    id: "30%",
    link: Image,
    category: "4",
    service: "3",
  },
];

const MyProjectsExample = () => {
  return (
    <div style={{ color: "#494949" }}>
      <Carousel
        className="Home-carousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        duration={500}
        navButtonsAlwaysVisible={true}
        navButtonsAlwaysInvisible={false}
        cycleNavigation={true}
        fullHeightHover={true}
        swipe={true}
        key={items.index}
        navButtonsProps={{
          style: {
            backgroundColor: "#ffdd00",
          },
        }}
      >
        {items.map((item, index) => {
          return <Project item={item} key={index} />;
        })}
      </Carousel>
    </div>
  );
};

export default MyProjectsExample;
