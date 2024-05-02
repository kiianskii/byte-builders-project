import { useToggle } from "../../hooks/useToggle";
import { deleteTransactionThunk } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/slice";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import Modal from "../Modal/Modal";
import s from "./TransactionItem.module.css";
import { useDispatch, useSelector } from "react-redux";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  const { openModal, closeModal, isOpen } = useToggle();

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
        <button
          onClick={() => {
            openModal();
          }}
        >
          Edit
        </button>
        {isOpen && (
          <Modal title="Add Transaction" closeModal={closeModal}>
            <AddTransactionForm closeModal={closeModal} />
          </Modal>
        )}
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
