import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { ErrorMessage, Form, Formik, useFormikContext } from "formik";

import { MenuItem, Select, TextField } from "@mui/material";

import { handleRegexDisable } from "../../utils/utilitaries";
import { MyFormikDialog, MyModal } from "../../components/Modal";
import { clientData } from "../../actions/clientData";
import { hoursId } from "../../actions/hoursById";
import { serviceById } from "../../actions/serviceById";
import { MyButton, MyCheckbox } from "../../components/Fields";
import { reservationClient } from "../../actions/reservation";
import { termsLoad } from "../../actions/termsLoad";
import { REQUIRED } from "../../utils/constants";

const FormRegister = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext();
  const { data } = useSelector((state) => state.clientData);
  const { serviceId, serviceDate } = useSelector((state) => state.serviceById);
  const { hoursById } = useSelector((state) => state.hoursById);

  useEffect(() => {
    if (data[0] !== undefined) {
      setFieldValue("correo", data[0].email, true);
      setFieldValue("celular", data[0].mobile, true);
    }
    if (serviceId[0] !== undefined) {
      setFieldValue("servicio", serviceId[0].title, true);
      setFieldValue("duracion", serviceId[0].duration, true);
      setFieldValue(
        "precio",
        serviceId[0].currencySymbol + " " + serviceId[0].price,
        true
      );
    }
  }, [data, serviceId, setFieldValue]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "fechaDisponible") {
      setFieldValue(formField, value, true);
      setFieldValue("horarioDisponible", "", true);
      dispatch(hoursId(params.id, value));
    }
  };

  return (
    <>
      <div className="files">
        <div className="txt-left-nomid">
          <TextField
            name="correo"
            className="TxtField"
            variant="outlined"
            label="Correo electrónico"
            fullWidth
            value={values.correo}
            error={errors.correo && touched.correo}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{ marginBottom: "5px" }}
            onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
        </div>

        <div className="txt-right-nomid">
          <TextField
            name="celular"
            className="TxtField"
            variant="outlined"
            label="Número de celular"
            fullWidth
            value={values.celular}
            error={errors.celular && touched.celular}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{
              marginBottom: "5px",
            }}
          />
        </div>
      </div>

      <div className="files">
        <div className="txt-left-nomid">
          <TextField
            name="servicio"
            className="TxtField"
            variant="outlined"
            label="Nombre del servicio"
            fullWidth
            value={values.servicio}
            error={errors.servicio && touched.servicio}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{
              marginBottom: "5px",
            }}
          />
        </div>

        <div className="txt-right-nomid">
          <TextField
            name="duracion"
            type="text"
            className="TxtField"
            variant="outlined"
            label="Duración del servicio"
            fullWidth
            value={values.duracion}
            error={errors.duracion && touched.duracion}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{
              marginBottom: "5px",
            }}
          />
        </div>
      </div>

      <div className="files">
        <div className="txt-left-nomid">
          <TextField
            name="precio"
            type="text"
            className="TxtField"
            variant="outlined"
            label="Precio"
            fullWidth
            value={values.precio}
            error={errors.precio && touched.precio}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={true}
            style={{
              marginBottom: "5px",
            }}
          />
        </div>

        <div className="txt-right-nomid">
          <Select
            style={{
              width: "100%",
              backgroundColor: "white",
              marginBottom: "5px",
            }}
            variant="outlined"
            value={values.fechaDisponible}
            error={errors.fechaDisponible && touched.fechaDisponible}
            name="fechaDisponible"
            displayEmpty
            onChange={handleDateChange}
            onBlur={handleBlur}
          >
            <MenuItem disabled value={""}>
              <span className="empty--option">Elige la fecha disponible</span>
            </MenuItem>
            {serviceDate &&
              serviceDate.map(({ keyDate, valueDate }) => (
                <MenuItem key={keyDate} value={keyDate}>
                  {valueDate}
                </MenuItem>
              ))}
          </Select>
          <ErrorMessage
            className="error bottom"
            name="fechaDisponible"
            component="div"
          />
        </div>
      </div>
      <div className="files">
        <Select
          style={{
            backgroundColor: "white",
            marginRight: "51%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
          fullWidth
          variant="outlined"
          value={values.horarioDisponible}
          error={errors.horarioDisponible && touched.horarioDisponible}
          name="horarioDisponible"
          displayEmpty
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <MenuItem disabled value={""}>
            <span className="empty--option">Elige el horario</span>
          </MenuItem>
          {hoursById.length === 0 ? (
            <MenuItem disabled value={" "}>
              <span className="empty--option">Horarios no disponibles</span>
            </MenuItem>
          ) : (
            hoursById &&
            hoursById.map(({ keyTime, valueTime }) => (
              <MenuItem key={keyTime} value={keyTime}>
                {valueTime}
              </MenuItem>
            ))
          )}
        </Select>
      </div>
      <ErrorMessage
        className="error bottom"
        name="horarioDisponible"
        component="div"
      />
    </>
  );
};

export const ReserveAppointment = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [checked, setChecked] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const { token } = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(termsLoad(2));
    dispatch(clientData(token));
    dispatch(serviceById(params.id));
  }, [dispatch, params.id, token]);

  return (
    <div>
      <MyModal
        link={`/reserve-detail/${params.businessId}/${params.categoryId}`}
      />

      <div className="page-container">
        <div className="login">
          <h1>Reserva tu cita</h1>
          <Formik
            initialValues={{
              correo: "",
              celular: "",
              servicio: "",
              duracion: "",
              precio: "",
              fechaDisponible: "",
              horarioDisponible: "",
              checkbox: false,
            }}
            validate={(values) => {
              const errors = {};

              if (values.fechaDisponible === "") {
                errors.fechaDisponible = REQUIRED;
              }

              if (values.horarioDisponible === "") {
                errors.horarioDisponible = REQUIRED;
              }

              if (values.checkbox === false) {
                errors.checkbox = "Debes aceptar los términos y condiciones";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const reserveModel = {
                idService: "",
                reservationDate: "",
                reservationTime: "",
              };

              reserveModel.idService = JSON.parse(params.id);
              reserveModel.reservationDate = values.fechaDisponible;
              reserveModel.reservationTime = values.horarioDisponible;

              (async () => {
                dispatch(reservationClient(reserveModel, token));
              })();
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form name="formRegister" onSubmit={handleSubmit}>
                <MyFormikDialog
                  modal={termsModal}
                  setChecked={setChecked}
                  setTermsModal={setTermsModal}
                  text="hola"
                />

                <FormRegister />

                <MyCheckbox
                  name="checkbox"
                  checked={checked}
                  setChecked={setChecked}
                  setTermsModal={setTermsModal}
                  color="primary"
                >
                  Términos y condiciones
                </MyCheckbox>
                <MyButton
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    margin: "10px 0",
                  }}
                >
                  Reservar cita
                </MyButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
