import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, useFormikContext, ErrorMessage } from "formik";

import {
  Backdrop,
  Button,
  Fade,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Save } from "@mui/icons-material";

import { documents } from "../../actions/documents";
import { provinces } from "../../actions/provinces";
import { districs } from "../../actions/districs";
import { editBusiness } from "../../actions/editBusiness";
import { EMAIL_REGEXP, UNICODE_REGEXP } from "../../utils/regexp";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../../utils/constants";
import { handleRegexDisable } from "../../utils/utilitaries";
import { Box } from "@mui/system";
import { modalClose, modalRedirectFinished } from "../../actions/modal";
import { businessData } from "../../actions/businessData";

// import FullPageLoader from "./FullPageLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "white",
  borderRadius: "4px",
  boxShadow: 10,
  p: 4,
};

const FormHandler = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.businessData);
  const { provincesList } = useSelector((state) => state.provinces);
  const { districsList } = useSelector((state) => state.districsLoad);
  const { documentsList } = useSelector((state) => state.documents);
  const documentos = documentsList.filter((id) => id.id !== "06");
  const { setFieldValue, values, errors, touched, handleBlur, handleChange } =
    useFormikContext();

  useEffect(() => {
    if (data[0] !== undefined) {
      setFieldValue("nombreCompañia", data[0].name, true);
      setFieldValue("nombreComercial", data[0].tradename, true);
      setFieldValue("numeroDocumento", data[0].documentNumber, true);
      setFieldValue("correo", data[0].email, true);
      if (data[0].address !== undefined) {
        setFieldValue("direccion", data[0].address, true);
      }
      if (data[0].province !== undefined) {
        setFieldValue("provincia", data[0].province, true);
        dispatch(districs(data[0].province));
      }
      if (data[0].district !== undefined) {
        setFieldValue("distrito", data[0].district, true);
      }
      if (data[0].cardDescription !== undefined) {
        setFieldValue("tarjeta", data[0].cardDescription, true);
      }

      if (data[0].businessDescription !== undefined) {
        setFieldValue("descripcion", data[0].businessDescription, true);
      }

      setFieldValue("nombres", data[0].legalRepresentativeName, true);
      setFieldValue("apellidos", data[0].legalRepresentativeLastName, true);
      setFieldValue(
        "documentos",
        data[0].legalRepresentativeDocumentType,
        true
      );
      setFieldValue(
        "numDocumento",
        data[0].legalRepresentativeDocumentNumber,
        true
      );
    }
  }, [data, dispatch, setFieldValue]);

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "documentos") {
      setFieldValue(formField, value, true);
      setFieldValue("numDocumento", "", true);
    }
    if (formField === "numDocumento") {
      const { documentos } = values;
      let maxLengthInput;
      let minLengthInput;

      let valor = "[0-9]";

      const id = documentsList.find((arreglo) => arreglo.id === documentos);
      if (id !== undefined) {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (documentos === "04" || documentos === "07") {
        valor = "[a-zA-Z0-9]";
      } else {
        valor = "[0-9]";
      }

      setFieldValue("maxLengthValue", maxLengthInput, true);
      setFieldValue("minLengthValue", minLengthInput, true);
      setFieldValue("ingreso", valor, true);
      setFieldValue(formField, value.toUpperCase(), true);
    }
  };

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "provincia") {
      setFieldValue(formField, value, true);
      dispatch(districs(value));
      setFieldValue("distrito", "", true);
    }
    if (formField === "distrito") {
      setFieldValue(formField, value, true);
    }
  };

  return (
    <>
      <div className="files">
        <div className="txt-left">
          <TextField
            name="nombreCompañia"
            className="TxtField"
            variant="outlined"
            label="Razón Social"
            fullWidth
            value={values.nombreCompañia}
            error={!!errors.nombreCompañia && touched.nombreCompañia}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{ margin: "5px 0" }}
          />
        </div>
        <div className="txt-mid">
          <TextField
            name="nombreComercial"
            className="TxtField"
            variant="outlined"
            label="Nombre comercial *"
            fullWidth
            value={values.nombreComercial}
            error={!!errors.nombreComercial && touched.nombreComercial}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{ margin: "5px 0" }}
          />
          <ErrorMessage
            className="error"
            name="nombreComercial"
            component="div"
          />
        </div>
        <div className="txt-right">
          <TextField
            name="numeroDocumento"
            className="TxtField"
            variant="outlined"
            label="RUC"
            fullWidth
            value={values.numeroDocumento}
            error={!!errors.numeroDocumento && touched.numeroDocumento}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{ margin: "5px 0" }}
            inputProps={{
              maxLength: 11,
            }}
            onInput={handleRegexDisable("[0-9]")}
          />
          <ErrorMessage
            className="error"
            name="numeroDocumento"
            component="div"
          />
        </div>
      </div>
      <div className="files">
        <div className="txt-left">
          <TextField
            name="correo"
            className="TxtField"
            variant="outlined"
            label="Correo de la empresa *"
            fullWidth
            value={values.correo}
            error={!!errors.correo && touched.correo}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage className="error" name="correo" component="div" />
        </div>
        <div className="txt-right-nomid-bank">
          <TextField
            name="direccion"
            className="TxtField"
            variant="outlined"
            label="Dirección *"
            fullWidth
            value={values.direccion}
            error={!!errors.direccion && touched.direccion}
            onBlur={handleBlur}
            onChange={handleChange}
            inputProps={{
              maxLength: 200,
            }}
          />
          <ErrorMessage className="error" name="direccion" component="div" />
        </div>
      </div>
      <div className="files">
        <div className="txt-left">
          <Select
            style={{
              backgroundColor: "white",
              marginBottom: "5px",
            }}
            fullWidth
            variant="outlined"
            value={values.provincia}
            error={!!errors.provincia && touched.provincia}
            name="provincia"
            displayEmpty
            onChange={handleProvinceChange}
            onBlur={handleBlur}
          >
            <MenuItem disabled value={""}>
              <span className="empty--option">Provincia *</span>
            </MenuItem>
            {provincesList &&
              provincesList.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
          </Select>
          <ErrorMessage className="error" name="provincia" component="div" />
        </div>
        <div className="txt-mid">
          <Select
            style={{
              backgroundColor: "white",
              marginBottom: "5px",
            }}
            fullWidth
            variant="outlined"
            value={values.distrito}
            error={!!errors.distrito && touched.distrito}
            name="distrito"
            displayEmpty
            onChange={handleProvinceChange}
            onBlur={handleBlur}
          >
            <MenuItem disabled value="">
              Distrito *
            </MenuItem>
            {districsList.length === 0 ? (
              <MenuItem disabled value={" "}>
                <span className="empty--option">Distritos no disponibles</span>
              </MenuItem>
            ) : (
              districsList &&
              districsList.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))
            )}
          </Select>
          <ErrorMessage className="error" name="distrito" component="div" />
        </div>
        <div className="txt-right"></div>
      </div>
      <div className="files">
        <div className="txt-left-nomid">
          <TextField
            name="tarjeta"
            className="TxtField"
            variant="outlined"
            label="Descripción de la tarjeta *"
            placeholder="Max. 200 caracteres"
            multiline
            minRows={4}
            maxRows={4}
            fullWidth
            value={values.tarjeta}
            error={!!errors.tarjeta && touched.tarjeta}
            onBlur={handleBlur}
            onChange={handleChange}
            inputProps={{
              maxLength: 200,
            }}
          />
          <ErrorMessage className="error" name="tarjeta" component="div" />
        </div>
        <div className="txt-right-nomid">
          <TextField
            name="descripcion"
            className="TxtField"
            variant="outlined"
            label="Descripción del negocio *"
            placeholder="Max. 500 caracteres"
            multiline
            minRows={4}
            maxRows={4}
            fullWidth
            value={values.descripcion}
            error={!!errors.descripcion && touched.descripcion}
            onBlur={handleBlur}
            onChange={handleChange}
            inputProps={{
              maxLength: 500,
            }}
          />
          <ErrorMessage className="error" name="descripcion" component="div" />
        </div>
      </div>
      <h3>Datos del Representante Legal</h3>
      <div className="files">
        <div className="txt-quarter">
          <TextField
            name="nombres"
            className="TxtField"
            variant="outlined"
            label="Nombres *"
            fullWidth
            value={values.nombres}
            error={!!errors.nombres && touched.nombres}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage className="error" name="nombres" component="div" />
        </div>
        <div className="txt-quarter">
          <TextField
            name="apellidos"
            className="TxtField"
            variant="outlined"
            label="Apellidos *"
            fullWidth
            value={values.apellidos}
            error={!!errors.apellidos && touched.apellidos}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage className="error" name="apellidos" component="div" />
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
            onChange={handleDocumentChange}
            onBlur={handleBlur}
          >
            <MenuItem disabled value="">
              Tipo de documento *
            </MenuItem>
            {documentos &&
              documentos.map(({ id, descriptionLarge }) => (
                <MenuItem key={id} value={id}>
                  {descriptionLarge}
                </MenuItem>
              ))}
          </Select>
          <ErrorMessage className="error" name="documentos" component="div" />
        </div>
        <div className="txt-quarter">
          <TextField
            name="numDocumento"
            className="TxtField"
            variant="outlined"
            label="Número de documento *"
            fullWidth
            value={values.numDocumento}
            error={!!errors.numDocumento && touched.numDocumento}
            onBlur={handleBlur}
            onChange={handleDocumentChange}
            inputProps={{
              maxLength: values.maxLengthValue,
            }}
            autoComplete="off"
            onInput={handleRegexDisable(values.ingreso)} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
          <ErrorMessage
            className="error bottom"
            name="numDocumento"
            component="div"
          />
        </div>
      </div>
    </>
  );
};

