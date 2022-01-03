import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorMessage, Form, Formik, useFormikContext } from "formik";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Save } from "@mui/icons-material";

import { banksTypeList } from "../actions/banksTypeList";
import { handleRegexDisable } from "../utils/utilitaries";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import { EMAIL_REGEXP } from "../utils/regexp";
import { registerDataBank } from "../actions/registerDataBank";
import { businessDataBank } from "../actions/businessDataBank";
import { bankUpdateFinish } from "../actions/editDataBank";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "white",
  borderRadius: "4px",
  boxShadow: 10,
  p: 4,
};

const SelectHandler = () => {
  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.banksList);
  const { banksType } = useSelector((state) => state.banksTypeList);
  const { setFieldValue, values, errors, touched, handleBlur } =
    useFormikContext();

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "bancoId") {
      setFieldValue(formField, value, true);
      setFieldValue("tipoId", "", true);
      setFieldValue("numeroCuenta", "", true);
      setFieldValue("numeroInterbancario", "", true);
      dispatch(banksTypeList(value));
    }
    if (formField === "tipoId") {
      setFieldValue(formField, value, true);
      setFieldValue("numeroCuenta", "", true);
      setFieldValue("numeroInterbancario", "", true);
    }
    if (formField === "numeroCuenta") {
      const { tipoId } = values;
      setFieldValue(formField, value, true);
      let maxLengthInput;
      let minLengthInput;

      const id = banksType.find((arreglo) => arreglo.id === tipoId);

      if (id !== undefined) {
        minLengthInput = id.minLength;
        maxLengthInput = id.maxLength;
      }

      setFieldValue("maxLengthValue", maxLengthInput, true);
      setFieldValue("minLengthValue", minLengthInput, true);
      setFieldValue(formField, value.toUpperCase(), true);
    }
  };
  return (
    <>
      <div
        className="files"
        style={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <div className="txt-left">
          <Select
            value={values.bancoId}
            error={errors.bancoId && touched.bancoId}
            name="bancoId"
            onChange={handleDocumentChange}
            onBlur={handleBlur}
            required
            variant="outlined"
            fullWidth
            displayEmpty
          >
            <MenuItem disabled value={""}>
              Nombre de banco
            </MenuItem>
            {banks &&
              banks.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div className="txt-mid">
          <Select
            value={values.tipoId}
            error={errors.tipoId && touched.tipoId}
            name="tipoId"
            onChange={handleDocumentChange}
            onBlur={handleBlur}
            required
            variant="outlined"
            fullWidth
            displayEmpty
          >
            <MenuItem disabled value={""}>
              Tipo de cuenta
            </MenuItem>
            {banksType.length === 0 ? (
              <MenuItem disabled value={" "}>
                Tipos de cuenta no disponibles
              </MenuItem>
            ) : (
              banksType &&
              banksType.map(({ id, description }) => (
                <MenuItem key={id} value={id}>
                  {description}
                </MenuItem>
              ))
            )}
          </Select>
        </div>
        <div className="txt-right">
          <TextField
            name="numeroCuenta"
            className="TxtField"
            variant="outlined"
            placeholder="Número de cuenta"
            label="Número de cuenta"
            fullWidth
            value={values.numeroCuenta}
            error={!!errors.numeroCuenta && touched.numeroCuenta}
            onBlur={handleBlur}
            onChange={handleDocumentChange}
            required
            autoComplete="off"
            inputProps={{
              maxLength: values.maxLengthValue,
            }}
            onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
          <ErrorMessage className="error" name="numeroCuenta" component="div" />
        </div>
      </div>
    </>
  );
};

export const BankFormRegister = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.data);
  const { update, message, opened } = useSelector((state) => state.banksUpdate);

  const handleClose = () => {
    if (update) {
      dispatch(businessDataBank(token));
    }
    dispatch(bankUpdateFinish());
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

            <div>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={handleClose}
                fullWidth
              >
                Aceptar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <h2 style={{ color: "black", textAlign: "center", marginTop: "20px" }}>
        No cuentas con ningun dato bancario registrado, por favor registra tus
        datos aquí
      </h2>
      <Formik
        initialValues={{
          bancoId: "",
          tipoId: "",
          numeroCuenta: "",
          numeroInterbancario: "",
          correoBancario: "",
          maxLengthValue: "",
          minLengthValue: "",
        }}
        validate={(values, props) => {
          const errors = {};
          if (!values.correoBancario) {
            errors.correoBancario = "";
          } else if (!EMAIL_REGEXP.test(values.correoBancario)) {
            errors.correoBancario = EMAIL_INVALID;
          } else if (values.correoBancario.length < E_MINLENGTH) {
            errors.correoBancario = EMAIL_MINLENGTH;
          }

          if (!values.numeroCuenta) {
            errors.numeroCuenta = "";
          } else if (values.numeroCuenta.length < values.minLengthValue) {
            errors.numeroCuenta = `El número de cuenta debe tener ${values.minLengthValue} dígitos`;
          } else if (
            !values.numeroCuenta.startsWith("0011") &&
            values.bancoId === 2
          ) {
            errors.numeroCuenta = "El número de cuenta debe comenzar con 0011";
          }

          if (!values.numeroInterbancario) {
            errors.numeroInterbancario = "";
          } else if (values.numeroInterbancario.length < 20) {
            errors.numeroInterbancario =
              "El número de cuenta interbancaria debe ser de 20 dígitos";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const bankModel = {
            idBank: "",
            idBankAccountType: "",
            accountNumber: "",
            interbankAccountNumber: "",
            email: "",
          };

          bankModel.idBank = values.bancoId;
          bankModel.idBankAccountType = values.tipoId;
          bankModel.accountNumber = values.numeroCuenta;
          bankModel.interbankAccountNumber = values.numeroInterbancario;
          bankModel.email = values.correoBancario;

          (async () => {
            dispatch(registerDataBank(bankModel, token));
          })();
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form name="formBank" onSubmit={handleSubmit}>
            <SelectHandler />
            <div className="files">
              <div className="txt-left" style={{ margin: "5px 0 5px 5px" }}>
                <TextField
                  name="numeroInterbancario"
                  className="TxtField"
                  variant="outlined"
                  placeholder="Número de cuenta interbancario"
                  label="Número de cuenta interbancario"
                  fullWidth
                  value={values.numeroInterbancario}
                  error={
                    !!errors.numeroInterbancario && touched.numeroInterbancario
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  inputProps={{
                    maxLength: 20,
                  }}
                  onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                />
                <ErrorMessage
                  className="error"
                  name="numeroInterbancario"
                  component="div"
                />
              </div>

              <div className="txt-right-nomid-bank">
                <TextField
                  name="correoBancario"
                  className="TxtField"
                  variant="outlined"
                  placeholder="Correo de confirmación"
                  label="Correo de confirmación"
                  fullWidth
                  autoComplete="off"
                  value={values.correoBancario}
                  error={!!errors.correoBancario && touched.correoBancario}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  // inputProps={{
                  //   maxLength: 9,
                  // }}
                  onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                />
                <ErrorMessage
                  className="error"
                  name="correoBancario"
                  component="div"
                />
              </div>
            </div>
            <div className="files" style={{ float: "right" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="btn-primary data"
                startIcon={<Save />}
                disabled={isSubmitting}
                fullWidth
                style={{ margin: "10px auto" }}
              >
                Guardar datos bancarios
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
