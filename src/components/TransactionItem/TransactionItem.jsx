import { useToggle } from "../../hooks/useToggle";
import { deleteTransactionThunk } from "../../redux/transactions/operations";
import EditTransactionForm from "../AditTransactionForm/AditTransactionForm";
import Modal from "../Modal/Modal";
import s from "./TransactionItem.module.css";
import { useDispatch } from "react-redux";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();

  const { openModal, closeModal, isOpen } = useToggle();

  return (
    <tr className={s.rowline}>
      <td className={s.row}>{transaction.transactionDate}</td>
      <td className={s.row}>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td className={s.row}>{transaction.categoryId}</td>
      <td className={s.row}>{transaction.comment}</td>
      <td className={s.row}>{transaction.amount}</td>
      <td className={s.row}>
        <button onClick={openModal}>Edit</button>
        {isOpen && (
          <Modal title="Edit transaction" closeModal={closeModal}>
            <EditTransactionForm
              transaction={transaction}
              closeModal={closeModal}
            />
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
