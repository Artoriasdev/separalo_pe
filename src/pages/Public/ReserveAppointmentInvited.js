import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Formik, Form } from "formik";

import { MyFormikDialog, MyModal } from "../../components/Modal";
import {
  MyButton,
  MyCheckbox,
  MySelect,
  MyTextInput,
} from "../../components/Fields";
import { handleRegexDisable } from "../../utils/utilitaries";
import { serviceById } from "../../actions/serviceById";
import { MenuItem } from "@mui/material";
import { hoursId } from "../../actions/hoursById";
import { reservation } from "../../actions/reservation";

// import FullPageLoader from "../components/FullPageLoader";

export const ReserveAppointmentInvited = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const { serviceId, serviceDate } = useSelector((state) => state.serviceById);
  const { hoursById } = useSelector((state) => state.hoursById);

  useEffect(() => {
    if (logged) history.push("/");
    dispatch(serviceById(params.id));
  }, [logged, history, dispatch, params.id]);

  // handleClose = () => {
  //   this.setState({
  //     modal: false,
  //   });
  //   if (this.state.response === true) {
  //     this.props.history.push(`/reserve-complete`);
  //   } else if (this.state.errorTerms === true) {
  //     this.props.history.goBack();
  //   }
  // };

  return (
    <div>
      {/* <FullPageLoader isLoading={this.state.isLoading} /> */}
      <MyModal link="/reserve-complete" />

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
            validationSchema={Yup.object({
              correo: Yup.string()
                .email("Correo invalido")
                .required("Requerido"),
              celular: Yup.string()
                .test(
                  "Check celular",
                  "*El número de celular debe iniciar con el dígito 9 y debe ser de 9 dígitos .",
                  function () {
                    let cel = this.parent["celular"];
                    if (cel) {
                      return cel.startsWith("9") && cel.length === 9
                        ? true
                        : false;
                    }
                  }
                )
                .required("Requerido"),
              servicio: Yup.string().required("Requerido"),
              duracion: Yup.string().required("Requerido"),
              precio: Yup.string().required("Requerido"),
              fechaDisponible: Yup.string().required("Requerido"),
              horarioDisponible: Yup.string().required("Requerido"),
              nombre: Yup.string().required("Requerido"),
              apellido: Yup.string().required("Requerido"),
              checkbox: Yup.boolean().required("Requerido"),
            })}
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

              // (async () => {
              //   this.handleInfoSubmit(reserveModel);
              // })();
              // console.log(reserveModel);
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
                <div className="files">
                  <div className="txt-left">
                    <MyTextInput
                      label="Nombre"
                      name="nombre"
                      type="text"
                      error={errors.nombre && touched.nombre}
                      fullWidth
                      style={{
                        marginBottom: "5px",
                      }}
                    />
                  </div>

                  <div className="txt-right">
                    <MyTextInput
                      label="Apellidos"
                      name="apellido"
                      type="text"
                      error={errors.apellido && touched.apellido}
                      fullWidth
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
                      label="Correo electrónico"
                      placeholder="jane@gmail.com"
                      error={errors.correo && touched.correo}
                      fullWidth
                      style={{
                        marginBottom: "5px",
                      }}
                    />
                  </div>
                  <div className="txt-right">
                    <MyTextInput
                      name="celular"
                      label="Número de celular"
                      type="text"
                      fullWidth
                      error={errors.celular && touched.celular}
                      inputProps={{
                        maxLength: 9,
                      }}
                      style={{
                        marginBottom: "5px",
                      }}
                      onInput={handleRegexDisable("[0-9]")}
                    />
                  </div>
                </div>

                <div className="files">
                  <div className="txt-left">
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

                  <div className="txt-right">
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
                  <div className="txt-left">
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

                  <div className="txt-right">
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
                  <div className="txt-left">
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
