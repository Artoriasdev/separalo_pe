import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Save } from "@mui/icons-material";

import { handleRegexDisable } from "../utils/utilitaries";
import { MyModal } from "../../components/Modal";
import { documents } from "../../actions/documents";
import { provinces } from "../../actions/provinces";
import { MyTextInput } from "../../components/Fields";

// import FullPageLoader from "./FullPageLoader";

export const BusinessData = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { provincesList } = useSelector((state) => state.provinces);
  const { documentsList } = useSelector((state) => state.documents);

  useEffect(() => {
    dispatch(documents());
    dispatch(provinces());
  }, [dispatch]);

  handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "documentos") {
      formik.setFieldValue(formField, value, true);
      formik.setFieldValue("numDocumento", "", false);
    }
    if (formField === "numDocumento") {
      const { documentos } = formik.state.values;
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = this.state.typeDocs.find(
        (arreglo) => arreglo.id === documentos
      );
      if (id === undefined) {
        this.setState({
          modal: true,
          message: "Porfavor elija el Tipo de documento",
        });
      } else {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (documentos === "04" || documentos === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      formik.setFieldValue("maxLengthValue", maxLengthInput, true);
      formik.setFieldValue("minLengthValue", minLengthInput, true);
      formik.setFieldValue("ingreso", valor, true);
      formik.setFieldValue(formField, value.toUpperCase(), true);
    }
  };
  handleProvinceChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    const formik = this.form;

    if (formField === "provincia") {
      formik.setFieldValue(formField, value, true);
      this.handleGetDistrics(value);
      formik.setFieldValue("distrito", "", false);
    }
    if (formField === "distrito") {
      console.log(value);
      formik.setFieldValue(formField, value, true);
    }
  };

  handleBack = () => {
    history.push("/business/category");
  };

  return (
    <>
      <MyModal />

      <Formik
        ref={(ref) => (this.form = ref)}
        initialValues={{
          nombreCompañia: "",
          nombreComercial: "",
          numeroDocumento: "",
          correo: "",
          direccion: "",
          distrito: "",
          provincia: "",
          tarjeta: "",
          descripcion: "",
          nombres: "",
          apellidos: "",
          documentos: "",
          numDocumento: "",

          maxLengthValue: 8,
          minLengthValue: 8,
        }}
        validationSchema={Yup.object({
          nombreCompañia: Yup.string().required("Requerido"),
          nombreComercial: Yup.string().required("Requerido"),
          numeroDocumento: Yup.string().required("Requerido"),
          correo: Yup.string().email("Correo invalido").required("Requerido"),
          direccion: Yup.string().required("Requerido"),
          distrito: Yup.string().required("Requerido"),
          provincia: Yup.string().required("Requerido"),
          tarjeta: Yup.string().required("Requerido"),
          descripcion: Yup.string().required("Requerido"),
          nombres: Yup.string().required("Requerido"),
          apellidos: Yup.string().required("Requerido"),
          documentos: Yup.string().required("Requerido"),
          numDocumento: Yup.string().required("Requerido"),
        })}
        // validate={(values) => {
        //   const {
        //     numeroDocumento,
        //     correo,
        //     numDocumento,
        //     minLengthValue,
        //     tarjeta,
        //     descripcion,
        //   } = values;

        //   let errors = {};

        //   if (tarjeta.length === 0) {
        //     errors.tarjeta = "Este campo es requerido";
        //   } else if (tarjeta.trim().length <= 1) {
        //     errors.tarjeta = "Este campo es requerido";
        //   }
        //   if (descripcion.length === 0) {
        //     errors.descripcion = "Este campo es requerido";
        //   } else if (descripcion.trim().length <= 1) {
        //     errors.descripcion = "Este campo es requerido";
        //   }

        //   if (numeroDocumento.length < 11) {
        //     errors.numeroDocumento =
        //       "El número de documento debe ser de 11 dígitos.";
        //   }

        //   if (!numDocumento) {
        //     errors.numDocumento = "";
        //   } else if (numDocumento.length < minLengthValue) {
        //     errors.numDocumento = `*El número de documento debe tener un mínimo de ${minLengthValue} dígitos`;
        //   }

        //   if (!EMAIL_REGEXP.test(correo)) {
        //     errors.correo = EMAIL_INVALID;
        //   } else if (correo.length < E_MINLENGTH) {
        //     errors.correo = EMAIL_MINLENGTH;
        //   }

        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const dataModel = {
            businessName: "",
            tradeName: "",
            documentNumber: "",
            email: "",
            cardDescription: "",
            businessDescription: "",
            address: "",
            province: "",
            district: "",
            legalRepresentativeName: "",
            legalRepresentativeLastName: "",
            legalRepresentativeDocumentType: "",
            legalRepresentativeDocumentNumber: "",
          };

          dataModel.businessName = values.nombreCompañia.trim();
          dataModel.tradeName = values.nombreComercial.trim();
          dataModel.documentNumber = values.numeroDocumento;
          dataModel.email = values.correo.trim();
          dataModel.cardDescription = values.tarjeta.trim();
          dataModel.businessDescription = values.descripcion.trim();
          dataModel.address = values.direccion.trim();
          dataModel.province = values.provincia;
          dataModel.district = values.distrito;
          dataModel.legalRepresentativeName = values.nombres.trim();
          dataModel.legalRepresentativeLastName = values.apellidos.trim();
          dataModel.legalRepresentativeDocumentType = values.documentos;
          dataModel.legalRepresentativeDocumentNumber = values.numDocumento;

          (async () => {
            console.log(dataModel);
            await this.handleEditData(dataModel);
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
          <Form
            name="formData"
            onSubmit={handleSubmit}
            style={{ marginTop: "50px" }}
          >
            <div className="files">
              <div className="txt-left">
                <MyTextInput
                  name="nombreCompañia"
                  label="Razón Social"
                  accion={1}
                  data={data.length === 0 ? "" : data[0].name}
                  type="text"
                  fullWidth
                  error={errors.nombreCompañia && touched.nombreCompañia}
                  disabled={true}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div className="txt-mid">
                <MyTextInput
                  name="nombreComercial"
                  label="Nombre comercial"
                  accion={1}
                  data={data.length === 0 ? "" : data[0].tradename}
                  type="text"
                  fullWidth
                  error={errors.nombreComercial && touched.nombreComercial}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div className="txt-right">
                <MyTextInput
                  name="numeroDocumento"
                  label="RUC"
                  accion={1}
                  data={data.length === 0 ? "" : data[0].documentNumber}
                  type="text"
                  fullWidth
                  error={errors.numeroDocumento && touched.numeroDocumento}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
            </div>
            <div className="files">
              <div className="txt-left">
                <MyTextInput
                  name="correo"
                  label="Correo de la empresa"
                  accion={1}
                  data={data.length === 0 ? "" : data[0].email}
                  type="text"
                  fullWidth
                  error={errors.correo && touched.correo}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div className="txt-right-nomid-bank">
                <MyTextInput
                  name="direccion"
                  label="Dirección"
                  accion={1}
                  data={data.length === 0 ? "" : data[0].address}
                  type="text"
                  fullWidth
                  error={errors.direccion && touched.direccion}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
            </div>
            <div className="files">
              <div className="txt-left">
                <Select
                  style={{
                    backgroundColor: "white",
                  }}
                  fullWidth
                  variant="outlined"
                  value={values.provincia}
                  error={errors.provincia && touched.provincia}
                  name="provincia"
                  displayEmpty
                  required
                  onChange={this.handleProvinceChange}
                  onBlur={handleBlur}
                >
                  <MenuItem disabled value={""}>
                    <span className="empty--option">Provincia</span>
                  </MenuItem>
                  {this.state.typeProvince &&
                    this.state.typeProvince.map(({ key, value }) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <div className="txt-mid">
                <Select
                  style={{
                    backgroundColor: "white",
                  }}
                  fullWidth
                  variant="outlined"
                  value={values.distrito}
                  error={errors.distrito && touched.distrito}
                  name="distrito"
                  displayEmpty
                  required
                  onChange={this.handleProvinceChange}
                  onBlur={handleBlur}
                >
                  <MenuItem disabled value={""}>
                    <span className="empty--option">Distrito</span>
                  </MenuItem>
                  {this.state.typeDistryc &&
                    this.state.typeDistryc.map(({ key, value }) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <div className="txt-right"></div>
            </div>
            <div className="files">
              <div className="txt-left-nomid">
                <MyTextInput
                  name="tarjeta"
                  label="Descripción de la tarjeta"
                  placeholder="Max. 200 caracteres"
                  multiline
                  minRows={4}
                  accion={1}
                  data={data.length === 0 ? "" : data[0].cardDescription}
                  type="text"
                  fullWidth
                  error={errors.tarjeta && touched.tarjeta}
                  inputProps={{
                    maxLength: 200,
                  }}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div className="txt-right-nomid">
                <MyTextInput
                  name="descripcion"
                  label="Descripción del negocio"
                  placeholder="Max. 500 caracteres"
                  multiline
                  minRows={4}
                  accion={1}
                  data={data.length === 0 ? "" : data[0].businessDescription}
                  type="text"
                  fullWidth
                  error={errors.descripcion && touched.descripcion}
                  inputProps={{
                    maxLength: 500,
                  }}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
            </div>
            <h3>Datos del Representante Legal</h3>
            <div className="files">
              <div className="txt-quarter">
                <MyTextInput
                  name="nombres"
                  label="Nombres"
                  accion={1}
                  data={
                    data.length === 0 ? "" : data[0].legalRepresentativeName
                  }
                  type="text"
                  fullWidth
                  error={errors.nombres && touched.nombres}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div className="txt-quarter">
                <MyTextInput
                  name="apellidos"
                  label="Apellidos"
                  accion={1}
                  data={
                    data.length === 0 ? "" : data[0].legalRepresentativeLastName
                  }
                  type="text"
                  fullWidth
                  error={errors.apellidos && touched.apellidos}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div className="txt-quarter">
                <Select
                  style={{
                    backgroundColor: "white",
                  }}
                  fullWidth
                  variant="outlined"
                  value={values.documentos}
                  error={errors.documentos && touched.documentos}
                  name="documentos"
                  displayEmpty
                  required
                  onChange={this.handleDocumentChange}
                  onBlur={handleBlur}
                >
                  <MenuItem disabled value={""}>
                    <span className="empty--option">Tipo de documento</span>
                  </MenuItem>
                  {this.state.typeDocs &&
                    this.state.typeDocs.map(({ id, descriptionLarge }) => (
                      <MenuItem key={id} value={id}>
                        {descriptionLarge}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <div className="txt-quarter">
                <TextField
                  name="numDocumento"
                  className="TxtField"
                  variant="outlined"
                  label="Número de documento"
                  required
                  fullWidth
                  value={values.numDocumento}
                  error={errors.numDocumento && touched.numDocumento}
                  onBlur={handleBlur}
                  onChange={this.handleDocumentChange}
                  inputProps={{
                    maxLength: values.maxLengthValue,
                  }}
                  autoComplete="off"
                  onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
                />
                <MyTextInput
                  name="numDocumento"
                  label="Número de documento"
                  accion={1}
                  data={
                    data.length === 0
                      ? ""
                      : data[0].legalRepresentativeDocumentNumber
                  }
                  type="text"
                  fullWidth
                  error={errors.numDocumento && touched.numDocumento}
                  style={{
                    marginBottom: "5px",
                  }}
                />
              </div>
            </div>

            <div className="files" style={{ float: "right" }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                className="btn-primary"
                startIcon={<Save />}
                style={{ marginTop: "10px" }}
                disabled={isSubmitting}
              >
                Guardar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="files" style={{ float: "left" }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className="btn-primary"
          style={{ marginTop: "10px" }}
          onClick={this.handleBack}
        >
          Regresar
        </Button>
      </div>
    </>
  );
};
