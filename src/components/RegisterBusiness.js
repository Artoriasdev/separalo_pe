import React from "react";
import { Component } from "react";
import { ArrowCircleSVG } from "../assets/images/svg";
import Axios from "axios";
import { Formik } from "formik";
import ModalSucess from "./ModalSucess";
import { TextField, Button, Modal, Fade, Backdrop } from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";

class RegisterBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeDocs: [],
      typeCategorys: [],
      showModalSucesss: false,
      disclaimerModal: "",
      response: false,
    };
  }

  componentDidMount() {
    try {
      this.handleGetDocuments();
      this.handleGetCategorys();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetDocuments = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getDocumentTypes";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;

      this.setState({
        typeDocs: data,
      });

      return response;
    });
    return rspApi;
  };

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;

      this.setState({
        typeCategorys: data,
      });

      return response;
    });
    return rspApi;
  };

  handleInfoSubmit = async (BusinessModel) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };
    let linkRegisterApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/registerBusiness";

    const rspApi = Axios.post(linkRegisterApi, BusinessModel, {
      headers: headers,
    }).then((response) => {
      const { data } = response;

      if (data.response === "false") {
        this.setState({
          showModalSucesss: true,
          disclaimerModal: data.message,
        });
      }
      return response;
    });

    return rspApi;
  };

  toggleModalSuccess = () => {
    this.setState({
      showModalSucesss: false,
    });
    if (this.state.response === true) {
      this.props.history.push("/login/B");
    }
  };

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.showModalSucesss}
          closeAfterTransition
          onClose={this.toggleModalSuccess}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="modal-container"
        >
          <Fade in={this.state.showModalSucesss}>
            <div className="modal-message-container">
              <p>{this.state.disclaimerModal}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={this.toggleModalSuccess}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>

        <div
          className="page-container"
          style={{ width: "500px", margin: "50px auto" }}
        >
          <h3 className="register__subtitle">Doy un servicio</h3>
          <h1>Registra tu cuenta</h1>
          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              razon: "",
              nombre: "",
              nroDocumento: "",
              correo: "",
              contraseña: "",
              repContraseña: "",
            }}
            validate={{}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const BusinessModel = {
                businessName: "",
                tradeName: "",
                documentNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
              };

              BusinessModel.businessName = values.razon;
              BusinessModel.tradeName = values.nombre;
              BusinessModel.email = values.correo;
              BusinessModel.mobile = values.celular;
              BusinessModel.documentNumber = values.nroDocumento;
              BusinessModel.password = values.contraseña;
              BusinessModel.confirmPassword = values.repContraseña;
              BusinessModel.idCategory = values.categoria;

              (async () => {
                const responseSubmit = await this.handleInfoSubmit(
                  BusinessModel
                );

                const { response } = responseSubmit.data;

                if (response === "true") {
                  this.setState({
                    showModalSucesss: true,
                    disclaimerModal: "¡Registro grabado satisfactoriamente!",
                    response: true,
                  });
                }
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
                <div className="files">
                  <TextField
                    name="razon"
                    className="TxtField"
                    variant="outlined"
                    label="Razón social"
                    required
                    fullWidth
                    value={values.razon}
                    error={errors.razon && touched.razon}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

                  <TextField
                    name="nombre"
                    className="TxtField"
                    variant="outlined"
                    label="Nombre comercial"
                    required
                    fullWidth
                    value={values.nombre}
                    error={errors.nombre && touched.nombre}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                </div>

                <div className="files">
                  <TextField
                    name="nroDocumento"
                    className="TxtField"
                    variant="outlined"
                    label="Número de documento"
                    required
                    type="number"
                    fullWidth
                    value={values.nroDocumento}
                    error={errors.nroDocumento && touched.nroDocumento}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />

                  <TextField
                    name="correo"
                    className="TxtField"
                    variant="outlined"
                    label="Correo electrónico"
                    type="email"
                    required
                    fullWidth
                    value={values.correo}
                    error={errors.correo && touched.correo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
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
                    type="password"
                    className="TxtField"
                    variant="outlined"
                    label="Contraseña"
                    required
                    fullWidth
                    value={values.contraseña}
                    error={errors.contraseña && touched.contraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    // inputProps={{
                    //   maxLength: 9,
                    // }}
                    onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                  />
                  <TextField
                    name="repContraseña"
                    type="password"
                    className="TxtField"
                    variant="outlined"
                    label="Repetir contraseña"
                    required
                    fullWidth
                    value={values.repContraseña}
                    error={errors.repContraseña && touched.repContraseña}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                      marginLeft: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
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
                  type="submit"
                  fullWidth
                >
                  Regístrar
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default RegisterBusiness;
