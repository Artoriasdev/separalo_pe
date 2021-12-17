import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "animate.css";

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
    </>
  );
};
