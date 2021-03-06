import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ErrorMessage, Formik, Form, useFormikContext } from "formik";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Save } from "@mui/icons-material";

import { handleRegexDisable } from "../../utils/utilitaries";
import { EMAIL_REGEXP } from "../../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../../utils/constants";
import { MyModal } from "../../components/Modal";
import { documents } from "../../actions/documents";
import { clientData } from "../../actions/clientData";
import { clientDataUpdate } from "../../actions/clientDataUpdate";

const FormEdit = ({ edit }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();
  const { data } = useSelector((state) => state.clientData);
  const { documentsList } = useSelector((state) => state.documents);

  useEffect(() => {
    if (data[0] !== undefined) {
      setFieldValue("idCliente", data[0].id, true);
      setFieldValue("nombre", data[0].name, true);
      setFieldValue("apellido", data[0].lastName, true);
      setFieldValue("tipoDocumento", data[0].documentType, true);
      setFieldValue("numeroDocumento", data[0].documentNumber, true);
      setFieldValue("celular", data[0].mobile, true);
      setFieldValue("correo", data[0].email, true);
    }
  }, [data, setFieldValue]);

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "tipoDocumento") {
      setFieldValue(formField, value, true);
      setFieldValue("numeroDocumento", "", false);
    }
    if (formField === "numeroDocumento") {
      const { tipoDocumento } = values;
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = documentsList.find((arreglo) => arreglo.id === tipoDocumento);
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
        <div className="txt-left-nomid">
          <TextField
            name="nombre"
            className="TxtField"
            variant="outlined"
            placeholder="Nombres"
            label="Nombres"
            fullWidth
            value={values.nombre}
            error={!!errors.nombre && touched.nombre}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            autoComplete="off"
          />
        </div>

        <div className="txt-right-nomid">
          <TextField
            name="apellido"
            className="TxtField"
            variant="outlined"
            placeholder="Apellidos"
            label="Apellidos"
            fullWidth
            value={values.apellido}
            error={!!errors.apellido && touched.apellido}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete="off"
            disabled={true}
          />
        </div>
      </div>
      <div className="files">
        <div className="txt-left-nomid">
          <Select
            value={values.tipoDocumento}
            error={!!errors.tipoDocumento && touched.tipoDocumento}
            name="tipoDocumento"
            onChange={handleDocumentChange}
            onBlur={handleBlur}
            displayEmpty
            disabled={true}
            variant="outlined"
            fullWidth
          >
            <MenuItem disabled value={""}>
              Tipo de documento
            </MenuItem>
            {documentsList &&
              documentsList.map(({ id, descriptionLarge }) => (
                <MenuItem key={id} value={id}>
                  {descriptionLarge}
                </MenuItem>
              ))}
          </Select>
        </div>

        <div className="txt-right-nomid">
          <TextField
            name="numeroDocumento"
            className="TxtField"
            variant="outlined"
            placeholder="N??mero de documento"
            label="N??mero de documento"
            fullWidth
            value={values.numeroDocumento}
            error={!!errors.numeroDocumento && touched.numeroDocumento}
            onBlur={handleBlur}
            onChange={handleDocumentChange}
            disabled={true}
            autoComplete="off"
            inputProps={{
              minLength: values.minLengthValue,
              maxLength: values.maxLengthValue,
            }}
            onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
          <ErrorMessage
            className="error"
            name="numeroDocumento"
            component="div"
          />
        </div>
      </div>
      <div className="files">
        <div className="txt-left-nomid">
          <TextField
            name="celular"
            className="TxtField"
            variant="outlined"
            placeholder="N??mero de celular"
            label="N??mero de celular"
            fullWidth
            value={values.celular}
            error={!!errors.celular && touched.celular}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={!edit}
            inputProps={{
              maxLength: 9,
            }}
            onInput={handleRegexDisable("[0-9]")} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
          <ErrorMessage className="error" name="celular" component="div" />
        </div>

        <div className="txt-right-nomid">
          <TextField
            name="correo"
            className="TxtField"
            variant="outlined"
            placeholder="Correo"
            label="Correo"
            fullWidth
            value={values.correo}
            error={!!errors.correo && touched.correo}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={!edit}
          />
          <ErrorMessage className="error" name="correo" component="div" />
        </div>
      </div>
    </>
  );
};

export const ClientProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth.data);
  const { redirect } = useSelector((state) => state.modal);

  if (redirect) {
    history.go();
  }

  useEffect(() => {
    dispatch(documents());
    dispatch(clientData(token));
  }, [dispatch, token]);

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <MyModal />
      <div className="page-container">
        <div className="login">
          <h1>Mi perfil</h1>
          <hr className="hr" />

          <Formik
            initialValues={{
              idCliente: "",
              nombre: "",
              apellido: "",
              tipoDocumento: "",
              numeroDocumento: "",
              celular: "",
              correo: "",
              maxLengthValue: 8,
              minLengthValue: 1,
              ingreso: "",
            }}
            validate={(values) => {
              const errors = {};

              if (values.celular.length < 1) {
                errors.celular = REQUIRED;
              } else if (
                values.celular.length < 9 ||
                !values.celular.startsWith("9")
              ) {
                errors.celular =
                  "*El n??mero de celular debe iniciar con el d??gito 9 y debe ser de 9 d??gitos .";
              }

              if (values.correo.trim().length < 1) {
                errors.correo = REQUIRED;
              } else if (!EMAIL_REGEXP.test(values.correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (values.correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }
              if (!values.numeroDocumento) {
                errors.numeroDocumento = "";
              } else if (
                (values.numeroDocumento.length < values.minLengthValue ||
                  values.numeroDocumento.trim().length <
                    values.minLengthValue) &&
                values.tipoDocumento !== "01"
              ) {
                errors.numeroDocumento = `*El n??mero de documento debe ser m??nimo de ${values.minLengthValue} d??gitos`;
              } else if (
                (values.numeroDocumento.length < values.minLengthValue ||
                  values.numeroDocumento.trim().length <
                    values.minLengthValue) &&
                values.tipoDocumento === "01"
              ) {
                errors.numeroDocumento = `*El n??mero de documento debe de tener ${values.minLengthValue} d??gitos`;
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const dataModel = {
                id: "",
                name: "",
                lastName: "",
                documentType: "",
                documentNumber: "",
                mobile: "",
                email: "",
              };

              dataModel.id = values.idCliente;
              dataModel.name = values.nombre;
              dataModel.lastName = values.apellido;
              dataModel.documentType = values.tipoDocumento;
              dataModel.documentNumber = values.numeroDocumento;
              dataModel.mobile = values.celular;
              dataModel.email = values.correo;

              (async () => {
                dispatch(clientDataUpdate(dataModel, token));
              })();
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form name="formData" onSubmit={handleSubmit}>
                <FormEdit edit={edit} />
                {edit ? (
                  <div className="files">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      className="btn-primary button"
                      startIcon={<Save />}
                      disabled={isSubmitting}
                      style={{
                        marginTop: "10px",
                        position: "absolute",
                      }}
                    >
                      Guardar datos
                    </Button>
                  </div>
                ) : null}
              </Form>
            )}
          </Formik>
          <div className="files" style={{ justifyContent: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              className="btn-primary"
              style={{ float: "right", marginTop: "10px" }}
              onClick={handleEdit}
            >
              {edit ? "Cancelar" : "Editar datos"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
