import { useSelector } from "react-redux";

import TransactionItem from "../TransactionItem/TransactionItem";
import { selectTransactions } from "../../redux/transactions/slice";

import s from "./TransactionList.module.css";

function TransactionList() {
  const transactions = useSelector(selectTransactions);

  return !transactions.length ? (
    <h2 className={s.nodata}>There are no transactions yet!</h2>
  ) : (
    <>
      <div className={s.container + " " + s.head_container}>
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
        </table>
      </div>
      <div className={s.container}>
        <table className={s.table}>
          <tbody className={s.tbody}>
            {transactions.map((transaction) => {
              return (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionList;
