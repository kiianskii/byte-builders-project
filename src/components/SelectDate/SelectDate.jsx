import { useState } from "react";
import DatePicker from "react-datepicker";
import { Icon } from "../../img/Icon";

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      icon={<Icon size={18} id="calendar" />}
    />
  );
};

export default SelectDate;
