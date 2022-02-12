import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

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
    link: "https://scontent.flim29-1.fna.fbcdn.net/v/t39.30808-6/256250205_127605489691435_2216501464502058653_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeGUoUTejDJEMS3yJcQIyffOtEqQvFXJami0SpC8VclqaH0LRE_XKsoODPFJelqIFrKAJL7_6_EUdLQQEULdtw3_&_nc_ohc=lR1VWaELzlwAX_ctvn-&_nc_ht=scontent.flim29-1.fna&oh=00_AT8NWcz9LMYWX5mnZggfz0rK8NBLm3IX94F3cdF3Gq_auQ&oe=620C0A99",
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
