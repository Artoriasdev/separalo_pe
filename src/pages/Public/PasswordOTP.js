import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@mui/material";

import { Formik, ErrorMessage, useFormikContext } from "formik";

import { MyModal } from "../../components/Modal";
import { passwordRecoveryOTP } from "../../actions/passwordRecovery";
import { EMAIL_REGEXP } from "../../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../../utils/constants";

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
        label="Ingrese su correo electrónico"
        value={values.correo}
        error={!!errors.correo && touched.correo}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
      />
      <ErrorMessage className="error" name="correo" component="div" />
    </>
  );
};

export const PasswordOTP = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logged) history.push("/");
    else if (params.value !== "C") {
      if (params.value !== "B") {
        history.push("/");
      }
    }
  }, [history, params.value, logged]);

  return (
    <>
      <MyModal link={`/password-restore/${params.value}`} />
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
          <h1>Olvidaste tu contraseña</h1>
          <div style={{ textAlign: "center" }}>
            <Formik
              initialValues={{
                correo: "",
                otp: "",
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

                if (values.otp.trim().length < 1) {
                  errors.otp = REQUIRED;
                } else if (values.otp.length < 5) {
                  errors.otp = "*El código debe ser de 5 dígitos";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const RecoveryModel = {
                  email: "",
                  workflow: "",
                  otp: "",
                };

                RecoveryModel.email = values.correo;
                RecoveryModel.otp = values.otp;
                RecoveryModel.workflow = params.value;

                (async () => {
                  dispatch(passwordRecoveryOTP(RecoveryModel));
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
                    <div className="txt-left-nomid">
                      <FormText />
                    </div>
                    <div className="txt-right-nomid">
                      <TextField
                        name="otp"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Ingrese su código"
                        value={values.otp}
                        error={errors.otp && touched.otp}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{
                          maxLength: 5,
                        }}
                      />
                      <ErrorMessage
                        className="error"
                        name="otp"
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
