import { selectBalance } from "../../redux/auth/selectors";
import s from "./Balance.module.css";
import { useSelector } from "react-redux";

function Balance() {
  const balance = useSelector(selectBalance);

  return (
    <div className={s.balance_container}>
      <p className={s.balance}>your balance</p>
      <p className={s.summary}>
        <span className={s.hryvnia}>&#x20B4;</span>
        {balance?.toFixed(2)}
      </p>
    </div>
  );
}

export default Balance;
