import { useDispatch } from "react-redux";
import { currencyThunk } from "../../redux/currency/operations";

import s from "./CurrencyTab.module.css";
import Currency from "../../components/Currency/Currency";
import { useEffect } from "react";

const CurrencyTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currencyThunk());
  }, [dispatch]);

  return (
    <div className={s.currency}>
      <Currency />
    </div>
  );
};

export default CurrencyTab;
