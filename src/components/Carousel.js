import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import Image from "../assets/images/Banner_web_3.jpg";

function Project(props) {
  return (
    <Paper className="Project" elevation={0}>
      <div
        className="image-container"
        // style={{
        //   //   position: "relative",
        //   height: "100%",
        //   width: "100%",
        //   //   textAlign: "center",
        // }}
      >
        <img src={props.item.promotionImgUrl} alt={props.item.description} />
      </div>
    </Paper>
  );
}

const MyProjectsExample = () => {
  const { Adds } = useSelector((state) => state.banner);

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
        key={Adds.index}
        navButtonsProps={{
          style: {
            backgroundColor: "#ffdd00",
          },
        }}
      >
        {Adds.map((item, index) => {
          return <Project item={item} key={index} />;
        })}
      </Carousel>
    </div>
  );
};

export default MyProjectsExample;
