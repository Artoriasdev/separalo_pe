import React from "react";
import { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { handleRegexDisable } from "../utils/utilitaries";
import Edit from "@material-ui/icons/Edit";
import { PowerSettingsNew, Save } from "@material-ui/icons";
import axios from "axios";
import ModalError from "./ModalError";
import ModalSucess from "./ModalSucess";
import { EMAIL_REGEXP } from "../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
} from "../utils/constants";

class BusinessProfileBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      typeBank: [],
      typeAccount: [],
      editButton: false,
      showModalError: false,
      showModalSuccess: false,
      disclaimerModal: "",
    };
  }

  componentDidMount() {
    try {
      this.handleGetTypeBank();
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
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusinessBankData";

      const rspApi = await axios
        .get(linkDocumentsApi, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.response === "true") {
            const { data } = response.data;
            this.setState({
              formModel: data,
            });

            this.handleGetTypeAccount(this.state.formModel[0].idBank);
            const Formik = this.form;
            Formik.setFieldValue(
              "numeroCuenta",
              this.state.formModel[0].accountNumber
            );
            Formik.setFieldValue(
              "numeroInterbancario",
              this.state.formModel[0].interbankAccountNumber
            );
            Formik.setFieldValue(
              "correoBancario",
              this.state.formModel[0].email
            );
            Formik.setFieldValue("bancoId", this.state.formModel[0].idBank);
            Formik.setFieldValue(
              "tipoId",
              this.state.formModel[0].idAccountType
            );
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no esta autorizado para ver esta información",
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
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  };

  handleGetTypeBank = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getBanks";

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          typeBank: data,
        });

        return response;
      });
    return rspApi;
  };
  //hacer handleChangeDocumentType
  handleGetTypeAccount = (id) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getBanksAccountType/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          typeAccount: data,
        });

        return response;
      });
    return rspApi;
  };

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "bancoId") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("tipoId", "", true);
      formik.setFieldValue("numeroCuenta", "", true);
      this.handleGetTypeAccount(value);
    }
    if (formField === "tipoId") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("numeroCuenta", "", true);
    }
    if (formField === "numeroCuenta") {
      const { tipoId } = formik.state.values;
      formik.setFieldValue(formField, value, true);

      let maxLengthInput = 10;
      if (tipoId === 1) maxLengthInput = 14;
      if (tipoId === 2 || tipoId === 5 || tipoId === 6) maxLengthInput = 13;
      if (tipoId === 3 || tipoId === 4) maxLengthInput = 18;
      if (tipoId === 7 || tipoId === 8) maxLengthInput = 10;

      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue(formField, value.toUpperCase(), true);
    }
  };

  handleEditData = async (bankModel) => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };
    let linkEditApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/updateBusinessBankData";

    const rspApi = axios
      .put(linkEditApi, bankModel, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.response === "true") {
          this.setState({
            showModalSuccess: true,
            disclaimerModal: response.data.message,
          });
        }
        return response;
      });

    return rspApi;
  };

  handleEdit = () => {
    this.setState({ editButton: true });
  };

  handleRedirect = () => {
    this.props.history.push("/business/profile");
  };
  handleRedirectBank = () => {
    this.props.history.push("/business/profile/bank");
  };
  handleRedirectPassword = () => {
    this.props.history.push("/business/profile/password");
  };

  handleRedirectRegister = () => {
    this.props.history.push("/business/profile/register-data-bank");
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

  render() {
    return (
      <>
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
            <div>
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

        <div className="form">
          <h1>Datos de negocio</h1>
          <Button
            variant="contained"
            color="secondary"
            className="btn-primary"
            startIcon={<Edit />}
            style={{ marginTop: "-14px" }}
            onClick={this.handleEdit}
            disabled={this.state.formModel === undefined}
          >
            Editar datos
          </Button>
          <hr />

          <Formik
            ref={(ref) => (this.form = ref)}
            initialValues={{
              numeroCuenta: "",
              numeroInterbancario: "",
              correoBancario: "",
              bancoId: "",
              tipoId: "",
              maxLengthValue: 10,
            }}
            validate={(values) => {
              const {
                numeroCuenta,
                maxLengthValue,
                correoBancario,
                bancoId,
                numeroInterbancario,
              } = values;

              let errors = {};

              if (!EMAIL_REGEXP.test(correoBancario)) {
                errors.correoBancario = EMAIL_INVALID;
              } else if (correoBancario.length < E_MINLENGTH) {
                errors.correoBancario = EMAIL_MINLENGTH;
              }

              if (!numeroCuenta) {
                errors.numeroCuenta = "";
              } else if (numeroCuenta.length < maxLengthValue) {
                errors.numeroCuenta = `El número de cuenta debe tener ${values.maxLengthValue} dígitos`;
              } else if (!numeroCuenta.startsWith("0011") && bancoId === 2) {
                errors.numeroCuenta =
                  "El número de cuenta debe comenzar con 0011";
              }

              if (!numeroInterbancario) {
                errors.numeroInterbancario = "";
              } else if (numeroInterbancario.length < 6) {
                errors.numeroInterbancario =
                  "El número de cuenta debe tener mínimo 6 dígitos";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const bankModel = {
                accountNumber: "",
                interbankAccountNumber: "",
                email: "",
                idBankAccountType: "",
                idBank: "",
              };

              bankModel.accountNumber = values.numeroCuenta;
              bankModel.interbankAccountNumber = values.numeroInterbancario;
              bankModel.email = values.correoBancario;
              bankModel.idBank = values.bancoId;
              bankModel.idBankAccountType = values.tipoId;

              (async () => {
                await this.handleEditData(bankModel);
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
              <form name="formBank" onSubmit={handleSubmit}>
                <h2 style={{ marginTop: "17.43px" }}>Datos bancarios</h2>

                {this.state.formModel === undefined ? (
                  <div>
                    Usted no cuenta con ningún dato bancario, favor de registrar
                    sus datos{" "}
                    <button
                      onClick={this.handleRedirectRegister}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      aquí
                    </button>
                  </div>
                ) : null}

                <div className="files">
                  <Select
                    value={values.bancoId}
                    error={errors.bancoId && touched.bancoId}
                    name="bancoId"
                    onChange={this.handleDocumentChange}
                    onBlur={handleBlur}
                    required
                    variant="outlined"
                    fullWidth
                    disabled={!this.state.editButton}
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      marginBottom: "5px",
                    }}
                    displayEmpty
                  >
                    <MenuItem disabled value={""}>
                      Nombre de banco
                    </MenuItem>
                    {this.state.typeBank &&
                      this.state.typeBank.map(({ id, name }) => (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
                <div className="files">
                  <div className="txt-left">
                    <Select
                      value={values.tipoId}
                      error={errors.tipoId && touched.tipoId}
                      name="tipoId"
                      onChange={this.handleDocumentChange}
                      onBlur={handleBlur}
                      required
                      variant="outlined"
                      fullWidth
                      displayEmpty
                      disabled={!this.state.editButton}
                    >
                      <MenuItem disabled value={""}>
                        Tipo de cuenta
                      </MenuItem>
                      {this.state.typeAccount &&
                        this.state.typeAccount.map(({ id, description }) => (
                          <MenuItem key={id} value={id}>
                            {description}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  <div className="txt-right">
                    <TextField
                      name="numeroCuenta"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Número de cuenta"
                      fullWidth
                      value={values.numeroCuenta}
                      error={errors.numeroCuenta && touched.numeroCuenta}
                      onBlur={handleBlur}
                      onChange={this.handleDocumentChange}
                      required
                      disabled={!this.state.editButton}
                      autoComplete="off"
                      inputProps={{
                        maxLength: values.maxLengthValue,
                      }}
                      onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="numeroCuenta"
                      component="div"
                    />
                  </div>
                </div>
                <div className="files">
                  <div className="txt-left">
                    <TextField
                      name="numeroInterbancario"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Número de cuenta interbancario"
                      fullWidth
                      disabled={!this.state.editButton}
                      value={values.numeroInterbancario}
                      error={
                        errors.numeroInterbancario &&
                        touched.numeroInterbancario
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      inputProps={{
                        maxLength: 20,
                      }}
                      onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="numeroInterbancario"
                      component="div"
                    />
                  </div>

                  <div className="txt-right">
                    <TextField
                      name="correoBancario"
                      className="TxtField"
                      variant="outlined"
                      placeholder="Correo bancario"
                      fullWidth
                      disabled={!this.state.editButton}
                      autoComplete="off"
                      value={values.correoBancario}
                      error={errors.correoBancario && touched.correoBancario}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      // inputProps={{
                      //   maxLength: 9,
                      // }}
                      onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                    />
                    <ErrorMessage
                      className="error"
                      name="correoBancario"
                      component="div"
                    />
                  </div>
                </div>
                {this.state.editButton ? (
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary"
                      startIcon={<Save />}
                      style={{ marginTop: "10px" }}
                    >
                      Guardar datos bancarios
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

export default BusinessProfileBank;
