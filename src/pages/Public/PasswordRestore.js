import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ErrorMessage, Formik, useFormikContext } from "formik";

import { MATCH, PASSN_MINLENGTH, PASS_INVALID } from "../../utils/constants";
import { PASSWORD_REGEXP } from "../../utils/regexp";
import { MyModal } from "../../components/Modal";
import { passwordRestore } from "../../actions/passwordRecovery";

const FormText = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();

  useEffect(() => {
    if (localStorage.getItem("Recover email") !== null) {
      setFieldValue("correo", localStorage.getItem("Recover email"), true);
      localStorage.removeItem("Recover email");
    }
  }, [setFieldValue]);

  return (
    <>
      <TextField
        type="email"
        name="correo"
        className="TxtField"
        variant="outlined"
        label="Correo electronico"
        value={values.correo}
        required
        error={!!errors.correo && touched.correo}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />
    </>
  );
};

export const PasswordRestore = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { logged } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    if (logged) history.push("/");
    else if (params.value !== "C") {
      if (params.value !== "B") {
        history.push("/");
      }
    }
  }, [history, params.value, logged]);

  const handleShowPassword = (id) => {
    if (id === 1) {
      setShow(!show);
    } else if (id === 2) {
      setShow2(!show2);
    }
  };
  return (
    <>
      <MyModal link={`/login/${params.value}`} />
      <div
        className="page-container"
        style={{ margin: "11%  auto", padding: "0" }}
      >
        <div className="login">
          {params.value === "C" ? (
            <h3 className="register__subtitle">Soy un cliente</h3>
          ) : (
            <h3 className="register__subtitle">Doy un servicio</h3>
          )}
          <h1>Restaurar contraseña</h1>
          <div style={{ textAlign: "center" }}>
            <Formik
              initialValues={{
                correo: "",
                contraseña: "",
                repetirContraseña: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.contraseña) {
                  errors.contraseña = "";
                } else if (
                  !PASSWORD_REGEXP.test(values.contraseña) ||
                  values.contraseña.length < PASSN_MINLENGTH
                ) {
                  errors.contraseña = PASS_INVALID;
                }

                if (!values.repetirContraseña) {
                  errors.repetirContraseña = "";
                } else if (
                  !PASSWORD_REGEXP.test(values.repetirContraseña) ||
                  values.repetirContraseña.length < PASSN_MINLENGTH
                ) {
                  errors.repetirContraseña = PASS_INVALID;
                } else if (values.contraseña !== values.repetirContraseña) {
                  errors.repetirContraseña = MATCH;
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const RecoveryModel = {
                  email: "",
                  workflow: "",
                  newPassword: "",
                  confirmNewPassword: "",
                };

                RecoveryModel.email = values.correo;
                RecoveryModel.newPassword = values.contraseña;
                RecoveryModel.confirmNewPassword = values.repetirContraseña;
                RecoveryModel.workflow = params.value;

                (async () => {
                  dispatch(passwordRestore(RecoveryModel));
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
                <form name="formLogin" onSubmit={handleSubmit}>
                  <div className="files">
                    <FormText />
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
                        name="repetirContraseña"
                        fullWidth
                        required
                        autoComplete="off"
                        type={show2 ? "text" : "password"}
                        value={values.repetirContraseña}
                        error={
                          !!errors.repetirContraseña &&
                          touched.repetirContraseña
                        }
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
                        placeholder="Repite tu nueva contraseña"
                      />
                      <ErrorMessage
                        className="error"
                        name="repetirContraseña"
                        component="div"
                      />
                    </div>
                  </div>

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{
                      width: "80%",
                      margin: "10px auto",
                    }}
                    type="submit"
                  >
                    Enviar
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
