import s from "./TransactionList.module.css";
import { useSelector } from "react-redux";
import TransactionItem from "../TransactionItem/TransactionItem";
import { selectTransactions } from "../../redux/transactions/slice";
// import { selectIsLoading } from "../../redux/loader/loaderSlice";

function TransactionList() {
  const transactions = useSelector(selectTransactions);
  //   const isLoading = useSelector(selectIsLoading);

  return (
    <div className={s.container}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.headline}>Date</th>
            <th className={s.headline}>Type</th>
            <th className={s.headline}>Category</th>
            <th className={s.headline}>Comment</th>
            <th className={s.headline + " " + s.headlineRight}>Sum</th>
            <th className={s.headline}></th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {transactions.map((transaction) => {
            return (
              <TransactionItem key={transaction.id} transaction={transaction} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
