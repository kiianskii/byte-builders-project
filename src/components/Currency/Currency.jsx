import { useSelector } from "react-redux";
import s from "./Currency.module.css";

const Currency = () => {
  const exchangeRates = useSelector((state) => state.exchangeRates);
  const isLoading = useSelector((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          {exchangeRates &&
            exchangeRates.map((rate) => (
              <tr key={rate.currencyCodeA}>
                <td>{rate.currencyCodeA}</td>
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
