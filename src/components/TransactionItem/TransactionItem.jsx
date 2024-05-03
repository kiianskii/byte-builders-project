import { useToggle } from "../../hooks/useToggle";
import { Icon } from "../../img/Icon";
import { deleteTransactionThunk } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/slice";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
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
      <td className={s.row + " " + s.rowCenter}>
        {transaction.type === "INCOME" ? "+" : "-"}
      </td>
      <td className={s.row}>{categoryName?.name}</td>
      <td className={s.row}>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.plus : s.minus}>
        {transaction.type === "INCOME"
          ? transaction.amount
          : transaction.amount.toString().slice(1)}
      </td>
      <td className={s.row}>
        <div className={s.rowbox}>
          <button className={s.editbtn} onClick={openModal}>
            <Icon size={14} id="edit-pen" />
          </button>
          <button
            className={s.delete_btn}
            onClick={() => dispatch(deleteTransactionThunk(transaction.id))}
          >
            Delete
          </button>
        </div>
        {isOpen && (
          <Modal title="Edit Transaction" closeModal={closeModal}>
            <EditTransactionForm
              transaction={transaction}
              closeModal={closeModal}
            />
          </Modal>
        )}
      </td>
    </tr>
  );
}

export default TransactionItem;
