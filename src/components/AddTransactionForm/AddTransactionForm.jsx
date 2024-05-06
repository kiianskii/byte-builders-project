import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import css from "./AddTransactionForm.module.css";
import { Icon } from "../../img/Icon";
import SelectDate from "../SelectDate/SelectDate";
import { selectCategories } from "../../redux/transactions/slice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { sendTransactionThunk } from "../../redux/transactions/operations";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import { getStyles } from "./config";


const AddTransactionForm = ({ closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const categoriesArr = [];
  categories.map((category) =>
    categoriesArr.push({
      ...category,
      value: category.name,
      label: category.name,
    })
  );
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const WIDTH = !isMobile ? "394px" : "280px";
  const [toggle, setToggle] = useState(true);
  const initialValues = {
    categoryId: "",
    amount: "",
    transactionDate: "",
    comment: "",
  };

  const schema = Yup.object().shape({
    amount: Yup.number().required("Please enter amount"),
    comment: Yup.string().required("Please enter a comment"),
    transactionDate: Yup.date().nullable("Please choose a date"),
  });
  function handleSubmit(data, options) {
    const query = {
      ...data,
      categoryId: toggle
        ? data.categoryId.id || "c9d9e447-1b83-4238-8712-edc77b18b739"
        : "063f1132-ba5d-42b4-951d-44011ca46262",
      transactionDate: startDate,
      type: toggle ? "EXPENSE" : "INCOME",
      amount: toggle ? -data.amount : data.amount,
    };
    if (query.transactionDate === null) return;
    dispatch(sendTransactionThunk(query));
    dispatch(balanceThunk());
    options.resetForm();
    closeModal();
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={css.form}>
        <div className={css.switch_wrapper}>
          <p className={toggle ? css.switcher_text : css.income}>Income</p>
          <div
            className={css.toggle_container}
            onClick={() => setToggle(!toggle)}
          >
            <div className={toggle ? css.disable : css.toggle_btn}>
              <Icon size={20} id={!toggle ? "plus" : "minus"} />
            </div>
          </div>
          <p className={!toggle ? css.switcher_text : css.expense}>Expense</p>
        </div>
        {toggle && (
          <>
            <Field name="categoryId">
              {({ field, form }) => (
                <Select
                  placeholder="Select a category"
                  styles={getStyles(WIDTH)}
                  options={categoriesArr.filter(
                    (category) => category.type !== "INCOME"
                  )}
                  value={field.value}
                  onChange={(option) => {
                    form.setFieldValue(field.name, option);
                  }}
                />
              )}
            </Field>
          </>
        )}
        <div className={css.amount_date_box}>
          <label className={css.label}>
            <Field
              type="number"
              placeholder="0.00"
              name="amount"
              className={`${css.input} ${css.input_number}`}
            />
            <ErrorMessage
              name="amount"
              component="div"
              className={css.amount_error}
            />
          </label>
          <div className={css.wrapper}>
            <SelectDate startDate={startDate} setStartDate={setStartDate} />
          </div>
        </div>
        <label className={css.label}>
          <Field
            as="textarea"
            placeholder="Comment"
            name="comment"
            className={`${css.input} ${css.textarea}`}
          />

          <ErrorMessage
            name="comment"
            component="div"
            className={css.comment_error}
          />
        </label>
        <div className={css.btn_wrapper}>
          <button className={css.button_out} type="submit">
            Add
          </button>
          <button
            className={css.button_cancel}
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddTransactionForm;
