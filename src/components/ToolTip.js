import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Question from "../assets/images/Question.svg";
import "../sass/styles.scss";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#5950A2",
    color: "#FFFFFF",
    maxWidth: 204,
    fontSize: "12px",
    border: "0.45px solid #C4C4C4",
    padding: "10px 15px",
    textAlign: "center",
  },
}));

export default function CustomizedTooltips() {
  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <p style={{ lineHeight: "12px" }}>
              Si tu estado está
              <b style={{ fontWeight: "24px" }}>{" caducado"}</b>, puedes
              generar una nueva reserva, recuerda que tu reserva se mantiene
              activa solo por
              <b style={{ fontWeight: "24px" }}>{" 120 minutos."}</b>
            </p>
          </React.Fragment>
        }
        placement="bottom-end"
      >
        <IconButton style={{ margin: "0" }}>
          <img src={Question} alt="logo" style={{ width: "24px" }} />
        </IconButton>
      </HtmlTooltip>
    </div>
  );
}
