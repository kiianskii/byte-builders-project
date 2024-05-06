import { useSelector } from "react-redux";

import { selectTransactions } from "../../redux/transactions/slice";
import TransactionItemMob from "../TransactionItem/TransactionItemMob";

import s from "./TransactionList.module.css";

function TransactionListMob() {
  const transactions = useSelector(selectTransactions);

  return (
    <div className={s.moblist}>
      {transactions.map((transaction) => (
        <TransactionItemMob key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionListMob;
