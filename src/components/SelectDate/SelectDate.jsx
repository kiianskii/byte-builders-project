import DatePicker from "react-datepicker";
import { Icon } from "../../img/Icon";
import css from "./SelectDate.module.css";

const SelectDate = ({ startDate, setStartDate }) => {
  return (
    <DatePicker
      showIcon
      className={css.input_date}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd/MM/yyyy"
      icon={<Icon size={18} id="calendar" className={css.icon} />}
    />
  );
};

export default SelectDate;
