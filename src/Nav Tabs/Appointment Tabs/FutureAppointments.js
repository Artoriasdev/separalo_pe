import { Card, CardContent } from "@material-ui/core";
import { Event, Person, Schedule, Timer } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";

class FutureAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  componentDidMount() {
    try {
      this.handleGetReservationConfirmByBusiness();
    } catch (error) {
      console.log(error);
    }
  }

  handleGetReservationConfirmByBusiness = () => {
    const id = this.props.id;
    const tk = sessionStorage.getItem("tk");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/reservation/getReservationConfirmByBusiness/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        this.setState({
          appointments: data,
        });
        console.log(data);

        return response;
      });
    return rspApi;
  };

  render() {
    return (
      <div>
        <h1>Citas confirmadas</h1>
        {this.state.appointments.map(
          ({
            titleService,
            emailCustomer,
            dateReservation,
            durationReservation,
            timeReservation,
          }) => (
            <Card
              style={{
                width: 275,
                display: "inline-block",
                margin: "10px 0 10px 40px",
              }}
              variant="elevation"
              key={titleService}
            >
              <CardContent className="font-tittle">{titleService}</CardContent>
              <hr style={{ width: "80%", margin: "0 auto" }} />
              <CardContent className="font">
                <Person /> {emailCustomer}
              </CardContent>
              <CardContent className="font">
                <Event /> {dateReservation}
              </CardContent>
              <CardContent className="font">
                <Timer /> {durationReservation}
              </CardContent>
              <CardContent className="font">
                <Schedule /> {timeReservation}
              </CardContent>
            </Card>
          )
        )}
      </div>
    );
  }
}

export default FutureAppointments;
