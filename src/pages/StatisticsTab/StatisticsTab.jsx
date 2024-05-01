import { selectSummary } from "../../redux/transactions/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transactionByDateThunk } from "../../redux/transactions/operations";
import css from "./StatisticsTab.module.css";
import { useEffect, useState } from "react";

function StatisticsTab() {
  const dispatch = useDispatch();
  const [date, setDate] = useState({ month: 1, year: 2024 });
  useEffect(() => {
    dispatch(transactionByDateThunk(date));
  }, [date]);

  return (
    <div className={css.box}>
      <div className={css.SearchBox}>
        <select
          name="month"
          onChange={(e) => setDate({ ...date, month: +e.target.value })}
          className={css.input}
        >
          <option value="1" selected>
            January
          </option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select
          name="year"
          onChange={(e) => setDate({ ...date, year: +e.target.value })}
          className={css.input}
        >
          <option value="2024" selected>
            2024
          </option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
        </select>
      </div>
    </div>
  );
}

export default StatisticsTab;
