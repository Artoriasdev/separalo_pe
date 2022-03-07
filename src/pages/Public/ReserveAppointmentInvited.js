import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Formik, Form, useFormikContext, ErrorMessage } from "formik";

import { MyFormikDialog, MyModal } from "../../components/Modal";
import {
  MyButton,
  MyCheckbox,
  MySelect,
  MyTextInput,
} from "../../components/Fields";
import { MenuItem, TextField } from "@mui/material";
import { handleRegexDisable } from "../../utils/utilitaries";
import { serviceById } from "../../actions/serviceById";
import { hoursId } from "../../actions/hoursById";
import { reservation } from "../../actions/reservation";
import { termsLoad } from "../../actions/termsLoad";
import {
  EMAIL_INVALID,
  EMAIL_MINLENGTH,
  E_MINLENGTH,
  REQUIRED,
} from "../../utils/constants";
import { EMAIL_REGEXP } from "../../utils/regexp";

const InvitedFields = () => {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext();

  useEffect(() => {
    setFieldValue("nombre", localStorage.getItem("name_invited") || "", true);
    setFieldValue(
      "apellido",
      localStorage.getItem("lastname_invited") || "",
      true
    );
    setFieldValue("celular", localStorage.getItem("cell_invited") || "", true);
    setFieldValue("correo", localStorage.getItem("email") || "", true);
  }, []);

  return (
    <>
      <div className="files">
        <div className="txt-left-nomid">
          <TextField
            name="nombre"
            className="TxtField"
            variant="outlined"
            label="Nombre"
            fullWidth
            value={values.nombre}
            error={errors.nombre && touched.nombre}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{
              marginBottom: "5px",
            }}
          />
          <ErrorMessage
            className="error bottom"
            name="nombre"
            component="div"
          />
        </div>

        <div className="txt-right-nomid">
          <TextField
            name="apellido"
            type="text"
            className="TxtField"
            variant="outlined"
            label="Apellidos"
            fullWidth
            value={values.apellido}
            error={errors.apellido && touched.apellido}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{
              marginBottom: "5px",
            }}
          />
          <ErrorMessage
            className="error bottom"
            name="apellido"
            component="div"
          />
        </div>
      </div>
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
            style={{ marginBottom: "5px" }}
            onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
          />
          <ErrorMessage
            className="error bottom"
            name="correo"
            component="div"
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
            style={{
              marginBottom: "5px",
            }}
            inputProps={{
              maxLength: 9,
            }}
            onInput={handleRegexDisable("[0-9]")}
          />
          <ErrorMessage
            className="error bottom"
            name="celular"
            component="div"
          />
        </div>
      </div>
    </>
  );
};

export const ReserveAppointmentInvited = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const { serviceId, serviceDate } = useSelector((state) => state.serviceById);
  const { hoursById } = useSelector((state) => state.hoursById);

  // if (termsModal) {
  // }

  useEffect(() => {
    if (logged) history.push("/");
    dispatch(termsLoad(2));
    dispatch(serviceById(params.id));
  }, [logged, history, dispatch, params.id]);

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
              nombre: "",
              apellido: "",
              checkbox: false,
            }}
            validate={(values) => {
              const errors = {};

              if (values.nombre.trim().length < 1) {
                errors.nombre = REQUIRED;
              }
              if (values.apellido.trim().length < 1) {
                errors.apellido = REQUIRED;
              }

              if (values.celular.length < 1) {
                errors.celular = REQUIRED;
              } else if (
                values.celular.length < 9 ||
                !values.celular.startsWith("9")
              ) {
                errors.celular =
                  "*El número de celular debe iniciar con 9 y tener 9 dígitos.";
              }

              if (values.correo.trim().length < 1) {
                errors.correo = REQUIRED;
              } else if (!EMAIL_REGEXP.test(values.correo)) {
                errors.correo = EMAIL_INVALID;
              } else if (values.correo.length < E_MINLENGTH) {
                errors.correo = EMAIL_MINLENGTH;
              }

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
                email: "",
                mobile: "",
                name: "",
                lastName: "",
                reservationDate: "",
                reservationTime: "",
              };

              reserveModel.email = values.correo;
              reserveModel.mobile = values.celular;
              reserveModel.name = values.nombre;
              reserveModel.lastName = values.apellido;
              reserveModel.idService = params.id;
              reserveModel.reservationDate = values.fechaDisponible;
              reserveModel.reservationTime = values.horarioDisponible;

              dispatch(reservation(reserveModel));
            }}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form name="formLogin">
                <MyFormikDialog
                  modal={termsModal}
                  setChecked={setChecked}
                  setTermsModal={setTermsModal}
                  text="hola"
                />
                <InvitedFields />

                <div className="files">
                  <div className="txt-left-nomid">
                    <MyTextInput
                      name="servicio"
                      label="Nombre del servicio"
                      accion={1}
                      data={serviceId.length === 0 ? "" : serviceId[0].title}
                      type="text"
                      fullWidth
                      error={errors.servicio && touched.servicio}
                      disabled={true}
                      style={{
                        marginBottom: "5px",
                      }}
                    />
                  </div>

                  <div className="txt-right-nomid">
                    <MyTextInput
                      name="duracion"
                      label="Duración del servicio"
                      accion={1}
                      data={serviceId.length === 0 ? "" : serviceId[0].duration}
                      type="text"
                      fullWidth
                      error={errors.duracion && touched.duracion}
                      disabled={true}
                      style={{
                        marginBottom: "5px",
                      }}
                    />
                  </div>
                </div>

                <div className="files">
                  <div className="txt-left-nomid">
                    <MyTextInput
                      name="precio"
                      label="Precio"
                      accion={1}
                      data={
                        serviceId.length === 0
                          ? ""
                          : serviceId[0].currencySymbol +
                            " " +
                            serviceId[0].price
                      }
                      type="text"
                      fullWidth
                      error={errors.precio && touched.precio}
                      disabled={true}
                      style={{
                        marginBottom: "5px",
                      }}
                    />
                  </div>

                  <div className="txt-right-nomid">
                    <MySelect
                      name="fechaDisponible"
                      label="Elige la fecha disponible"
                      error={errors.fechaDisponible && touched.fechaDisponible}
                      accion={1}
                      elements={2}
                      first={params.id}
                      second={values.fechaDisponible}
                      despachador={hoursId}
                    >
                      <MenuItem disabled value="">
                        Elige la fecha disponible
                      </MenuItem>
                      {serviceDate &&
                        serviceDate.map(({ keyDate, valueDate }) => (
                          <MenuItem key={keyDate} value={keyDate}>
                            {valueDate}
                          </MenuItem>
                        ))}
                    </MySelect>
                  </div>
                </div>
                <div className="files">
                  <div className="txt-left-nomid">
                    <MySelect
                      name="horarioDisponible"
                      label="Elige el horario"
                      error={
                        errors.horarioDisponible && touched.horarioDisponible
                      }
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      <MenuItem disabled value="">
                        Elige el horario
                      </MenuItem>
                      {hoursById.length === 0 ? (
                        <MenuItem disabled value={" "}>
                          <span className="empty--option">
                            Horarios no disponibles
                          </span>
                        </MenuItem>
                      ) : (
                        hoursById &&
                        hoursById.map(({ keyTime, valueTime }) => (
                          <MenuItem key={keyTime} value={keyTime}>
                            {valueTime}
                          </MenuItem>
                        ))
                      )}
                    </MySelect>
                  </div>
                </div>
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
