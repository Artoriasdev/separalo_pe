import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { MyButton } from "./Fields";
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../actions/modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 10,
  p: 4,
};

export const MyModal = () => {
  const { opened, message } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalClose());
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal-container"
      >
        <Fade in={opened}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h8"
              component="p"
              style={{ fontWeight: "unset", marginBottom: "10px" }}
            >
              {message}
            </Typography>

            <MyButton
              size="large"
              color="primary"
              variant="contained"
              onClick={handleClose}
            >
              Aceptar
            </MyButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export const MyDialog = ({ modal, text, ...props }) => {
  // const { opened, message } = useSelector((state) => state.dialog);
  const handleClose = () => {
    props.set(false);
  };
  const wrapper = React.createRef(null);
  return (
    <div>
      <Dialog ref={wrapper} open={modal} onClose={handleClose} scroll="paper">
        {text.map((text) => {
          return (
            <DialogContent key={"1"}>
              <div dangerouslySetInnerHTML={{ __html: text.value }} />
            </DialogContent>
          );
        })}
        <DialogActions style={{ justifyContent: "center" }}>
          <MyButton
            size="large"
            color="primary"
            variant="contained"
            onClick={handleClose}
          >
            Aceptar
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
