import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorMessage, Formik, Form, useFormikContext } from "formik";

import {
  TextField,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  MATCH,
  PASSN_MINLENGTH,
  PASS_INVALID,
  REQUIRED,
} from "../../utils/constants";
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../../utils/regexp";
import { handleRegexDisable } from "../../utils/utilitaries";
import { MyFormikDialog, MyModal } from "../../components/Modal";
import { MyCheckbox } from "../../components/Fields";
import { documents } from "../../actions/documents";
import { useHistory } from "react-router-dom";
import { registerCustomer } from "../../actions/register";
import { termsLoad } from "../../actions/termsLoad";

const FormMayus = () => {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

  const handleMayus = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    setFieldValue(formField, value.toUpperCase(), true);
  };

  return (
    <div className="files">
      <div className="txt-left-nomid">
        <TextField
          name="nombre"
          className="TxtField"
          variant="outlined"
          placeholder="Nombres"
          label="Nombres *"
          fullWidth
          value={values.nombre}
          error={!!errors.nombre && touched.nombre}
          onBlur={handleBlur}
          onChange={handleMayus}
        />
        <ErrorMessage className="error" name="nombre" component="div" />
      </div>
      <div className="txt-right-nomid">
        <TextField
          name="apellido"
          className="TxtField"
          variant="outlined"
          placeholder="Apellidos"
          label="Apellidos *"
          fullWidth
          value={values.apellido}
          error={!!errors.apellido && touched.apellido}
          onBlur={handleBlur}
          onChange={handleMayus}
        />
        <ErrorMessage className="error" name="apellido" component="div" />
      </div>
    </div>
  );
};

const FormDocumentChange = () => {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();
  const { documentsList } = useSelector((state) => state.documents);

  const document = documentsList.filter(
    (element) => element.descriptionLarge !== "RUC"
  );

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "documentos") {
      setFieldValue(formField, value, true);
      setFieldValue("nroDocumento", "", false);
    }
    if (formField === "nroDocumento") {
      const { documentos } = values;
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = document.find((arreglo) => arreglo.id === documentos);
      if (id !== undefined) {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (documentos === "04" || documentos === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      setFieldValue("maxLengthValue", maxLengthInput, true);
      setFieldValue("minLengthValue", minLengthInput, true);
      setFieldValue("ingreso", valor, true);
      setFieldValue(formField, value.toUpperCase(), true);
    }
  };

  return (
    <div className="files">
      <div className="txt-left-nomid">
        <Select
          style={{
            backgroundColor: "white",
          }}
          fullWidth
          variant="outlined"
          value={values.documentos}
          error={!!errors.documentos && touched.documentos}
          name="documentos"
          displayEmpty
          onChange={handleDocumentChange}
          onBlur={handleBlur}
        >
          <MenuItem disabled value={""}>
            <span className="empty--option">Tipo de documento *</span>
          </MenuItem>
          {document &&
            document.map(({ id, descriptionLarge }) => (
              <MenuItem key={id} value={id}>
                {descriptionLarge}
              </MenuItem>
            ))}
        </Select>
        <ErrorMessage
          className="error bottom"
          name="documentos"
          component="div"
        />
      </div>

      <div className="txt-right-nomid">
        <TextField
          name="nroDocumento"
          className="TxtField"
          variant="outlined"
          placeholder="Número de documento"
          label="Número de documento *"
          fullWidth
          value={values.nroDocumento}
          error={!!errors.nroDocumento && touched.nroDocumento}
          onBlur={handleBlur}
          onChange={handleDocumentChange}
          inputProps={{
            maxLength: values.maxLengthValue,
            minLength: values.minLengthValue,
          }}
          autoComplete="off"
          onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
        />
        <ErrorMessage
          className="error bottom"
          name="nroDocumento"
          component="div"
        />
      </div>
    </div>
  );
};

