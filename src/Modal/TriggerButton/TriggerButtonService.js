import { Button } from "@mui/material";
import React from "react";
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <Button
      className="btn-primary"
      ref={buttonRef}
      onClick={showModal}
      variant="contained"
      color="primary"
    >
      {triggerText}
    </Button>
  );
};
export default Trigger;
