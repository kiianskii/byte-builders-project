import s from "./TransactionList.module.css";
import { useSelector } from "react-redux";
import TransactionItem from "../TransactionItem/TransactionItem";
import { selectTransactions } from "../../redux/transactions/slice";
// import { selectIsLoading } from "../../redux/loader/loaderSlice";

function TransactionList() {
  const transactions = useSelector(selectTransactions);
  //   const isLoading = useSelector(selectIsLoading);

  return (
    <table className={s.table}>
      <thead className={s.headline}>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Sum</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <TransactionItem key={transaction.id} transaction={transaction} />
          );
        })}
      </tbody>
    </table>
  );
}

export default TransactionList;
