import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorMessage, Formik, useFormikContext } from "formik";

import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { handleRegexDisable } from "../../utils/utilitaries";
import { useEffect } from "react";
import { serviceHours } from "../../actions/serviceHours";
import { serviceHoursAttention } from "../../actions/serviceHoursAttention";
import { registerService } from "../../actions/registerService";
import { REQUIRED } from "../../utils/constants";

const FormFields = ({
  value,
  setErr,
  setLunes,
  setMartes,
  setMiercoles,
  setJueves,
  setViernes,
  setSabado,
  setDomingo,
  err,
  lunes,
  martes,
  miercoles,
  jueves,
  viernes,
  sabado,
  domingo,
}) => {
  const { categorys } = useSelector((state) => state.category);
  const { serviceHoursList } = useSelector((state) => state.serviceHours);
  const { serviceHoursAttentioList } = useSelector(
    (state) => state.serviceHoursAttention
  );
  const [disabled, setDisabled] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext();

  useEffect(() => {
    if (value !== undefined) {
      setFieldValue("categoria", value);
      setDisabled(true);
    }
  }, [setFieldValue, value, setDisabled]);

  const handleHour = (e) => {
    const value = e.target.value;
    const formField = e.target.name;

    if (formField === "horarioAtencion.lunesHoraFinal") {
      const { lunesHoraInicio } = values.horarioAtencion;
      if (value > lunesHoraInicio) {
        setErr({});
        setLunes(false);
      }
      setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.martesHoraFinal") {
      const { martesHoraInicio } = values.horarioAtencion;
      if (value > martesHoraInicio) {
        setErr({});
        setMartes(false);
      }
      setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.miercolesHoraFinal") {
      const { miercolesHoraInicio } = values.horarioAtencion;
      if (value > miercolesHoraInicio) {
        setErr({});
        setMiercoles(false);
      }
      setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.juevesHoraFinal") {
      const { juevesHoraInicio } = values.horarioAtencion;
      if (value > juevesHoraInicio) {
        setErr({});
        setJueves(false);
      }
      setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.viernesHoraFinal") {
      const { viernesHoraInicio } = values.horarioAtencion;
      if (value > viernesHoraInicio) {
        setErr({});
        setViernes(false);
      }
      setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.sabadoHoraFinal") {
      const { sabadoHoraInicio } = values.horarioAtencion;
      if (value > sabadoHoraInicio) {
        setErr({});
        setSabado(false);
      }
      setFieldValue(formField, value, true);
    }
    if (formField === "horarioAtencion.domingoHoraFinal") {
      const { domingoHoraInicio } = values.horarioAtencion;
      if (value > domingoHoraInicio) {
        setErr({});
        setDomingo(false);
      }
      setFieldValue(formField, value, true);
    }
  };

  const handlePrice = (e) => {
    let val = e.target.value;
    const formField = e.target.name;
    if (val.startsWith(" ")) {
      setFieldValue(formField, "", true);
    } else if (isNaN(val)) {
      setFieldValue(formField, "", true);
    } else {
      val = val >= 0 ? val : "";
      setFieldValue(formField, val, true);
    }
  };

  return (
    <>
      <div>
        <div className="files">
          <Select
            value={values.categoria}
            error={errors.categoria && touched.categoria}
            name="categoria"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            variant="outlined"
            fullWidth
            style={{
              marginBottom: "5px",
              marginTop: "5px",
            }}
            displayEmpty
          >
            <MenuItem disabled value={""}>
              Categoría
            </MenuItem>
            {categorys &&
              categorys.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
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
          <div className="txt-left-nomid">
            <TextField
              name="servicio"
              className="TxtField"
              variant="outlined"
              fullWidth
              placeholder="Servicio"
              value={values.servicio}
              error={errors.servicio && touched.servicio}
              onBlur={handleBlur}
              onChange={handleChange}
              // inputProps={{
              //   maxLength: 9,
              // }}
              onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
            />
            <ErrorMessage
              className="error bottom"
              name="servicio"
              component="div"
            />
          </div>
          <div className="txt-right-nomid">
            <Select
              value={values.hora}
              error={errors.hora && touched.hora}
              name="hora"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              variant="outlined"
              displayEmpty
            >
              <MenuItem disabled value={""}>
                Duración
              </MenuItem>
              {serviceHoursList &&
                serviceHoursList.map(({ id, value }) => (
                  <MenuItem key={id} value={id}>
                    {value}
                  </MenuItem>
                ))}
            </Select>
            <ErrorMessage
              className="error bottom"
              name="hora"
              component="div"
            />
          </div>
        </div>
        <div className="files">
          <div className="txt-left-nomid">
            <TextField
              name="descripcion"
              className="TxtField"
              variant="outlined"
              fullWidth
              placeholder="Descripción"
              value={values.descripcion}
              error={errors.descripcion && touched.descripcion}
              onBlur={handleBlur}
              onChange={handleChange}
              multiline
              minRows={4}
              maxRows={5}
              inputProps={{
                maxLength: 255,
              }}
              onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
            />
            <ErrorMessage
              className="error bottom"
              name="descripcion"
              component="div"
            />
          </div>
          <div className="txt-right-nomid">
            <TextField
              name="precio"
              type="text"
              className="TxtField"
              variant="outlined"
              fullWidth
              placeholder="Precio"
              value={values.precio}
              error={errors.precio && touched.precio}
              onBlur={handleBlur}
              onChange={handlePrice}
              onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
            />
            <ErrorMessage
              className="error bottom"
              name="precio"
              component="div"
            />
          </div>
        </div>
        <TableContainer
          style={{
            borderRadius: "10px 10px",
            margin: "10px 0",
          }}
          className="modal-table"
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              style={{
                background: "#f3f3f3",
              }}
            >
              <TableRow>
                <TableCell className="font-tittle">Día</TableCell>
                <TableCell
                  className="font-tittle"
                  style={{ textAlign: "center" }}
                >
                  Inicio
                </TableCell>
                <TableCell
                  className="font-tittle"
                  style={{ textAlign: "center" }}
                >
                  Fin
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font">Lunes</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.lunesHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.lunesHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>

                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.lunesHoraFinal}
                    error={lunes}
                    name="horarioAtencion.lunesHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {lunes ? <div className="error-table">{err.lunes}</div> : null}
              <TableRow>
                <TableCell className="font">Martes</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.martesHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.martesHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.martesHoraFinal}
                    error={martes}
                    name="horarioAtencion.martesHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {martes ? <div className="error-table">{err.martes}</div> : null}

              <TableRow>
                <TableCell className="font">Miércoles</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.miercolesHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.miercolesHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.miercolesHoraFinal}
                    error={miercoles}
                    name="horarioAtencion.miercolesHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {miercoles ? (
                <div className="error-table">{err.miercoles}</div>
              ) : null}
              <TableRow>
                <TableCell className="font">Jueves</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.juevesHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.juevesHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.juevesHoraFinal}
                    error={jueves}
                    name="horarioAtencion.juevesHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {jueves ? <div className="error-table">{err.jueves}</div> : null}
              <TableRow>
                <TableCell className="font">Viernes</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.viernesHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.viernesHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.viernesHoraFinal}
                    error={viernes}
                    name="horarioAtencion.viernesHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {viernes ? (
                <div className="error-table">{err.viernes}</div>
              ) : null}
              <TableRow>
                <TableCell className="font">Sábado</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.sabadoHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.sabadoHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.sabadoHoraFinal}
                    error={sabado}
                    name="horarioAtencion.sabadoHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {sabado ? <div className="error-table">{err.sabado}</div> : null}
              <TableRow>
                <TableCell className="font">Domingo</TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.domingoHoraInicio}
                    error={errors.horarioAtencion}
                    name="horarioAtencion.domingoHoraInicio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
                <TableCell
                  className="font"
                  style={{
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <Select
                    value={values.horarioAtencion.domingoHoraFinal}
                    error={domingo}
                    name="horarioAtencion.domingoHoraFinal"
                    onChange={handleHour}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {serviceHoursAttentioList &&
                      serviceHoursAttentioList.map(({ id, value }) => (
                        <MenuItem key={id} value={id}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
              {domingo ? (
                <div className="error-table">{err.domingo}</div>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export const FormService = ({ value, close }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.data);

  const [err, setErr] = useState({});
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  useEffect(() => {
    dispatch(serviceHours());
    dispatch(serviceHoursAttention());
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          categoria: "",
          servicio: "",
          descripcion: "",
          hora: "",
          precio: "",
          horarioAtencion: {
            lunesHoraInicio: "",
            lunesHoraFinal: "",
            martesHoraInicio: "",
            martesHoraFinal: "",
            miercolesHoraInicio: "",
            miercolesHoraFinal: "",
            juevesHoraInicio: "",
            juevesHoraFinal: "",
            viernesHoraInicio: "",
            viernesHoraFinal: "",
            sabadoHoraInicio: "",
            sabadoHoraFinal: "",
            domingoHoraInicio: "",
            domingoHoraFinal: "",
          },
        }}
        validate={(values) => {
          const errors = {};

          if (values.categoria === "") {
            errors.categoria = REQUIRED;
          }

          if (values.servicio.trim().length < 1) {
            errors.servicio = REQUIRED;
          }

          if (values.descripcion.trim().length < 1) {
            errors.descripcion = REQUIRED;
          }

          if (values.hora === "") {
            errors.hora = REQUIRED;
          }

          if (values.precio.trim().length < 1) {
            errors.precio = REQUIRED;
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const formModel = {
            idCategory: "",
            title: "",
            description: "",

            price: "",
            duration: "",
            scheduleAttention: {
              mondayStartTime: "",
              mondayEndTime: "",
              tuesdayStartTime: "",
              tuesdayEndTime: "",
              wednesdayStartTime: "",
              wednesdayEndTime: "",
              thursdayStartTime: "",
              thursdayEndTime: "",
              fridayStartTime: "",
              fridayEndTime: "",
              saturdayStartTime: "",
              saturdayEndTime: "",
              sundayStartTime: "",
              sundayEndTime: "",
            },
          };

          formModel.title = values.servicio;
          formModel.description = values.descripcion;
          formModel.duration = values.hora;
          formModel.price = values.precio;
          formModel.idCategory = values.categoria;

          formModel.scheduleAttention.mondayStartTime =
            values.horarioAtencion.lunesHoraInicio;
          formModel.scheduleAttention.mondayEndTime =
            values.horarioAtencion.lunesHoraFinal;
          formModel.scheduleAttention.tuesdayStartTime =
            values.horarioAtencion.martesHoraInicio;
          formModel.scheduleAttention.tuesdayEndTime =
            values.horarioAtencion.martesHoraFinal;
          formModel.scheduleAttention.wednesdayStartTime =
            values.horarioAtencion.miercolesHoraInicio;
          formModel.scheduleAttention.wednesdayEndTime =
            values.horarioAtencion.miercolesHoraFinal;
          formModel.scheduleAttention.thursdayStartTime =
            values.horarioAtencion.juevesHoraInicio;
          formModel.scheduleAttention.thursdayEndTime =
            values.horarioAtencion.juevesHoraFinal;
          formModel.scheduleAttention.fridayStartTime =
            values.horarioAtencion.viernesHoraInicio;
          formModel.scheduleAttention.fridayEndTime =
            values.horarioAtencion.viernesHoraFinal;
          formModel.scheduleAttention.saturdayStartTime =
            values.horarioAtencion.sabadoHoraInicio;
          formModel.scheduleAttention.saturdayEndTime =
            values.horarioAtencion.sabadoHoraFinal;
          formModel.scheduleAttention.sundayStartTime =
            values.horarioAtencion.domingoHoraInicio;
          formModel.scheduleAttention.sundayEndTime =
            values.horarioAtencion.domingoHoraFinal;

          if (
            formModel.scheduleAttention.mondayStartTime === undefined ||
            formModel.scheduleAttention.mondayStartTime === ""
          ) {
            delete formModel.scheduleAttention.mondayStartTime;
            delete formModel.scheduleAttention.mondayEndTime;
          }
          if (
            formModel.scheduleAttention.tuesdayStartTime === undefined ||
            formModel.scheduleAttention.tuesdayStartTime === ""
          ) {
            delete formModel.scheduleAttention.tuesdayStartTime;
            delete formModel.scheduleAttention.tuesdayEndTime;
          }
          if (
            formModel.scheduleAttention.wednesdayStartTime === undefined ||
            formModel.scheduleAttention.wednesdayStartTime === ""
          ) {
            delete formModel.scheduleAttention.wednesdayStartTime;
            delete formModel.scheduleAttention.wednesdayEndTime;
          }
          if (
            formModel.scheduleAttention.thursdayStartTime === undefined ||
            formModel.scheduleAttention.thursdayStartTime === ""
          ) {
            delete formModel.scheduleAttention.thursdayStartTime;
            delete formModel.scheduleAttention.thursdayEndTime;
          }
          if (
            formModel.scheduleAttention.fridayStartTime === undefined ||
            formModel.scheduleAttention.fridayStartTime === ""
          ) {
            delete formModel.scheduleAttention.fridayStartTime;
            delete formModel.scheduleAttention.fridayEndTime;
          }
          if (
            formModel.scheduleAttention.saturdayStartTime === undefined ||
            formModel.scheduleAttention.saturdayStartTime === ""
          ) {
            delete formModel.scheduleAttention.saturdayStartTime;
            delete formModel.scheduleAttention.saturdayEndTime;
          }
          if (
            formModel.scheduleAttention.sundayStartTime === undefined ||
            formModel.scheduleAttention.sundayStartTime === ""
          ) {
            delete formModel.scheduleAttention.sundayStartTime;
            delete formModel.scheduleAttention.sundayEndTime;
          }

          if (
            formModel.scheduleAttention.mondayStartTime >
            formModel.scheduleAttention.mondayEndTime
          ) {
            setErr({
              lunes: "El horario final no debe ser menor al horario inicial",
            });

            setLunes(true);
            setMartes(false);
            setMiercoles(false);
            setJueves(false);
            setViernes(false);
            setSabado(false);
            setDomingo(false);
          } else if (
            formModel.scheduleAttention.tuesdayStartTime >
            formModel.scheduleAttention.tuesdayEndTime
          ) {
            setErr({
              martes: "El horario final no debe ser menor al horario inicial",
            });

            setLunes(false);
            setMartes(true);
            setMiercoles(false);
            setJueves(false);
            setViernes(false);
            setSabado(false);
            setDomingo(false);
          } else if (
            formModel.scheduleAttention.wednesdayStartTime >
            formModel.scheduleAttention.wednesdayEndTime
          ) {
            setErr({
              miercoles:
                "El horario final no debe ser menor al horario inicial",
            });

            setLunes(false);
            setMartes(false);
            setMiercoles(true);
            setJueves(false);
            setViernes(false);
            setSabado(false);
            setDomingo(false);
          } else if (
            formModel.scheduleAttention.thursdayStartTime >
            formModel.scheduleAttention.thursdayEndTime
          ) {
            setErr({
              jueves: "El horario final no debe ser menor al horario inicial",
            });

            setLunes(false);
            setMartes(false);
            setMiercoles(false);
            setJueves(true);
            setViernes(false);
            setSabado(false);
            setDomingo(false);
          } else if (
            formModel.scheduleAttention.fridayStartTime >
            formModel.scheduleAttention.fridayEndTime
          ) {
            setErr({
              viernes: "El horario final no debe ser menor al horario inicial",
            });

            setLunes(false);
            setMartes(false);
            setMiercoles(false);
            setJueves(false);
            setViernes(true);
            setSabado(false);
            setDomingo(false);
          } else if (
            formModel.scheduleAttention.saturdayStartTime >
            formModel.scheduleAttention.saturdayEndTime
          ) {
            setErr({
              sabado: "El horario final no debe ser menor al horario inicial",
            });

            setLunes(false);
            setMartes(false);
            setMiercoles(false);
            setJueves(false);
            setViernes(false);
            setSabado(true);
            setDomingo(false);
          } else if (
            formModel.scheduleAttention.sundayStartTime >
            formModel.scheduleAttention.sundayEndTime
          ) {
            setErr({
              domingo: "El horario final no debe ser menor al horario inicial",
            });

            setLunes(false);
            setMartes(false);
            setMiercoles(false);
            setJueves(false);
            setViernes(false);
            setSabado(false);
            setDomingo(true);
          } else {
            (async () => {
              console.log(formModel);
              close();
              dispatch(registerService(formModel, token));
            })();
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form name="formSubmit" onSubmit={handleSubmit}>
            <FormFields
              value={value}
              setErr={setErr}
              setLunes={setLunes}
              setMartes={setMartes}
              setMiercoles={setMiercoles}
              setJueves={setJueves}
              setViernes={setViernes}
              setSabado={setSabado}
              setDomingo={setDomingo}
              err={err}
              lunes={lunes}
              martes={martes}
              miercoles={miercoles}
              jueves={jueves}
              viernes={viernes}
              sabado={sabado}
              domingo={domingo}
            />
            <div className="files">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Crear servicio
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
