import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { handleRegexDisable } from "../../utils/utilitaries";
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  MATCH,
  PASSN_MINLENGTH,
  PASS_INVALID,
} from "../../utils/constants";
import { MyCheckbox } from "../../components/Fields";
import { documents } from "../../actions/documents";
import { MyFormikDialog, MyModal } from "../../components/Modal";
import { registerBusiness } from "../../actions/register";
import { termsLoad } from "../../actions/termsLoad";

const FormDocument = () => {
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
      setFieldValue("numDocumento", "", false);
    }
    if (formField === "numDocumento") {
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
          required
          onChange={handleDocumentChange}
          onBlur={handleBlur}
        >
          <MenuItem disabled value={""}>
            <span className="empty--option">Tipo de documento</span>
          </MenuItem>
          {document &&
            document.map(({ id, descriptionLarge }) => (
              <MenuItem key={id} value={id}>
                {descriptionLarge}
              </MenuItem>
            ))}
        </Select>
      </div>
      <div className="txt-right-nomid">
        <TextField
          name="numDocumento"
          className="TxtField"
          variant="outlined"
          placeholder="Número de documento"
          label="Número de documento"
          required
          fullWidth
          value={values.numDocumento}
          error={!!errors.numDocumento && touched.numDocumento}
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
          name="numDocumento"
          component="div"
        />
      </div>
    </div>
  );
};

export const RegisterBusiness = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [checked, setChecked] = useState(false);

  if (termsModal) {
    dispatch(termsLoad(3));
  }

  useEffect(() => {
    if (logged) history.push("/");
    dispatch(documents());
  }, [logged, history, dispatch]);

  const handleShowPassword = (id) => {
    if (id === 1) {
      setShow(!show);
    } else if (id === 2) {
      setShow2(!show2);
    }
  };

  return (
    <>
      <MyModal link="/login/B" />

      <div className="page-container">
        <div className="login">
          <h3 className="register__subtitle">Doy un servicio</h3>
          <h1>Registra tu cuenta</h1>
          <Formik
            initialValues={{
              razon: "",
              nombre: "",
              nroDocumento: "",
              correo: "",
              contraseña: "",
              repContraseña: "",
              checkbox: false,
              nombres: "",
              apellidos: "",
              documentos: "",
              numDocumento: "",
              maxLengthValue: 8,
              minLengthValue: 8,
            }}
            validate={(values) => {
              const errors = {};

              if (values.nroDocumento.length < 11) {
                errors.nroDocumento =
                  "*El número de documento debe ser de 11 dígitos.";
              }

              if (!values.numDocumento) {
                errors.numDocumento = "";
              } else if (values.numDocumento.length < values.minLengthValue) {
                errors.numDocumento = `*El número de documento debe tener un mínimo de ${values.minLengthValue} dígitos`;
              }

              if (!EMAIL_REGEXP.test(values.correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (values.correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }

              if (!values.contraseña) {
                errors.contraseña = "";
              } else if (
                !PASSWORD_REGEXP.test(values.contraseña) ||
                values.contraseña.length < PASSN_MINLENGTH
              ) {
                errors.contraseña = PASS_INVALID;
              }

              if (!values.repContraseña) {
                errors.repContraseña = "";
              } else if (
                !PASSWORD_REGEXP.test(values.repContraseña) ||
                values.repContraseña.length < PASSN_MINLENGTH
              ) {
                errors.repContraseña = PASS_INVALID;
              } else if (values.contraseña !== values.repContraseña) {
                errors.repContraseña = MATCH;
              }

              if (values.checkbox === false) {
                errors.checkbox = "Debes aceptar los términos y condiciones";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const BusinessModel = {
                businessName: "",
                tradeName: "",
                documentNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                legalRepresentativeName: "",
                legalRepresentativeLastName: "",
                legalRepresentativeDocumentType: "",
                legalRepresentativeDocumentNumber: "",
              };

              BusinessModel.businessName = values.razon.trim();
              BusinessModel.tradeName = values.nombre.trim();
              BusinessModel.email = values.correo.trim();
              BusinessModel.documentNumber = values.nroDocumento;
              BusinessModel.password = values.contraseña.trim();
              BusinessModel.confirmPassword = values.repContraseña.trim();
              BusinessModel.legalRepresentativeName = values.nombres.trim();
              BusinessModel.legalRepresentativeLastName =
                values.apellidos.trim();
              BusinessModel.legalRepresentativeDocumentType = values.documentos;
              BusinessModel.legalRepresentativeDocumentNumber =
                values.numDocumento;

              (async () => {
                dispatch(registerBusiness(BusinessModel));
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
              <form name="formRegister" onSubmit={handleSubmit}>
                <MyFormikDialog
                  modal={termsModal}
                  setChecked={setChecked}
                  setTermsModal={setTermsModal}
                  text="hola"
                />
                <div className="files">
                  <div className="txt-left-nomid">
                    <TextField
                      name="razon"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Razón social"
                      label="Razón social"
                      required
                      fullWidth
                      value={values.razon}
                      error={!!errors.razon && touched.razon}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="txt-right-nomid">
                    <TextField
                      name="nombre"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Nombre comercial"
                      label="Nombre comercial"
                      required
                      fullWidth
                      value={values.nombre}
                      error={!!errors.nombre && touched.nombre}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="files">
                  <div className="txt-left-nomid">
                    <TextField
                      name="nroDocumento"
                      className="TxtField"
                      variant="outlined"
                      placeholder="RUC"
                      label="RUC"
                      required
                      fullWidth
                      value={values.nroDocumento}
                      error={!!errors.nroDocumento && touched.nroDocumento}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ maxLength: 11 }}
                      autoComplete="off"
                      onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="nroDocumento"
                      component="div"
                    />
                  </div>

                  <div className="txt-right-nomid">
                    <TextField
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Correo electrónico"
                      label="Correo electrónico"
                      type="email"
                      required
                      fullWidth
                      value={values.correo}
                      error={!!errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      required
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
                      placeholder="Contraseña"
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
                      required
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
                      placeholder="Contraseña"
                    />
                    <ErrorMessage
                      className="error"
                      name="repContraseña"
                      component="div"
                    />
                  </div>
                </div>
                <h3>Representante legal</h3>
                <div className="files">
                  <div className="txt-left-nomid">
                    <TextField
                      name="nombres"
                      type="text"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Nombres"
                      label="Nombres"
                      required
                      fullWidth
                      value={values.nombres}
                      error={!!errors.nombres && touched.nombres}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{
                        marginBottom: "5px",
                      }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                  <div className="txt-right-nomid">
                    <TextField
                      name="apellidos"
                      type="text"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Apellidos"
                      label="Apellidos"
                      required
                      fullWidth
                      value={values.apellidos}
                      error={!!errors.apellidos && touched.apellidos}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{
                        marginBottom: "5px",
                      }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                </div>

                <FormDocument />

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
                >
                  Registrar
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
