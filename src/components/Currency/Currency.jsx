import { useSelector } from "react-redux";
import s from "./Currency.module.css";

const Currency = () => {
  const exchangeRates = useSelector((state) => state.exchangeRates);
  const isLoading = useSelector((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if (exchangeRates.currencyCodeA === "978") {
  //   exchangeRates.currencyCodeA = "EUR";
  // }
  // if (exchangeRates.currencyCodeA === "840") {
  //   exchangeRates.currencyCodeA = "USD";
  // }

  return (
    <div className={s.currency}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.th}>Currency</th>
            <th className={s.th}>Purchase</th>
            <th className={s.th}>Sale</th>
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
