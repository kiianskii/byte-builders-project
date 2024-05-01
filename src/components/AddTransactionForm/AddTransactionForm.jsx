import { Form, Formik, Field } from "formik";
import { useState } from "react";
import css from "./AddTransactionForm.module.css";
import { Icon } from "../../img/Icon";
import SelectDate from "../SelectDate/SelectDate";

const AddTransactionForm = ({ closeModal }) => {
  const [toggle, setToggle] = useState(true);
  const initialValues = {
    category: "car",
    amount: "",
    date: "",
    comment: "",
  };

  function handleSubmit(data, options) {
    console.log(data);
    options.resetForm();
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div className={css.switch_wrapper}>
          <p className={toggle ? css.switcher_text : css.income}>Income</p>
          <div
            className={css.toggle_container}
            onClick={() => setToggle(!toggle)}
          >
            <div className={toggle ? css.disable : css.toggle_btn}>
              {!toggle ? (
                <Icon size={20} id="plus" />
              ) : (
                <Icon size={20} id="minus" />
              )}
            </div>
          </div>
          <p className={!toggle ? css.switcher_text : css.expense}>Expense</p>
        </div>
        {toggle ? (
          <Field as="select" name="category">
            <option value="main_expenses">Main expenses</option>
            <option value="products">Products</option>
            <option value="car">Car</option>
            <option value="self_care">Self care</option>
            <option value="child_care">Child care</option>
            <option value="household_products">Household products</option>
            <option value="education">Education</option>
            <option value="leisure">Leisure</option>
          </Field>
        ) : (
          ""
        )}
        <Field type="number" placeholder="0.00" name="amount" />
        {/* <Field type="date" /> */}
        <SelectDate />
        <Field as="textarea" placeholder="Comment" name="comment" />
        <button type="submit">Add</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default AddTransactionForm;
