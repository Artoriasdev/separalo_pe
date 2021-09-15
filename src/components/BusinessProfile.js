import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import { PowerSettingsNew, Save } from "@material-ui/icons";
import ModalError from "./ModalError";
import ModalSucess from "./ModalSucess";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";
import FullPageLoader from "./FullPageLoader";

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: [],
      edit: false,
      showModalError: false,
      showModalSuccess: false,
      disclaimerModal: "",
      isLoading: false,
    };
  }
  handleEdit = () => {
    this.setState({ edit: true });
    console.log(this.state.edit);
  };

  componentDidMount() {
    try {
      (async () => {
        await this.handleGetData();
      })();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetData = async () => {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusiness";

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            sessionStorage.setItem("tradename", data[0].name);
            this.setState({
              typeData: data,
            });

            const Formik = this.form;
            Formik.setFieldValue("nombreCompañia", this.state.typeData[0].name);
            Formik.setFieldValue(
              "nombreComercial",
              this.state.typeData[0].tradename
            );
            Formik.setFieldValue(
              "numeroDocumento",
              this.state.typeData[0].documentNumber
            );
            Formik.setFieldValue("correo", this.state.typeData[0].email);
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no está autorizado para ver esta información",
            });
          }
          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            sessionStorage.removeItem("tk");
            sessionStorage.removeItem("logo");
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("tradename");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("id");
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Sesión expirada, porfavor vuelva a iniciar sesión",
              isLoading: false,
            });
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };
  handleEditData = async (dataModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/updateBusiness";

    const rspApi = axios
      .put(linkEditApi, dataModel, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.response);
        this.setState({
          isLoading: true,
        });
        if (response.data.response === "true") {
          this.setState({
            showModalSuccess: true,
            disclaimerModal: response.data.message,
            isLoading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          showModalError: true,
          disclaimerModal:
            "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
          isLoading: false,
        });
      });

    return rspApi;
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
    this.props.history.go();
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSuccess: false,
    });
    this.props.history.go();
  };

  //componentDidMount ,handlers
  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  handleLogout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("info");
    sessionStorage.removeItem("workflow");
    sessionStorage.removeItem("tk");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("tradename");
    sessionStorage.removeItem("logo");
    this.props.history.go(this.props.history.push("/"));
  };

  render() {
    return (
      <>
        <FullPageLoader isLoading={this.state.isLoading} />
        <ModalError
          show={this.state.showModalError}
          closeCallback={this.toggleModalError}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalError>
        <ModalSucess
          show={this.state.showModalSuccess}
          closeCallback={this.toggleModalSuccess}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalSucess>

        <div className="header-profile-container">
          <div className="header-profile">
            <img src={sessionStorage.getItem("logo")} alt="test" />
            <div className="title">
              <p>{sessionStorage.getItem("tradename")}</p>
            </div>
            <div className="button-container">
              <div>
                <button onClick={this.handleRedirect} className="button_ref">
                  Datos de la empresa
                </button>
              </div>
              <div className="button">
                <button
                  onClick={this.handleRedirectBank}
                  className="button_ref"
                >
                  Datos bancarios
                </button>
              </div>

              <div className="logout">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PowerSettingsNew />}
                  className="btn-logout"
                  onClick={this.handleLogout}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="form">
          <h1>Datos de negocio</h1>
          <Button
            variant="contained"
            color="secondary"
            className="btn-primary"
            startIcon={<Edit />}
            style={{ marginTop: "-14px" }}
            onClick={this.handleEdit}
          >
            Editar datos
          </Button>
          <hr />
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              nombreCompañia: "",
              nombreComercial: "",
              numeroDocumento: "",
              correo: "",
            }}
            validate={(values) => {
              const { numeroDocumento, correo } = values;

              let errors = {};

              if (numeroDocumento.length < 11) {
                errors.numeroDocumento =
                  "El número de documento debe ser de 11 dígitos.";
              }

              if (!EMAIL_REGEXP.test(correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const dataModel = {
                businessName: "",
                tradeName: "",
                documentNumber: "",
                email: "",
              };

              dataModel.businessName = values.nombreCompañia;
              dataModel.tradeName = values.nombreComercial;
              dataModel.documentNumber = values.numeroDocumento;
              dataModel.email = values.correo;

              (async () => {
                await this.handleEditData(dataModel);
              })();

              // aqui los getter y handler
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
              <form name="formData" onSubmit={handleSubmit}>
                <h2>Datos de la empresa</h2>
                <div className="files">
                  <div className="txt-left">
                    <TextField
                      name="nombreCompañia"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Nombre de la compañía"
                      fullWidth
                      value={values.nombreCompañia}
                      error={errors.nombreCompañia && touched.nombreCompañia}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      required
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                  <div className="txt-right">
                    <TextField
                      name="nombreComercial"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Nombre comercial de la compañía"
                      fullWidth
                      value={values.nombreComercial}
                      error={errors.nombreComercial && touched.nombreComercial}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      disabled={!this.state.edit}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                  </div>
                </div>
                <div className="files">
                  <div className="txt-left">
                    <TextField
                      name="numeroDocumento"
                      className="TxtField"
                      variant="outlined"
                      placeholder="RUC"
                      fullWidth
                      value={values.numeroDocumento}
                      error={errors.numeroDocumento && touched.numeroDocumento}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      required
                      inputProps={{
                        maxLength: 11,
                      }}
                      onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="numeroDocumento"
                      component="div"
                    />
                  </div>
                  <div className="txt-right">
                    <TextField
                      name="correo"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Correo de la empresa"
                      fullWidth
                      value={values.correo}
                      error={errors.correo && touched.correo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!this.state.edit}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="correo"
                      component="div"
                    />
                  </div>
                </div>
                {this.state.edit ? (
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      startIcon={<Save />}
                      style={{ marginTop: "10px" }}
                    >
                      Guardar datos
                    </Button>
                  </div>
                ) : null}
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default BusinessProfile;
