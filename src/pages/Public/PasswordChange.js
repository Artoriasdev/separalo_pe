import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ErrorMessage, Formik } from "formik";

import { Button, TextField } from "@mui/material";
import { Save, Visibility, VisibilityOff } from "@mui/icons-material";

import { PASSWORD_REGEXP } from "../../utils/regexp";
import {
  MATCH,
  PASSN_MINLENGTH,
  PASS_INVALID,
  REQUIRED,
} from "../../utils/constants";
import { useState } from "react";
import { MyModal } from "../../components/Modal";
import { changePassword } from "../../actions/changePassword";

export const Password = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { logged } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (!logged) history.push("/");
  }, [logged, history]);

  const handleViewPassword = () => {
    setShow(!show);
  };

  return (
    <>
      <MyModal link="/" />

      <div className="page-container">
        <div className="login">
          <Formik
            initialValues={{
              contraseña: "",
              cambiarContraseña: "",
              repetirContraseña: "",
            }}
            validate={(values) => {
              const errors = {};

              if (values.contraseña.trim().length < 1) {
                errors.contraseña = REQUIRED;
              } else if (
                values.contraseña.length < PASSN_MINLENGTH ||
                !PASSWORD_REGEXP.test(values.contraseña)
              ) {
                errors.contraseña = PASS_INVALID;
              }

              if (values.cambiarContraseña.trim().length < 1) {
                errors.cambiarContraseña = REQUIRED;
              } else if (
                values.cambiarContraseña.length < PASSN_MINLENGTH ||
                !PASSWORD_REGEXP.test(values.cambiarContraseña)
              ) {
                errors.cambiarContraseña = PASS_INVALID;
              }

              if (values.repetirContraseña.trim().length < 1) {
                errors.repetirContraseña = REQUIRED;
              } else if (
                !PASSWORD_REGEXP.test(values.repetirContraseña) ||
                values.repetirContraseña.length < PASSN_MINLENGTH
              ) {
                errors.repetirContraseña = PASS_INVALID;
              } else if (
                values.cambiarContraseña !== values.repetirContraseña
              ) {
                errors.repetirContraseña = MATCH;
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const dataModel = {
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              };

              dataModel.currentPassword = values.contraseña;
              dataModel.newPassword = values.cambiarContraseña;
              dataModel.confirmNewPassword = values.repetirContraseña;

              // aqui los getter y handler

              (async () => {
                dispatch(changePassword(dataModel, token));
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
              <form name="formPassword" onSubmit={handleSubmit}>
                <h1
                  style={{
                    marginTop: "5%",
                    marginBottom: "30px",
                    textAlign: "center",
                  }}
                >
                  Cambio de contraseña
                </h1>

                {show ? (
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    color="primary"
                    className="btn-primary"
                    style={{ marginBottom: "10px" }}
                    onClick={handleViewPassword}
                  >
                    Ocultar contraseñas
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<VisibilityOff />}
                    color="primary"
                    className="btn-primary"
                    style={{ marginBottom: "10px" }}
                    onClick={handleViewPassword}
                  >
                    Ver contraseñas
                  </Button>
                )}

                <div className="files">
                  <TextField
                    name="contraseña"
                    className="TxtField"
                    variant="outlined"
                    label="Contraseña actual *"
                    value={values.contraseña}
                    error={!!errors.contraseña && touched.contraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    type={show ? "text" : "password"}
                    style={{
                      backgroundColor: "white",
                      marginRight: "51%",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  />
                </div>
                <ErrorMessage
                  className="error"
                  name="contraseña"
                  component="div"
                />

                <div className="files">
                  <div className="txt-left-nomid">
                    <TextField
                      name="cambiarContraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Ingresa tu nueva contraseña *"
                      fullWidth
                      value={values.cambiarContraseña}
                      error={
                        !!errors.cambiarContraseña && touched.cambiarContraseña
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={show ? "text" : "password"}
                    />
                    <ErrorMessage
                      className="error"
                      name="cambiarContraseña"
                      component="div"
                    />
                  </div>

                  <div className="txt-right-nomid">
                    <TextField
                      name="repetirContraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Repite tu nueva contraseña *"
                      value={values.repetirContraseña}
                      fullWidth
                      error={
                        !!errors.repetirContraseña && touched.repetirContraseña
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={show ? "text" : "password"}
                    />
                    <ErrorMessage
                      className="error"
                      name="repetirContraseña"
                      component="div"
                    />
                  </div>
                </div>

                <div className="files">
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className="btn-primary"
                    startIcon={<Save />}
                    style={{ margin: "10px auto" }}
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Cambiar contraseña
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
