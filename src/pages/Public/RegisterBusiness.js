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
  REQUIRED,
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
          name="numDocumento"
          className="TxtField"
          variant="outlined"
          placeholder="N??mero de documento"
          label="N??mero de documento *"
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
              contrase??a: "",
              repContrase??a: "",
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

              if (values.documentos === "") {
                errors.documentos = REQUIRED;
              }

              if (values.razon.trim().length < 1) {
                errors.razon = REQUIRED;
              }

              if (values.nombre.trim().length < 1) {
                errors.nombre = REQUIRED;
              }

              if (values.nombres.trim().length < 1) {
                errors.nombres = REQUIRED;
              }

              if (values.apellidos.trim().length < 1) {
                errors.apellidos = REQUIRED;
              }

              if (values.nroDocumento.trim().length < 1) {
                errors.nroDocumento = REQUIRED;
              } else if (values.nroDocumento.trim().length < 11) {
                errors.nroDocumento =
                  "*El n??mero de documento debe ser de 11 d??gitos.";
              }

              if (values.numDocumento.trim().length < 1) {
                errors.numDocumento = REQUIRED;
              } else if (
                values.numDocumento.trim().length < values.minLengthValue
              ) {
                errors.numDocumento = `*El n??mero de documento debe tener un m??nimo de ${values.minLengthValue} d??gitos`;
              }

              if (values.correo.trim().length < 1) {
                errors.correo = REQUIRED;
              } else if (!EMAIL_REGEXP.test(values.correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (values.correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }

              if (values.contrase??a.trim().length < 1) {
                errors.contrase??a = REQUIRED;
              } else if (
                !PASSWORD_REGEXP.test(values.contrase??a) ||
                values.contrase??a.length < PASSN_MINLENGTH
              ) {
                errors.contrase??a = PASS_INVALID;
              }

              if (values.repContrase??a.trim().length < 1) {
                errors.repContrase??a = REQUIRED;
              } else if (
                !PASSWORD_REGEXP.test(values.repContrase??a) ||
                values.repContrase??a.length < PASSN_MINLENGTH
              ) {
                errors.repContrase??a = PASS_INVALID;
              } else if (values.contrase??a !== values.repContrase??a) {
                errors.repContrase??a = MATCH;
              }

              if (values.checkbox === false) {
                errors.checkbox = "Debes aceptar los t??rminos y condiciones";
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
              BusinessModel.password = values.contrase??a.trim();
              BusinessModel.confirmPassword = values.repContrase??a.trim();
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
                />
                <div className="files">
                  <div className="txt-left-nomid">
                    <TextField
                      name="razon"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Raz??n social"
                      label="Raz??n social *"
                      fullWidth
                      value={values.razon}
                      error={!!errors.razon && touched.razon}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      className="error"
                      name="razon"
                      component="div"
                    />
                  </div>

                  <div className="txt-right-nomid">
                    <TextField
                      name="nombre"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Nombre comercial"
                      label="Nombre comercial *"
                      fullWidth
                      value={values.nombre}
                      error={!!errors.nombre && touched.nombre}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      className="error"
                      name="nombre"
                      component="div"
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
                      label="RUC *"
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
                      placeholder="Correo electr??nico"
                      label="Correo electr??nico *"
                      type="email"
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
                      name="contrase??a"
                      fullWidth
                      autoComplete="off"
                      type={show ? "text" : "password"}
                      value={values.contrase??a}
                      error={!!errors.contrase??a && touched.contrase??a}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility *"
                            onClick={() => handleShowPassword(1)}
                            edge="end"
                          >
                            {show ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Contrase??a *"
                    />
                    <ErrorMessage
                      className="error"
                      name="contrase??a"
                      component="div"
                    />
                  </div>
                  <div className="txt-right-nomid">
                    <OutlinedInput
                      name="repContrase??a"
                      fullWidth
                      autoComplete="off"
                      type={show2 ? "text" : "password"}
                      value={values.repContrase??a}
                      error={!!errors.repContrase??a && touched.repContrase??a}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility *"
                            onClick={() => handleShowPassword(2)}
                            edge="end"
                          >
                            {show2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Repetir contrase??a *"
                    />
                    <ErrorMessage
                      className="error"
                      name="repContrase??a"
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
                      label="Nombres *"
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
                    <ErrorMessage
                      className="error"
                      name="nombres"
                      component="div"
                    />
                  </div>
                  <div className="txt-right-nomid">
                    <TextField
                      name="apellidos"
                      type="text"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Apellidos"
                      label="Apellidos *"
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
                    <ErrorMessage
                      className="error"
                      name="apellidos"
                      component="div"
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
                  T??rminos y condiciones
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
