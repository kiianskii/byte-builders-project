import { useDispatch, useSelector } from "react-redux";
import { editTransactionThunk } from "../../redux/transactions/operations";
import Modal from "../Modal/Modal";
import s from "./AditTransactionForm.module.css";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const EditTransactionForm = ({ transaction, closeModal }) => {
  const [formData, setFormData] = useState({
    amount: Math.abs(transaction.amount),
    comment: transaction.comment,
    date: new Date(transaction.transactionDate),
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formattedDate = formData.date.toISOString().slice(0, 10);
    const transactionData = {
      transactionDate: formattedDate,
      type: transaction.type,
      categoryId: transaction.categoryId,
      comment: formData.comment,
      amount: formData.amount,
    };
    dispatch(
      editTransactionThunk({ id: transaction.id, transaction: transactionData })
    );
    closeModal();
  };

  return (
    <Modal title="Edit Transaction" closeModal={closeModal}>
      <form className={s.form} onSubmit={handleSave}>
        <div className={s.toggle}>
          {transaction.type === "INCOME" ? (
            <span className={s.income}>{transaction.type}</span>
          ) : (
            <span className={s.disabled}>Income</span>
          )}
          /
          {transaction.type === "EXPENSE" ? (
            <span className={s.expense}>{transaction.type}</span>
          ) : (
            <span className={s.disabled}>Expense</span>
          )}
        </div>

        {transaction.type === "EXPENSE" && (
          <div className={s.disabledSelect}></div>
        )}

        <div className={s.transactionModalSelect}>
          <input
            className={s.amount}
            name="amount"
            type="number"
            placeholder={Math.abs(transaction.amount)}
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <div className={s.editDatePickerWrapper}>
            <ReactDatePicker
              required
              name="date"
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="dd.MM.yyyy"
              maxDate={new Date()}
            />
          </div>
        </div>

        <textarea
          className={s.comment}
          required
          name="comment"
          placeholder={transaction.comment}
          value={formData.comment}
          onChange={handleChange}
          maxLength={12}
        ></textarea>

        <div className={s.transactionButtonsWrapper}>
          <button type="submit" className={s.saveButton}>
            Save
          </button>
          <button type="button" className={s.cancelButton} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTransactionForm;
