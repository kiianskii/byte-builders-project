import { useSelector } from "react-redux";
import s from "./Currency.module.css";

const Currency = () => {
  const exchangeRates = useSelector(
    (state) => state.exchangeRates.exchangeRates
  );
  const isLoading = useSelector((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <tbody className={s.tbody}>
          {exchangeRates?.map((rate) => (
            <tr key={rate.currency} className={s.tr}>
              <td className={s.td}>{rate.currency === 978 ? "EUR" : "USD"}</td>
              <td className={s.td}>{rate.rateBuy.toFixed(1)}</td>
              <td className={s.td}>{rate.rateSell.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Currency;
