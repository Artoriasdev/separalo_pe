import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import { ArrowCircleSVG } from "../../assets/images/svg";
import { MyModal } from "../../components/Modal";
import {
  MyButton,
  MyPasswordInput,
  MyTextInput,
} from "../../components/Fields";
import { login } from "../../actions/auth";
import { EMAIL_INVALID, REQUIRED } from "../../utils/constants";

export const LoginBusiness = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <>
      <MyModal />
      <div>
        <button className="arrow__button" onClick={() => history.goBack()}>
          <figure>
            <ArrowCircleSVG />
          </figure>
        </button>

        <div className="page-container">
          <div className="login">
            <h3 className="register__subtitle">Doy un servicio</h3>
            <h1>Inicia sesión</h1>

            <Formik
              initialValues={{
                username: "",
                password: "",
                workflow: params.B,
              }}
              validationSchema={Yup.object({
                username: Yup.string().email(EMAIL_INVALID).required(REQUIRED),
                password: Yup.string().required(REQUIRED),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                dispatch(login(values, params.B));
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form name="formLogin">
                  <MyTextInput
                    label="Correo"
                    name="username"
                    type="username"
                    placeholder="jane@gmail.com"
                    error={errors.username && touched.username}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  />

                  <MyPasswordInput
                    fullWidth
                    label="Contraseña"
                    name="password"
                    error={errors.password && touched.password}
                    style={{ marginBottom: "10px" }}
                  />

                  <MyButton
                    type="submit"
                    disabled={isSubmitting}
                    style={{ margin: "0" }}
                  >
                    Iniciar sesión
                  </MyButton>
                </Form>
              )}
            </Formik>
            <div className="recover-password-button">
              <Link to={`/password-recovery/${params.B}`}>
                Olvidé mi contraseña
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
