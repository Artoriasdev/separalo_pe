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
import {
  modalClose,
  modalErrClose,
  modalRedirectFinished,
} from "../actions/modal";
import { useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";

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

const useStyles = makeStyles({
  root: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "700px",
    },
  },
});

export const MyModal = ({ link }) => {
  const { opened, message, redirect, error } = useSelector(
    (state) => state.modal
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalClose());
    if (redirect) {
      history.push(link);
      dispatch(modalRedirectFinished());
    }
  };
  const handleRedirectLogin = () => {
    dispatch(modalClose());
    dispatch(modalErrClose());

    history.push("/login/C");
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

            {error ? (
              <MyButton
                size="large"
                color="primary"
                variant="contained"
                onClick={handleRedirectLogin}
              >
                Iniciar sesión
              </MyButton>
            ) : (
              <MyButton
                size="large"
                color="primary"
                variant="contained"
                onClick={handleClose}
              >
                Aceptar
              </MyButton>
            )}
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

export const MyFormikDialog = ({ modal, setChecked, setTermsModal }) => {
  const classes = useStyles();
  const { terms } = useSelector((state) => state.terms);
  const { setFieldValue } = useFormikContext();
  const handleClose = () => {
    setTermsModal(false);
  };

  const handleTerms = (id) => {
    if (id === 1) {
      setChecked(true);
      setTermsModal(false);
      setFieldValue("checkbox", true, true);
    } else if (id === 2) {
      setTermsModal(false);
    }
  };
  const wrapper = React.createRef(null);
  return (
    <div>
      <Dialog
        ref={wrapper}
        open={modal}
        onClose={handleClose}
        scroll="paper"
        className={classes.root}
      >
        {terms.map((term) => {
          return (
            <DialogContent key={"1"}>
              <div dangerouslySetInnerHTML={{ __html: term.value }} />
            </DialogContent>
          );
        })}
        <DialogActions style={{ justifyContent: "center" }}>
          <MyButton
            onClick={() => handleTerms(1)}
            style={{
              margin: "5px 5px 3px 0",
              textTransform: "capitalize",
            }}
          >
            Aceptar
          </MyButton>
          <MyButton
            onClick={() => handleTerms(2)}
            style={{
              margin: "5px 0 3px 5px",
              textTransform: "capitalize",
            }}
          >
            Cancelar
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
