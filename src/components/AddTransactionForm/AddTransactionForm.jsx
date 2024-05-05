import { Form, Formik, Field } from "formik";
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
  console.log(categoriesArr);
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
    categoryId:
      toggle &&
      Yup.object().shape({
        value: Yup.string().required("Please choose any category"),
        label: Yup.string().required("Please choose any category"),
      }),
    amount: Yup.number().required("Please enter amount"),
    comment: Yup.string().required("Please enter a comment"),
    transactionDate: Yup.date().nullable("Please choose a date"),
  });
  function handleSubmit(data, options) {
    const query = {
      ...data,
      categoryId: toggle
        ? data.categoryId.id
        : "063f1132-ba5d-42b4-951d-44011ca46262",
      transactionDate: startDate,
      type: toggle ? "EXPENSE" : "INCOME",
      amount: toggle ? -data.amount : data.amount,
    };
    if (query.transactionDate === null) return;
    dispatch(sendTransactionThunk(query));
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
          <Field name="categoryId">
            {({ field, form }) => (
              <Select
                placeholder="Select a category"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
                    paddingLeft: "20px",
                    width: WIDTH,
                    height: "35px",
                  }),
                  input: (styles) => ({
                    ...styles,
                    color: "rgb(251, 251, 251)",
                  }),
                  indicatorsContainer: (styles) => ({
                    ...styles,
                    height: "35px",
                  }),
                  valueContainer: (styles) => ({
                    ...styles,
                    paddingLeft: "0",
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
                      backdropFilter: "blur(100px)",
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
                    // width: "18px",
                    // height: "9px",
                  }),
                  indicatorSeparator: (styles) => ({
                    ...styles,
                    display: "none",
                  }),
                }}
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
        )}
        {isMobile ? (
          <>
            <Field
              type="number"
              placeholder="0.00"
              name="amount"
              className={`${css.input} ${css.input_number}`}
            />
            <div className={css.wrapper}>
              <SelectDate startDate={startDate} setStartDate={setStartDate} />
            </div>
          </>
        ) : (
          <div className={css.amount_date_box}>
            <Field
              type="number"
              placeholder="0.00"
              name="amount"
              className={`${css.input} ${css.input_number}`}
            />
            <div className={css.wrapper}>
              <SelectDate startDate={startDate} setStartDate={setStartDate} />
            </div>
          </div>
        )}

        <Field
          as="textarea"
          placeholder="Comment"
          name="comment"
          className={`${css.input} ${css.textarea}`}
        />
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
