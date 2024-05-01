import { useDispatch, useSelector } from "react-redux";
import { currencyThunk } from "../../store/thunks/currencyThunk";

import s from "./CurrencyTab.module.css";

const CurrencyTab = () => {
  const dispatch = useDispatch();
  const exchangeRates = useSelector(
    (state) => state.exchangeRates.exchangeRates
  );

  const handleClick = () => {
    dispatch(currencyThunk());
  };

  return (
    <div className={s.currency}>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.rateBuy}</td>
              <td>{rate.rateSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTab;
