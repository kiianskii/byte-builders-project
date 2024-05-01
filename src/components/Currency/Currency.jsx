import { useSelector } from "react-redux";
import s from "./Currency.module.css";

const Currency = () => {
  const exchangeRates = useSelector(
    (state) => state.exchangeRates.exchangeRates
  );

  return (
    <div className={s.currency}>
      <h2>Exchange Rates</h2>
      <ul>
        {exchangeRates.map((rate) => (
          <li key={rate.currency}>
            {rate.currency} - {rate.rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Currency;
