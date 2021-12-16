import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik, useFormikContext } from "formik";

import {
  Button,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Backdrop,
  Fade,
  Breadcrumbs,
  Link,
  Box,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import { handleRegexDisable } from "../../utils/utilitaries";
import { useEffect } from "react";
import { serviceForEdit } from "../../actions/serviceForEdit";
import { serviceHours } from "../../actions/serviceHours";
import { serviceHoursAttention } from "../../actions/serviceHoursAttention";
import {
  deleteServiceFinish,
  serviceDelete,
} from "../../actions/serviceDelete";
import { serviceEdit } from "../../actions/servideEdit";
import { MyModal } from "../../components/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 10,
  p: 4,
};

const FormFields = ({
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
  const { serviceData } = useSelector((state) => state.serviceForEdit);

  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext();

  useEffect(() => {
    if (
      serviceData[0] !== undefined &&
      serviceData[0].idCategory !== undefined
    ) {
      setFieldValue("categoria", serviceData[0].idCategory);
    }
    if (serviceData[0] !== undefined) {
      setFieldValue("servicio", serviceData[0].title);
    }
    if (serviceData[0] !== undefined) {
      setFieldValue("descripcion", serviceData[0].description);
    }
    if (serviceData[0] !== undefined && serviceData[0].duration) {
      setFieldValue("hora", serviceData[0].duration);
    }
    if (serviceData[0] !== undefined) {
      setFieldValue("precio", serviceData[0].price);
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.mondayStartTime
    ) {
      setFieldValue(
        "horarioAtencion.lunesHoraInicio",
        serviceData[0].scheduleAttention.mondayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.mondayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.lunesHoraFinal",
        serviceData[0].scheduleAttention.mondayEndTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.tuesdayStartTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.martesHoraInicio",
        serviceData[0].scheduleAttention.tuesdayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.tuesdayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.martesHoraFinal",
        serviceData[0].scheduleAttention.tuesdayEndTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.wednesdayStartTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.miercolesHoraInicio",
        serviceData[0].scheduleAttention.wednesdayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.wednesdayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.miercolesHoraFinal",
        serviceData[0].scheduleAttention.wednesdayEndTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.thursdayStartTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.juevesHoraInicio",
        serviceData[0].scheduleAttention.thursdayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.thursdayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.juevesHoraFinal",
        serviceData[0].scheduleAttention.thursdayEndTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.fridayStartTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.viernesHoraInicio",
        serviceData[0].scheduleAttention.fridayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.fridayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.viernesHoraFinal",
        serviceData[0].scheduleAttention.fridayEndTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.saturdayStartTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.sabadoHoraInicio",
        serviceData[0].scheduleAttention.saturdayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.saturdayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.sabadoHoraFinal",
        serviceData[0].scheduleAttention.saturdayEndTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.sundayStartTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.domingoHoraInicio",
        serviceData[0].scheduleAttention.sundayStartTime
      );
    }
    if (
      serviceData[0] !== undefined &&
      serviceData[0].scheduleAttention.sundayEndTime !== undefined
    ) {
      setFieldValue(
        "horarioAtencion.domingoHoraFinal",
        serviceData[0].scheduleAttention.sundayEndTime
      );
    }
  }, [serviceData, setFieldValue]);

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
            disabled
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
        <div className="files">
          <div className="txt-left-nomid">
            <TextField
              name="servicio"
              className="TxtField"
              variant="outlined"
              required
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
          </div>
          <div className="txt-right-nomid">
            <Select
              value={values.hora}
              error={errors.hora && touched.hora}
              name="hora"
              onChange={handleChange}
              onBlur={handleBlur}
              required
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
          </div>
        </div>
        <div className="files">
          <div className="txt-left-nomid">
            <TextField
              name="descripcion"
              className="TxtField"
              variant="outlined"
              fullWidth
              required
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
          </div>
          <div className="txt-right-nomid">
            <TextField
              name="precio"
              type="text"
              className="TxtField"
              variant="outlined"
              fullWidth
              required
              placeholder="Precio"
              value={values.precio}
              error={errors.precio && touched.precio}
              onBlur={handleBlur}
              onChange={handlePrice}
              onInput={handleRegexDisable("")} // TODO haz el manejo correcto con NUMBER_REGEXP
            />
          </div>
        </div>
        <TableContainer
          style={{
            width: "100%",
            borderRadius: "10px 10px",
            margin: "10px 0",
          }}
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

export const ServiceDetail = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.data);
  const { serviceData } = useSelector((state) => state.serviceForEdit);
  const { redirect } = useSelector((state) => state.modal);
  const { deleted } = useSelector((state) => state.serviceDelete);

  if (redirect) {
    dispatch(serviceForEdit(params.id, token));
  }

  if (deleted === true) {
    if (params.value === "1") {
      dispatch(deleteServiceFinish());
      history.push("/business/services");
    } else if (params.value === "2") {
      dispatch(deleteServiceFinish());
      history.push(`/business/services-category/${params.category}`);
    }
  }

  const [err, setErr] = useState({});
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  const [modal, setModal] = useState(false);
  const [deleteService, setDeleteService] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(serviceForEdit(params.id, token));
    dispatch(serviceHours());
    dispatch(serviceHoursAttention());
  }, [dispatch, params.id, token]);

  const handleClose = (key) => {
    setModal(false);
    if (key === 1) {
      dispatch(serviceDelete(params.id, token));
    } else if (key === 2) {
      setDeleteService(false);
    }
  };

  const handleClick = () => {
    if (params.value === "1") {
      history.push("/business/services");
    } else if (params.value === "2") {
      history.push(`/business/services-category/${params.category}`);
    }
  };

  const handleRedirect = () => {
    history.push(`/reserve/invited/${params.id}`);
  };
  const handleDelete = () => {
    setModal(true);
    setMessage("¿Desea borrar el servicio actual?");
    setDeleteService(true);
  };

  return (
    <>
      <MyModal />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        closeAfterTransition
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal-container"
      >
        <Fade in={modal}>
          <Box sx={style}>
            <h2
              style={{ marginTop: "0", fontSize: "16px", fontWeight: "unset" }}
            >
              {message}
            </h2>
            <div>
              {deleteService ? (
                <>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    onClick={() => handleClose(1)}
                  >
                    Aceptar
                  </Button>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="btn-primary"
                    onClick={() => handleClose(2)}
                  >
                    Rechazar
                  </Button>
                </>
              ) : (
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn-primary"
                  onClick={() => handleClose(3)}
                >
                  Aceptar
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="page-container" style={{ padding: "0", width: "100%" }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
          style={{ marginLeft: "50px" }}
        >
          <Link href="/" color="textPrimary">
            Inicio
          </Link>
          <Link
            color="textPrimary"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            Mis Servicios
          </Link>
          <Link color="textSecondary">
            {serviceData[0] && serviceData[0].title}
          </Link>
        </Breadcrumbs>

        <div className="service-detail-container">
          <div className="tittle">
            <h1>Detalles</h1>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className="btn-primary"
              onClick={handleRedirect}
            >
              Agregar cita
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className="btn-primary"
              onClick={handleDelete}
            >
              Eliminar servicio
            </Button>
          </div>

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
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const formModel = {
                idService: params.id,
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
                  lunes:
                    "El horario final no debe ser menor al horario inicial",
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
                  martes:
                    "El horario final no debe ser menor al horario inicial",
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
                  jueves:
                    "El horario final no debe ser menor al horario inicial",
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
                  viernes:
                    "El horario final no debe ser menor al horario inicial",
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
                  sabado:
                    "El horario final no debe ser menor al horario inicial",
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
                  domingo:
                    "El horario final no debe ser menor al horario inicial",
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
                  dispatch(serviceEdit(formModel, token));
                })();
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form name="formSubmit" onSubmit={handleSubmit}>
                <FormFields
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
                    className="btn-primary"
                    disabled={isSubmitting}
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    Editar servicio
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
