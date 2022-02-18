import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Question from "../assets/images/Question.svg";
import Info from "../assets/images/icono_info_hover.svg";
import InfoPurple from "../assets/images/icono_info_hover_purple.svg";
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
    padding: "10px 30px",
    textAlign: "center",
    fontFamily:
      "VarelaRound-Regular, MavenPro-Regular, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
}));
const HtmlTooltipAppointment = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#5950A2",
    color: "#FFFFFF",
    fontSize: "12px",
    border: "0.45px solid #C4C4C4",
    padding: "10px 30px",
    textAlign: "left",
    fontFamily:
      "VarelaRound-Regular, MavenPro-Regular, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
}));

export const CustomizedTooltips = () => {
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
              <b style={{ fontWeight: "24px" }}>{" 1 hora."}</b>
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
};

export const TriggersTooltips = () => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <HtmlTooltip
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom-end"
            title={
              <React.Fragment>
                <p style={{ lineHeight: "12px" }}>
                  Si tu estado está
                  <b style={{ fontWeight: "24px" }}>{" caducado"}</b>, puedes
                  generar una nueva reserva, recuerda que tu reserva se mantiene
                  activa solo por
                  <b style={{ fontWeight: "24px" }}>{" 1 hora."}</b>
                </p>
              </React.Fragment>
            }
          >
            <IconButton onClick={handleTooltipOpen} style={{ margin: "0" }}>
              <img src={Question} alt="logo" style={{ width: "24px" }} />
            </IconButton>
          </HtmlTooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export const AppointmentTooltip = ({ business, address }) => {
  return (
    <div>
      <HtmlTooltipAppointment
        title={
          <React.Fragment>
            <h2 style={{ marginBottom: "0" }}>{business}</h2>
            <p style={{ lineHeight: "12px" }}>{address}</p>
          </React.Fragment>
        }
        placement="bottom-end"
      >
        <IconButton style={{ margin: "0" }}>
          <img src={Info} alt="logo" style={{ width: "18px" }} />
        </IconButton>
      </HtmlTooltipAppointment>
    </div>
  );
};

export const AppointmentTriggersTooltips = ({ business, address }) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <HtmlTooltipAppointment
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom"
            title={
              <React.Fragment>
                <h2 style={{ marginBottom: "10px", lineHeight: "1.2" }}>
                  {business}
                </h2>
                <p style={{ lineHeight: "12px" }}>{address}</p>
              </React.Fragment>
            }
          >
            <IconButton onClick={handleTooltipOpen} style={{ margin: "0" }}>
              <img src={InfoPurple} alt="logo" style={{ width: "18px" }} />
            </IconButton>
          </HtmlTooltipAppointment>
        </div>
      </ClickAwayListener>
    </div>
  );
};
