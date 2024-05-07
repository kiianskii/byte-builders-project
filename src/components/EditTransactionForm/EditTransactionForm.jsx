import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";

import s from "./EditTransactionForm.module.css";
import { Icon } from "../../img/Icon";
import { editTransactionThunk } from "../../redux/transactions/operations";
import "react-datepicker/dist/react-datepicker.css";
import { selectCategories } from "../../redux/transactions/slice";

const EditTransactionForm = ({ transaction, closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const categoriesTransaction = useSelector(selectCategories);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  const onChange = (date) => setStartDate(date);

  useEffect(() => {
    if (transaction) {
      setStartDate(new Date(transaction.transactionDate));
    }
  }, [transaction]);

  const categoryName = categoriesTransaction?.find(
    (category) => category.id === transaction?.categoryId
  );
  const schema = Yup.object().shape({
    amount: Yup.number().required("Please enter amount"),
    comment: Yup.string().required("Please enter a comment"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      console.log("Submitting form with values:", values);
      const id = transaction.id;
      const formattedDate = startDate.toISOString().slice(0, 10);
      const editedTransaction = {
        transactionDate: formattedDate,
        type: transaction?.type,
        categoryId: transaction?.categoryId,
        comment: values.comment,
        amount:
          transaction?.type === "INCOME"
            ? Number(values.amount)
            : -Math.abs(Number(values.amount)),
      };

      const response = await dispatch(
        editTransactionThunk({ id, credentials: editedTransaction })
      );

      console.log("Response from server:", response);
      closeModal();
    } catch (error) {
      console.error("Error editing transaction:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        amount: transaction ? Math.abs(transaction.amount) : "",
        comment: transaction ? transaction.comment : "",
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={s.edit_body}>
        <div className={s.edit_toggle}>
          {transaction?.type === "INCOME" ? (
            <div className={s.edit_active}>{transaction.type}</div>
          ) : (
            <div className={s.disabled}>Income</div>
          )}
          /
          {transaction?.type === "EXPENSE" ? (
            <div className={s.expense_active}>{transaction?.type}</div>
          ) : (
            <div className={s.disabled}>Expense</div>
          )}
        </div>

        {transaction?.type === "EXPENSE" && (
          <div className={s.edit_select}>{categoryName?.name}</div>
        )}

        <div className={s.edit_modal_select}>
          <Field
            className={s.edit_amount}
            name="amount"
            type="number"
            placeholder="Enter amount"
            required
          />

          <div className={s.edit_datepicker_wrapper}>
            <ReactDatePicker
              className={s.edit_amount_date}
              required
              name="date"
              selected={startDate}
              onChange={onChange}
              dateFormat="dd.MM.yyyy"
              maxDate={today}
              showIcon
              icon={<Icon size={24} id="calendar" className={s.adit_svg} />}
            />
          </div>
        </div>
        <div className={s.edit_comment}>
          <Field
            className={`${s.input} ${s.textarea}`}
            as="textarea"
            required
            name="comment"
            placeholder="Enter a comment"
          />
        </div>

        <div className={s.edit_buttons_wrapper}>
          <button
            type="submit"
            className={s.edit_save_button}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            className={s.edit_cancel_button}
            type="button"
            onClick={closeModal}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
        {error && <div className={s.error_message}>{error}</div>}
      </Form>
    </Formik>
  );
};

export default EditTransactionForm;
