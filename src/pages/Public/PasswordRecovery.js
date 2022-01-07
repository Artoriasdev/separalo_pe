import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Button, TextField } from "@mui/material";

import { ErrorMessage, Formik } from "formik";
import { MyModal } from "../../components/Modal";
import { passwordRecovery } from "../../actions/passwordRecovery";
import { EMAIL_REGEXP } from "../../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../../utils/constants";

export const PasswordRecovery = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logged) history.push("/");
    else if (params.value !== "C") {
      if (params.value !== "B") history.push("/");
    }
  }, [history, logged, params.value]);
  return (
    <>
      <MyModal link={`/password-recovery-otp/${params.value}`} />
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

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const RecoveryModel = {
                  email: "",
                  workflow: "",
                };

                RecoveryModel.email = values.correo;
                RecoveryModel.workflow = params.value;

                (async () => {
                  dispatch(passwordRecovery(RecoveryModel));
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
                    <TextField
                      type="email"
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      label="Ingrese su correo electrónico *"
                      value={values.correo}
                      error={errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      style={{
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                  <ErrorMessage
                    className="error"
                    name="correo"
                    component="div"
                  />

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{
                      width: "80%",
                      margin: "10px auto",
                      textTransform: "capitalize",
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
