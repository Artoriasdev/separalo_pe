import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "animate.css";

import { businessDataBank } from "../../actions/businessDataBank";
import { banksList } from "../../actions/banksList";
import { BankFormRegister } from "../../components/BankFormRegister";
import { BankForm } from "../../components/BankForm";
import { MyModal } from "../../components/Modal";

export const BusinessDataBank = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.data);
  const { dataBank } = useSelector((state) => state.businessDataBank);
  useEffect(() => {
    dispatch(businessDataBank(token));
    dispatch(banksList());
  }, [dispatch, token]);

  return (
    <>
      <MyModal />
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
