import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

export const PublicBusiness = ({ typeBusiness, category }) => {
  const history = useHistory();
  const handleRedirect = (id) => {
    history.push(`/services-menu-category/${id}/${category}`);
  };

  return (
    <div>
      {typeBusiness &&
        typeBusiness.map(({ id, tradename, logo }) => (
          <Card className="card-container" key={id}>
            <CardMedia image={logo} title={tradename} className="card-media" />

            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="h2">
                {tradename}
              </Typography>
            </CardContent>

            <Button
              size="large"
              color="primary"
              variant="contained"
              className="btn_card"
              style={{
                margin: "0.5px 0",
                textTransform: "none",
              }}
              fullWidth
              onClick={() => handleRedirect(id)}
            >
              Ver servicios
            </Button>
          </Card>
        ))}
    </div>
  );
};
