import { deleteTransactionThunk } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/slice";
import s from "./TransactionItem.module.css";
import { useDispatch, useSelector } from "react-redux";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const categoryName = categories.find(
    (item) => item.id === transaction.categoryId
  );
  return (
    <tr className={s.rowline}>
      <td className={s.row}>{transaction.transactionDate}</td>
      <td className={s.row}>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td className={s.row}>{categoryName?.name}</td>
      <td className={s.row}>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.plus : s.minus}>
        {transaction.amount}
      </td>
      <td className={s.row}>
        <button>Edit</button>
        <button
          onClick={() => dispatch(deleteTransactionThunk(transaction.id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;
