import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "animate.css";

import { Button } from "@mui/material";

import { businessDataBank } from "../../actions/businessDataBank";
import { banksList } from "../../actions/banksList";
import { BankFormRegister } from "../../components/BankFormRegister";
import { BankForm } from "../../components/BankForm";

export const BusinessDataBank = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth.data);
  const { dataBank } = useSelector((state) => state.businessDataBank);
  const { redirect } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(businessDataBank(token));
    dispatch(banksList());
  }, [dispatch, token]);

  if (redirect) {
    history.go();
  }

  const handleBack = () => {
    history.push("/business/category");
  };

  return (
    <>
      {dataBank && dataBank.length === 0 ? (
        <div>
          <BankFormRegister />
        </div>
      ) : (
        <div>
          <BankForm />
        </div>
      )}

      <div className="files" style={{ float: "left" }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className="btn-primary data "
          style={{ marginTop: "10px" }}
          onClick={handleBack}
        >
          Regresar
        </Button>
      </div>
    </>
  );
};
