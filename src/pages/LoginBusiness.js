import React from "react";

import * as Yup from "yup";

import { Formik, Form } from "formik";
import { ArrowCircleSVG } from "../assets/images/svg";

import { MyModal } from "../components/Modal";
import { useHistory, useParams } from "react-router";
import { MyButton, MyPasswordInput, MyTextInput } from "../components/Fields";
import { useDispatch } from "react-redux";
import { login, logout } from "../actions/auth";
import { Link } from "react-router-dom";

export const LoginBusiness = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  // const { workflow, logged } = useSelector((state) => state.auth) || "";

  console.log(params);

  const handleLogout = () => {
    dispatch(logout());
  };

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
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Correo invalido")
                  .required("Requerido"),
                password: Yup.string().required("Requerido"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const LoginModel = {
                  username: "",
                  password: "",
                  workflow: "",
                };

                LoginModel.username = values.email;
                LoginModel.password = values.password;
                LoginModel.workflow = params.B;
                dispatch(login(LoginModel, params.B));
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form name="formLogin">
                  <MyTextInput
                    label="Correo"
                    name="email"
                    type="email"
                    placeholder="jane@gmail.com"
                    error={errors.email && touched.email}
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
              <Link to={`/password-recovery/${params.value}`}>
                Olvidé mi contraseña
              </Link>
            </div>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      </div>
    </>
  );
};
