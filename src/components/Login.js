import { Backdrop, Button, Fade, Modal, TextField } from "@material-ui/core";
import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import { handleRegexDisable } from "../utils/utilitaries";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      response: false,
      message: "",
    };
  }

  handleLogin = async (LoginModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkLoginApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/user/authenticate";

    const rspApi = Axios.post(linkLoginApi, LoginModel, {
      headers: headers,
    })
      .then((response) => {
        if (response.data.response === "true") {
          sessionStorage.setItem("tk", response.data.data.token);
          sessionStorage.setItem("logged", response.data.response);
          sessionStorage.setItem(
            "info",
            JSON.stringify(response.data.data.listMenu)
          );
          sessionStorage.setItem("workflow", LoginModel.workflow);

          if (LoginModel.workflow === "B") {
            // this.props.history.go(

            // );
            this.props.history.push("/business/category");
          }

          if (LoginModel.workflow === "C") {
            this.handleGetDataCustomer();
            // this.props.history.go();
            this.props.history.push("/");
          }
        }
        console.log(response);
        return response;
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.data.response === "false") {
          this.setState({
            modal: true,
            message: response.data.message,
          });
        }
      });
    return rspApi;
  };

  handleGetDataCustomer = () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/customer/getCustomer";

      const rspApi = Axios.get(linkDocumentsApi, {
        headers: headers,
      })
        .then((response) => {
          const { data } = response.data;
          // console.log(data);
          sessionStorage.setItem("name", data[0].name);
          localStorage.setItem("name", data[0].name);

          return response;
        })
        .catch((error) => {
          console.log(error);
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Fade in={this.state.modal}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "5",
                padding: "20px",
              }}
            >
              <p>{this.state.message}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                style={{
                  margin: "10px 0",
                  width: "80%",
                  textTransform: "capitalize",
                }}
                onClick={this.handleClose}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
        <div>
          <button
            className="arrow__button"
            onClick={() => this.props.history.goBack()}
          >
            <figure>
              <ArrowCircleSVG />
            </figure>
          </button>

          <div style={{ padding: "20px", width: "500px", margin: "50px auto" }}>
            {this.props.match.params.value === "C" ? (
              <h3 className="register__subtitle">Soy un cliente</h3>
            ) : (
              <h3 className="register__subtitle">Doy un servicio</h3>
            )}
            <h1>Inicia sesión</h1>

            <Formik
              ref={(ref) => (this.form = ref)}
              initialValues={{
                correo: "",
                contraseña: "",
              }}
              validate={{}}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const LoginModel = {
                  username: "",
                  password: "",
                  workflow: "",
                };

                LoginModel.username = values.correo;
                LoginModel.password = values.contraseña;
                LoginModel.workflow = this.props.match.params.value;

                (async () => {
                  await this.handleLogin(LoginModel);
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
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      label="Correo"
                      value={values.correo}
                      error={errors.correo && touched.correo}
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>

                  <div className="files">
                    <TextField
                      name="contraseña"
                      className="TxtField"
                      variant="outlined"
                      label="Contraseña"
                      type="password"
                      value={values.contraseña}
                      error={errors.contraseña && touched.contraseña}
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>

                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    style={{
                      margin: "10px 0",
                      textTransform: "capitalize",
                    }}
                    type="submit"
                    fullWidth
                  >
                    Iniciar sesión
                  </Button>
                </form>
              )}
            </Formik>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a href={`/password-recovery/${this.props.match.params.value}`}>
                Olvidé mi contraseña
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
