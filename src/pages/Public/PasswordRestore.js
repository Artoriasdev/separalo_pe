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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        type="email"
        name="correo"
        className="TxtField"
        variant="outlined"
        label="Correo electronico *"
        value={values.correo}
        error={!!errors.correo && touched.correo}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />
      <ErrorMessage className="error" name="correo" component="div" />
    </div>
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
          <h1>Restaurar contrase??a</h1>
          <div style={{ textAlign: "center" }}>
            <Formik
              initialValues={{
                correo: "",
                contrase??a: "",
                repetirContrase??a: "",
              }}
              validate={(values) => {
                const errors = {};

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

                if (values.repetirContrase??a.trim().length < 1) {
                  errors.repetirContrase??a = REQUIRED;
                } else if (
                  !PASSWORD_REGEXP.test(values.repetirContrase??a) ||
                  values.repetirContrase??a.length < PASSN_MINLENGTH
                ) {
                  errors.repetirContrase??a = PASS_INVALID;
                } else if (values.contrase??a !== values.repetirContrase??a) {
                  errors.repetirContrase??a = MATCH;
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
                RecoveryModel.newPassword = values.contrase??a;
                RecoveryModel.confirmNewPassword = values.repetirContrase??a;
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
                              aria-label="toggle password visibility"
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
                        name="repetirContrase??a"
                        fullWidth
                        autoComplete="off"
                        type={show2 ? "text" : "password"}
                        value={values.repetirContrase??a}
                        error={
                          !!errors.repetirContrase??a &&
                          touched.repetirContrase??a
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
                        placeholder="Repite tu nueva contrase??a *"
                      />
                      <ErrorMessage
                        className="error"
                        name="repetirContrase??a"
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
