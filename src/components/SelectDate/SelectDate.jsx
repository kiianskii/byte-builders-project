import { useState } from "react";
import DatePicker from "react-datepicker";
import { Icon } from "../../img/Icon";
import css from "./SelectDate.module.css";

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      icon={<Icon size={18} id="calendar" />}
      className={css.input_date}
    />
  );
};

export default SelectDate;
