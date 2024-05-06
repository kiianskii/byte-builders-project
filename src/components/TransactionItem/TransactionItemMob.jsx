import { useEffect } from "react";
import { useToggle } from "../../hooks/useToggle";
import { Icon } from "../../img/Icon";
import { deleteTransactionThunk } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/slice";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import Modal from "../Modal/Modal";
import s from "./TransactionItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { balanceThunk } from "../../redux/auth/operations";

function TransactionItemMob({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const categoryName = categories.find(
    (item) => item.id === transaction.categoryId
  );
  const { openModal, closeModal, isOpen } = useToggle();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <ul
      className={
        transaction.type === "INCOME"
          ? s.mob_border_plus + " " + s.moblist
          : s.mob_border_minus + " " + s.moblist
      }
    >
      <li className={s.mobitem}>
        <span className={s.name}>Date</span>
        <span>
          {transaction.transactionDate.slice(0, 10).replaceAll("-", ".")}
        </span>
      </li>
      <li className={s.mobitem}>
        <span className={s.name}>Type</span>
        <span>{transaction.type === "INCOME" ? "+" : "-"}</span>
      </li>
      <li className={s.mobitem}>
        <span className={s.name}>Category</span>
        <span>{categoryName?.name}</span>
      </li>
      <li className={s.mobitem}>
        <span className={s.name}>Comment</span>
        <span>{transaction.comment}</span>
      </li>
      <li className={s.mobitem}>
        <span className={s.name}>Sum</span>
        <span
          className={transaction.type === "INCOME" ? s.mobplus : s.mobminus}
        >
          {transaction.type === "INCOME"
            ? transaction.amount
            : transaction.amount.toString().slice(1)}
        </span>
      </li>
      <li className={s.mobitem}>
        <button
          className={s.delete_btn}
          onClick={() => {
            dispatch(deleteTransactionThunk(transaction.id));
            dispatch(balanceThunk());
          }}
        >
          Delete
        </button>
        <button className={s.editbtn} onClick={openModal}>
          <Icon size={14} id="edit-pen" /> Edit
        </button>
        {isOpen && (
          <Modal title="Edit Transaction" closeModal={closeModal}>
            <EditTransactionForm
              transaction={transaction}
              closeModal={closeModal}
            />
          </Modal>
        )}
      </li>
    </ul>
  );
}

export default TransactionItemMob;