export const RegisterCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logged } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [checked, setChecked] = useState(false);

  if (termsModal) {
    dispatch(termsLoad(2));
  }

  useEffect(() => {
    if (logged) history.push("/");
    dispatch(documents());
  }, [dispatch, logged, history]);

  const handleShowPassword = (id) => {
    if (id === 1) {
      setShow(!show);
    } else if (id === 2) {
      setShow2(!show2);
    }
  };

  return (
    <>
      <MyModal link="/login/C" />

      <div className="page-container">
        <div className="login">
          <h3 className="register__subtitle">Soy un cliente</h3>
          <h1>Registra tu cuenta</h1>
          <Formik
            initialValues={{
              nombre: "",
              apellido: "",
              correo: "",
              celular: "",
              contraseña: "",
              repContraseña: "",
              documentos: "",
              nroDocumento: "",
              maxLengthValue: 8,
              minLengthValue: 1,
              ingreso: "[0-9]",
              checkbox: false,
            }}
            validate={(values) => {
              const errors = {};

              if (values.documentos === "") {
                errors.documentos = REQUIRED;
              }

              if (values.nombre.trim().length < 1) {
                errors.nombre = REQUIRED;
              }
              if (values.apellido.trim().length < 1) {
                errors.apellido = REQUIRED;
              }

              if (values.correo.trim().length < 1) {
                errors.correo = REQUIRED;
              } else if (!EMAIL_REGEXP.test(values.correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (values.correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }
              if (values.nroDocumento.trim().length < 1) {
                errors.nroDocumento = REQUIRED;
              } else if (
                values.nroDocumento.trim().length < values.minLengthValue
              ) {
                errors.nroDocumento = `*El número de documento debe tener un mínimo de ${values.minLengthValue} dígitos`;
              }

              if (values.celular.length < 1) {
                errors.celular = REQUIRED;
              } else if (
                values.celular.length <= 9 &&
                !values.celular.startsWith("9")
              ) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9 y debe ser de 9 dígitos .";
              }

              if (values.contraseña.trim().length < 1) {
                errors.contraseña = REQUIRED;
              } else if (
                !PASSWORD_REGEXP.test(values.contraseña) ||
                values.contraseña.length < PASSN_MINLENGTH
              ) {
                errors.contraseña = PASS_INVALID;
              }

              if (values.repContraseña.trim().length < 1) {
                errors.repContraseña = REQUIRED;
              } else if (
                !PASSWORD_REGEXP.test(values.repContraseña) ||
                values.repContraseña.length < PASSN_MINLENGTH
              ) {
                errors.repContraseña = PASS_INVALID;
              } else if (values.contraseña !== values.repContraseña) {
                errors.repContraseña = MATCH;
              }

              if (values.checkbox === false) {
                errors.checkbox = "*Desbes aceptar los términos y condiciones";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const CustomerModel = {
                confirmPassword: "",
                documentNumber: "",
                documentType: "",
                email: "",
                lastName: "",
                mobile: "",
                name: "",
                password: "",
              };

              CustomerModel.name = values.nombre.trim();
              CustomerModel.lastName = values.apellido.trim();
              CustomerModel.email = values.correo.trim();
              CustomerModel.mobile = values.celular;
              CustomerModel.documentType = values.documentos;
              CustomerModel.documentNumber = values.nroDocumento;
              CustomerModel.password = values.contraseña.trim();
              CustomerModel.confirmPassword = values.repContraseña.trim();

              (async () => {
                dispatch(registerCustomer(CustomerModel));
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
              <Form name="formRegister" onSubmit={handleSubmit}>
                <MyFormikDialog
                  modal={termsModal}
                  setChecked={setChecked}
                  setTermsModal={setTermsModal}
                  text="hola"
                />

                <FormMayus />

                <FormDocumentChange />

                <div className="files">
                  <div className="txt-left-nomid">
                    <TextField
                      name="celular"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Número de celular"
                      label="Número de celular *"
                      fullWidth
                      value={values.celular}
                      error={!!errors.celular && touched.celular}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{
                        maxLength: 9,
                      }}
                      onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error bottom"
                      name="celular"
                      component="div"
                    />
                  </div>
                  <div className="txt-right-nomid">
                    <TextField
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Correo electrónico"
                      label="Correo electrónico *"
                      fullWidth
                      value={values.correo}
                      error={!!errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="correo"
                      component="div"
                    />
                  </div>
                </div>

                <div className="files">
                  <div className="txt-left-nomid">
                    <OutlinedInput
                      name="contraseña"
                      fullWidth
                      autoComplete="off"
                      type={show ? "text" : "password"}
                      value={values.contraseña}
                      error={!!errors.contraseña && touched.contraseña}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleShowPassword(1)}
                            edge="end"
                          >
                            {show ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Contraseña *"
                    />
                    <ErrorMessage
                      className="error"
                      name="contraseña"
                      component="div"
                    />
                  </div>
                  <div className="txt-right-nomid">
                    <OutlinedInput
                      name="repContraseña"
                      fullWidth
                      autoComplete="off"
                      type={show2 ? "text" : "password"}
                      value={values.repContraseña}
                      error={!!errors.repContraseña && touched.repContraseña}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleShowPassword(2)}
                            edge="end"
                          >
                            {show2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Repetir contraseña *"
                    />
                    <ErrorMessage
                      className="error"
                      name="repContraseña"
                      component="div"
                    />
                  </div>
                </div>
                <MyCheckbox
                  name="checkbox"
                  checked={checked}
                  setChecked={setChecked}
                  setTermsModal={setTermsModal}
                  color="primary"
                >
                  Términos y condiciones
                </MyCheckbox>

                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn-primary"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Registrar
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
