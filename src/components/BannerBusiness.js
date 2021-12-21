import Carousel from "react-material-ui-carousel";

import { Paper } from "@mui/material";

import React, { Component } from "react";

function Project(props) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: "transparent",
      }}
      elevation={0}
    >
      <div className="content">
        <div className="title"></div>
      </div>
    </Paper>
  );
}

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoPlay: false,
      animation: "none",
      indicators: false,
      timeout: 0,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: true,
    };
  }

  render() {
    return (
      <div
        className="banner-container"
        style={{
          backgroundImage: `url(${this.props.imagen})`,
          marginBottom: "40px",
        }}
      >
        <div className="carousel-background" style={{ background: "none" }}>
          <Carousel
            className="SecondExample"
            autoPlay={this.state.autoPlay}
            animation={this.state.animation}
            indicators={this.state.indicators}
            timeout={this.state.timeout}
            navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
            navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
            swipe={false}
          >
            <Project negocio={this.props.negocio} />;
          </Carousel>
        </div>
        <div className="logo-container-services">
          <img src={this.props.logo} alt="logo" />
        </div>
      </div>
    );
  }
}

export default Banner;
