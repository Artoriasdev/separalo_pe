import React, { useEffect, useState } from "react";

import { ErrorMessage, Formik, useFormikContext } from "formik";

import { Button, MenuItem, Select, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { handleRegexDisable } from "../../utils/utilitaries";
import { EMAIL_REGEXP } from "../../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../../utils/constants";
import { MyModal } from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { documents } from "../../actions/documents";
import { categoryComplaint } from "../../actions/categoryComplaint";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { registerComplain } from "../../actions/registerComplain";

const FormDocumentChange = () => {
  const [typeDocs, setTypeDocs] = useState([]);
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();
  const { documentsList } = useSelector((state) => state.documents);

  const customer = documentsList.filter(
    (element) => element.descriptionLarge !== "RUC"
  );
  const business = documentsList.filter(
    (element) => element.descriptionLarge === "RUC"
  );

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "tipoCliente") {
      setFieldValue(formField, value, true);
      setFieldValue("tipoDocumento", "", false);
      setFieldValue("numDocumento", "", false);
      if (value === "C") {
        setTypeDocs(customer);
      } else if (value === "B") {
        setTypeDocs(business);
      } else if (value === "U") {
        setTypeDocs(customer);
      }
    }

    if (formField === "tipoDocumento") {
      setFieldValue(formField, value, true);
      setFieldValue("numDocumento", "", false);
    }
    if (formField === "numDocumento") {
      const { tipoDocumento } = values;
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = typeDocs.find((arreglo) => arreglo.id === tipoDocumento);
      if (id !== undefined) {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (tipoDocumento === "04" || tipoDocumento === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      setFieldValue("maxLengthValue", maxLengthInput, true);
      setFieldValue("minLengthValue", minLengthInput, true);
      setFieldValue("ingreso", valor, true);
      setFieldValue(formField, value.toUpperCase(), true);
    }
  };

  return (
    <>
      <div className="files">
        <Select
          style={{
            backgroundColor: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          fullWidth
          variant="outlined"
          value={values.tipoCliente}
          error={!!errors.tipoCliente && touched.tipoCliente}
          name="tipoCliente"
          displayEmpty
          onChange={handleDocumentChange}
          onBlur={handleBlur}
        >
          <MenuItem disabled value={""}>
            <span className="empty--option">Tipo de cliente</span>
          </MenuItem>
          <MenuItem value="C">Usuario</MenuItem>
          <MenuItem value="B">Prestador de servicio</MenuItem>
          <MenuItem value="U">No cliente</MenuItem>
        </Select>
      </div>
      <ErrorMessage
        className="error bottom"
        name="tipoCliente"
        component="div"
      />
      <div className="files">
        <Select
          style={{
            backgroundColor: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          fullWidth
          variant="outlined"
          value={values.tipoDocumento}
          error={!!errors.tipoDocumento && touched.tipoDocumento}
          name="tipoDocumento"
          displayEmpty
          onChange={handleDocumentChange}
          onBlur={handleBlur}
        >
          <MenuItem disabled value={""}>
            <span className="empty--option">Tipo de documento</span>
          </MenuItem>
          {values.tipoCliente !== "" ? (
            typeDocs &&
            typeDocs.map(({ id, descriptionLarge }) => (
              <MenuItem key={id} value={id}>
                {descriptionLarge}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value={""}>
              <span className="empty--option">Seleccione</span>
            </MenuItem>
          )}
        </Select>
      </div>
      <ErrorMessage
        className="error bottom"
        name="tipoDocumento"
        component="div"
      />
      <div className="files" style={{ flexDirection: "column" }}>
        <TextField
          name="numDocumento"
          className="TxtField"
          variant="outlined"
          placeholder="Número de documento"
          value={values.numDocumento}
          error={!!errors.numDocumento && touched.numDocumento}
          onBlur={handleBlur}
          onChange={handleDocumentChange}
          fullWidth
          autoComplete="off"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
          inputProps={{
            maxLength: values.maxLengthValue,
          }}
          onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
        />
        <ErrorMessage
          className="error bottom"
          name="numDocumento"
          component="div"
        />
      </div>
    </>
  );
};

const FormComplainChange = () => {
  const dispatch = useDispatch();
  const { setFieldValue, values, errors, touched, handleBlur } =
    useFormikContext();

  const handleComplaintChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "tipoSolicitud") {
      setFieldValue(formField, value, true);
      setFieldValue("categoria", "", false);
      dispatch(categoryComplaint(value));
    }
  };

  return (
    <>
      <div className="files">
        <Select
          style={{
            backgroundColor: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          fullWidth
          variant="outlined"
          value={values.tipoSolicitud}
          error={errors.tipoSolicitud && touched.tipoSolicitud}
          name="tipoSolicitud"
          displayEmpty
          onChange={handleComplaintChange}
          onBlur={handleBlur}
        >
          <MenuItem disabled value={""}>
            <span className="empty--option">Tipo de solicitud</span>
          </MenuItem>
          <MenuItem value="QUE">Queja</MenuItem>
          <MenuItem value="REC">Reclamo</MenuItem>
        </Select>
      </div>
      <ErrorMessage
        className="error bottom"
        name="tipoSolicitud"
        component="div"
      />
    </>
  );
};

export const Complains = () => {
  const dispatch = useDispatch();
  const { categoryComplaintList } = useSelector(
    (state) => state.categoryComplaint
  );

  useEffect(() => {
    dispatch(documents());
  }, [dispatch]);

  return (
    <>
      <MyModal link="/" />
      <div className="page-container">
        <div className="complain-container">
          <h1>Libro de reclamaciones</h1>
          <Formik
            initialValues={{
              tipoCliente: "",
              tipoDocumento: "",
              numDocumento: "",
              nombre: "",
              apellidos: "",
              correo: "",
              celular: "",
              tipoSolicitud: "",
              categoria: "",
              descripcion: "",
              maxLengthValue: 8,
              minLengthValue: 1,
              ingreso: "",
              codigoReserva: "",
            }}
            validate={(values) => {
              const errors = {};

              if (values.tipoCliente === "") {
                errors.tipoCliente = REQUIRED;
              }

              if (values.tipoDocumento === "") {
                errors.tipoDocumento = REQUIRED;
              }

              if (values.tipoSolicitud === "") {
                errors.tipoSolicitud = REQUIRED;
              }

              if (values.categoria === "") {
                errors.categoria = REQUIRED;
              }

              if (values.nombre.trim().length < 1) {
                errors.nombre = REQUIRED;
              }

              if (values.apellidos.trim().length < 1) {
                errors.apellidos = REQUIRED;
              }

              if (values.correo.trim().length < 1) {
                errors.correo = REQUIRED;
              } else if (!EMAIL_REGEXP.test(values.correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (values.correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }
              if (values.numDocumento.trim().length < 1) {
                errors.numDocumento = REQUIRED;
              } else if (
                values.numDocumento.trim().length < values.minLengthValue &&
                values.tipoDocumento !== "01"
              ) {
                errors.numDocumento = `*El número de documento debe tener un minimo de ${values.minLengthValue} dígitos`;
              } else if (
                values.numDocumento.trim().length < values.minLengthValue &&
                values.tipoDocumento === "01"
              ) {
                errors.numDocumento = `*El número de documento debe de tener ${values.minLengthValue} dígitos`;
              }

              if (values.celular.length < 1) {
                errors.celular = REQUIRED;
              } else if (
                values.celular.length < 9 ||
                !values.celular.startsWith("9")
              ) {
                errors.celular =
                  "*El número de celular debe iniciar con el dígito 9 y debe ser de 9 dígitos .";
              }

              if (values.descripcion.trim().length < 1) {
                errors.descripcion = "*Este campo es requerido";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const complainModel = {
                clientType: "",
                documentType: "",
                documentNumber: "",
                name: "",
                lastName: "",
                email: "",
                mobile: "",
                requestType: "",
                requestCategory: "",
                requestDetail: "",
                codeReservation: "",
              };

              complainModel.clientType = values.tipoCliente;
              complainModel.documentType = values.tipoDocumento;
              complainModel.documentNumber = values.numDocumento;
              complainModel.name = values.nombre;
              complainModel.lastName = values.apellidos;
              complainModel.email = values.correo;
              complainModel.mobile = values.celular;
              complainModel.requestType = values.tipoSolicitud;
              complainModel.requestCategory = values.categoria;
              complainModel.requestDetail = values.descripcion.trim();
              complainModel.codeReservation = values.codigoReserva;

              (async () => {
                dispatch(registerComplain(complainModel));
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
              <form name="formComplains" onSubmit={handleSubmit}>
                <div className="form-container">
                  <div className="left">
                    <FormDocumentChange />
                    <div className="files">
                      <TextField
                        name="nombre"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Nombres"
                        value={values.nombre}
                        error={errors.nombre && touched.nombre}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <ErrorMessage
                      className="error bottom"
                      name="nombre"
                      component="div"
                    />
                    <div className="files">
                      <TextField
                        name="apellidos"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Apellidos"
                        value={values.apellidos}
                        error={errors.apellidos && touched.apellidos}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <ErrorMessage
                      className="error bottom"
                      name="apellidos"
                      component="div"
                    />
                    <div className="files" style={{ flexDirection: "column" }}>
                      <TextField
                        name="correo"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Correo"
                        value={values.correo}
                        error={errors.correo && touched.correo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="correo"
                        component="div"
                      />
                    </div>

                    <div className="files" style={{ flexDirection: "column" }}>
                      <TextField
                        name="celular"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Celular"
                        value={values.celular}
                        error={errors.celular && touched.celular}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        inputProps={{
                          maxLength: 9,
                        }}
                        onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                      <ErrorMessage
                        className="error bottom"
                        name="celular"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="files">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          cancelLabel="Cancelar"
                          okLabel="Aceptar"
                          disableFuture
                          // maxDate={nowDate}
                          openTo="year"
                          format="dd/MM/yyyy"
                          disabled
                          views={["year", "month", "date"]}
                          onChange={handleChange}
                          renderInput={(props) => (
                            <TextField {...props} fullWidth />
                          )}
                          value={values.fechaIngreso}
                          className="border"
                          name="fechaIngreso"
                          InputProps={{
                            style: {
                              marginTop: "10px",
                              marginBottom: "10px",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="files">
                      <TextField
                        name="codigoReserva"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Código de la reserva (Opcional)"
                        value={values.codigoReserva}
                        error={errors.codigoReserva && touched.codigoReserva}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        inputProps={{}}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>

                    <FormComplainChange />

                    <div className="files">
                      <Select
                        style={{
                          backgroundColor: "white",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        fullWidth
                        variant="outlined"
                        value={values.categoria}
                        error={errors.categoria && touched.categoria}
                        name="categoria"
                        displayEmpty
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem disabled value={""}>
                          <span className="empty--option">Categoría</span>
                        </MenuItem>
                        {categoryComplaintList &&
                          categoryComplaintList.map(({ id, description }) => (
                            <MenuItem key={id} value={id}>
                              {description}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                    <ErrorMessage
                      className="error bottom"
                      name="categoria"
                      component="div"
                    />

                    <div className="files">
                      <TextField
                        name="descripcion"
                        className="TxtField"
                        variant="outlined"
                        placeholder="Detalle de solicitud"
                        value={values.descripcion}
                        error={errors.descripcion && touched.descripcion}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete="off"
                        fullWidth
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        minRows={8}
                        maxRows={9}
                        multiline
                        inputProps={{
                          maxLength: 255,
                        }}
                        onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
                      />
                    </div>
                    <ErrorMessage
                      className="error bottom"
                      name="descripcion"
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
                    margin: "10px auto",
                    textTransform: "capitalize",
                    display: "flex",
                  }}
                  type="submit"
                >
                  Registrar solicitud
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
