import { Form, Formik, Field } from "formik";
import { useState } from "react";
import css from "./AddTransactionForm.module.css";
import { Icon } from "../../img/Icon";
import SelectDate from "../SelectDate/SelectDate";
import { selectCategories } from "../../redux/transactions/slice";
import { useSelector } from "react-redux";
// import Select from "react-select";

const AddTransactionForm = ({ closeModal }) => {
  const categories = useSelector(selectCategories);
  const categoriesArr = [];
  categories.map((category) =>
    categoriesArr.push({
      ...category,
      value: category.name,
      label: category.name,
    })
  );
  const [toggle, setToggle] = useState(true);
  const initialValues = {
    category: "",
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
          <Select
            name="category"
            placeholder="Select a category"
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
              }),
              // option: (styles) => ({
              //   ...styles,
              //   backgroundColor: "rgba(255, 255, 255, 0.1)",
              // }),
              singleValue: (styles) => ({
                ...styles,
                color: "rgb(251, 251, 251)",
              }),
              menuList: (styles) => {
                return {
                  ...styles,
                  borderRadius: "8px",
                  boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.25)",
                  // backdrop-filter: blur(100px);
                  background:
                    "linear-gradient(0.00deg, rgba(83, 61, 186, 0.7),rgba(80, 48, 154, 0.7) 43.139%,rgba(106, 70, 165, 0.52) 73.27%,rgba(133, 93, 175, 0.13) 120.028%)",
                };
              },
              placeholder: (styles) => ({
                ...styles,
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: "400",
                lineHeight: "1.5",
                letterSpacing: "0%",
                textAlign: "left",
              }),
              dropdownIndicator: (styles) => ({
                ...styles,
                color: "rgb(251, 251, 251)",
              }),
            }}
            options={categoriesArr}
          />
        )}
        <Field
          type="number"
          placeholder="0.00"
          name="amount"
          className={`${css.input} ${css.input_number}`}
        />
        <Field name="date">
          {({ field, form }) => (
            <SelectDate
              className={css.edit_amount}
              selected={field.value}
              onChange={(date) => form.setFieldValue(field.name, date)}
            />
          )}
        </Field>

        <Field
          as="textarea"
          placeholder="Comment"
          name="comment"
          className={`${css.input} ${css.textarea}`}
        />
        <div className={css.btn_wrapper}>
          <button type="submit">Add</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddTransactionForm;
