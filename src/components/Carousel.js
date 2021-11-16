import { Button, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

function Project(props) {
  return (
    <Paper
      className="Project"
      style={{ backgroundColor: props.item.color }}
      elevation={10}
    >
      <div
        style={{
          //   position: "relative",
          height: "100%",
          width: "50%",
          //   textAlign: "center",
        }}
      >
        <h1>{props.item.name}</h1>
        <p>{props.item.subtittle}</p>
        <h2>{props.item.service}</h2>
      </div>
      <div
        style={{
          //   position: "relative",
          width: "30%",
          height: "100%",
          marginTop: "5vw",
          //   textAlign: "center",
        }}
      >
        <p>{props.item.description1}</p>
        <p style={{ marginTop: "50px" }}>{props.item.description2}</p>
        <Button className="CheckButton">Click aquí</Button>
      </div>
    </Paper>
  );
}

const items = [
  {
    name: "30%",
    subtittle: "en tu primera clase de",
    service: "entrenamiento",
    description1:
      "Por la compra de 10 clases de entrenamiento vía Zoom de yoga o entrenamientos.",
    description2: "Si quieres mas información",
    color: "#000000",
  },
  {
    name: "40%",
    subtittle: "en tu primera clase de",
    service: "yoga",
    description1:
      "Por la compra de 10 clases de entrenamiento vía Zoom de yoga o entrenamientos.",
    description2: "Si quieres mas información",
    color: "#000000",
  },
  {
    name: "80%",
    subtittle: "en tu primera clase de",
    service: "alpinismo",
    description1:
      "Por la compra de 10 clases de entrenamiento vía Zoom de yoga o entrenamientos.",
    description2: "Si quieres mas información",
    color: "#000000",
  },
];

const MyProjectsExample = () => {
  return (
    <div style={{ marginTop: "50px", color: "#494949" }}>
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
