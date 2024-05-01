import { useSelector } from "react-redux";
import s from "./Currency.module.css";

const Currency = () => {
  const exchangeRates = useSelector(
    (state) => state.exchangeRates.exchangeRates
  );

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

export default Currency;
