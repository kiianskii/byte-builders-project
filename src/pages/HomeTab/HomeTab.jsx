import TransactionList from "../../components/TransactionList/TransactionList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  transactionsCategoriesThunk,
  userTransactionsThunk,
} from "../../redux/transactions/operations";
import { useToggle } from "../../hooks/useToggle";
import css from "../../components/ButtonAddTransactions/ButtonAddTransactions.module.css";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import Modal from "../../components/Modal/Modal";
import { Icon } from "../../img/Icon";
import { useMediaQuery } from "react-responsive";
import TransactionListMob from "../../components/TransactionList/TransactionListMob";

function HomeTab() {
  const dispatch = useDispatch();
  const { openModal, closeModal, isOpen } = useToggle();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    dispatch(userTransactionsThunk());
    dispatch(transactionsCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div className={css.container}>
      {isMobile ? <TransactionListMob /> : <TransactionList />}
      <button className={css.add_btn} type="button" onClick={openModal}>
        <Icon size={20} id="plus" />
      </button>
      {isOpen && (
        <Modal title="Add Transaction" closeModal={closeModal}>
          <AddTransactionForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default HomeTab;
