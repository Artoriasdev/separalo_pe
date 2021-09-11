import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Fade,
  Backdrop,
  Button,
} from "@material-ui/core";
import { Event, RepeatOneSharp } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import FullPageLoader from "./FullPageLoader";

class CustomerHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      modal: false,
      message: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    try {
      this.handleGetReservationHistoryByCustomer();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetReservationHistoryByCustomer = () => {
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/reservation/getReservationHistoryByCustomer`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          appointments: data,
        });
        if (response.data.response === "true") {
          setTimeout(() => {
            this.setState({ isLoading: false });
          }, 1000);
        }
        console.log(data);

        return response;
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          sessionStorage.removeItem("tk");
          sessionStorage.removeItem("logged");
          sessionStorage.removeItem("workflow");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("info");
          sessionStorage.removeItem("lastName");
          this.setState({
            modal: true,
            message: "Sesión expirada, porfavor vuelva a iniciar sesión",
          });
        }
      });
    return rspApi;
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
    this.props.history.push("/");
    this.props.history.go();
  };

  render() {
    return (
      <>
        <FullPageLoader isLoading={this.state.isLoading} />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          closeAfterTransition
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="modal-container"
        >
          <Fade in={this.state.modal}>
            <div className="modal-message-container">
              <p>{this.state.message}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={this.handleClose}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
        <div className="page-container" style={{ padding: "0" }}>
          <div className="appointment-container">
            <Event fontSize="large" style={{ margin: "0 5px 0 0" }} />
            <h1>Mis citas confirmadas</h1>
          </div>
          <TableContainer className="table">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Categoria</TableCell>
                  <TableCell className="font-tittle">Negocio</TableCell>
                  <TableCell className="font-tittle">Precio</TableCell>
                  <TableCell className="font-tittle">Fecha</TableCell>
                  <TableCell className="font-tittle">Hora</TableCell>
                  <TableCell className="font-tittle">Duracion</TableCell>
                  <TableCell className="font-tittle">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.appointments.map(
                  ({
                    titleService,
                    nameCategory,
                    tradeName,
                    price,
                    dateReservation,
                    timeReservation,
                    durationReservation,
                    state,
                  }) => (
                    <TableRow key={titleService}>
                      <TableCell className="font">{titleService}</TableCell>
                      <TableCell className="font">{nameCategory}</TableCell>
                      <TableCell className="font">{tradeName}</TableCell>
                      <TableCell className="font">{price}</TableCell>
                      <TableCell className="font">{dateReservation}</TableCell>
                      <TableCell className="font">{timeReservation}</TableCell>
                      <TableCell className="font">
                        {durationReservation}
                      </TableCell>
                      <TableCell className="font">{state}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default CustomerHistory;
