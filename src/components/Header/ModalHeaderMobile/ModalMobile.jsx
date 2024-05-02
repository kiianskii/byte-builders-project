import css from "./ModalMobile.module.css";
const ModalMobile = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>{children}</div>
    </div>
  );
};
export default ModalMobile;