export const BusinessData = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.data);
  const { opened, message, redirect } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(modalClose());
    if (redirect) {
      dispatch(businessData(token));
      dispatch(modalRedirectFinished());
    }
  };

  useEffect(() => {
    dispatch(documents());
    dispatch(provinces());
  }, [dispatch]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal-container"
      >
        <Fade in={opened}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h8"
              component="p"
              style={{ fontWeight: "unset", marginBottom: "10px" }}
            >
              {message}
            </Typography>

            <div>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={handleClose}
                fullWidth
              >
                Aceptar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Formik
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
          ingreso: "",
          maxLengthValue: 20,
          minLengthValue: 5,
        }}
        validate={(values) => {
          const errors = {};

          if (values.nombreComercial.length < 1) {
            errors.nombreComercial = REQUIRED;
          } else if (values.nombreComercial.trim().length < 1) {
            errors.nombreComercial = REQUIRED;
          }

          if (values.direccion.length < 1) {
            errors.direccion = REQUIRED;
          } else if (values.direccion.trim().length < 1) {
            errors.direccion = REQUIRED;
          }

          if (values.distrito === "") {
            errors.distrito = REQUIRED;
          } else if (values.distrito.trim().length < 1) {
            errors.distrito = REQUIRED;
          }

          if (values.provincia === "") {
            errors.provincia = REQUIRED;
          } else if (values.provincia.trim().length < 1) {
            errors.provincia = REQUIRED;
          }

          if (values.nombres.length < 1) {
            errors.nombres = REQUIRED;
          } else if (values.nombres.trim().length < 1) {
            errors.nombres = REQUIRED;
          }

          if (values.apellidos.length < 1) {
            errors.apellidos = REQUIRED;
          } else if (values.apellidos.trim().length < 1) {
            errors.apellidos = REQUIRED;
          }

          if (values.documentos === "") {
            errors.documentos = REQUIRED;
          } else if (values.documentos.trim().length < 1) {
            errors.documentos = REQUIRED;
          }

          if (values.tarjeta.length === 0) {
            errors.tarjeta = "*Este campo es requerido";
          } else if (values.tarjeta.trim().length <= 1) {
            errors.tarjeta = "*Este campo es requerido";
          }
          if (values.descripcion.length === 0) {
            errors.descripcion = "*Este campo es requerido";
          } else if (values.descripcion.trim().length <= 1) {
            errors.descripcion = "*Este campo es requerido";
          }

          if (values.numeroDocumento.length < 11) {
            errors.numeroDocumento =
              "*El número de documento debe ser de 11 dígitos.";
          }

          if (values.numDocumento === "") {
            errors.numDocumento = REQUIRED;
          } else if (values.numDocumento.trim().length < 1) {
            errors.numDocumento = REQUIRED;
          } else if (
            values.numDocumento.length < values.minLengthValue ||
            values.numDocumento.trim().length < values.minLengthValue
          ) {
            errors.numDocumento = ` *El número de documento debe tener un mínimo de ${values.minLengthValue} dígitos`;
          }

          if (values.correo.length < 1) {
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
            // console.log(dataModel);
            dispatch(editBusiness(dataModel, token));
          })();
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            name="formData"
            onSubmit={handleSubmit}
            style={{ marginTop: "50px" }}
          >
            <FormHandler />
            <div style={{ float: "left" }}>
              <p style={{ color: "#23232366" }}> *Datos obligatorios</p>
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
    </>
  );
};
