import { selectSummary } from "../../redux/transactions/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transactionByDateThunk } from "../../redux/transactions/operations";
import css from "./StatisticsTab.module.css";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function StatisticsTab() {
  const categoryes = [
    { categoryName: "Main expenses", categoryColor: "#FED057" },
    { categoryName: "Products", categoryColor: "#FFD8D0" },
    { categoryName: "Car", categoryColor: "#FD9498" },
    { categoryName: "Self care", categoryColor: "#C5BAFF" },
    { categoryName: "Child care", categoryColor: "#6E78E8" },
    { categoryName: "Household products", categoryColor: "#4A56E2" },
    { categoryName: "Education", categoryColor: "#81E1FF" },
    { categoryName: "Leisure", categoryColor: "#24CCA7" },
    { categoryName: "Other expenses", categoryColor: "#00AD84" },
    { categoryName: "Entertainment", categoryColor: "#FF868D" },
    { categoryName: "Income", categoryColor: "#FFB627" },
  ];

  // ==============================================================================================

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };

  // ===================================================================================================

  const dispatch = useDispatch();
  const [date, setDate] = useState({ month: 1, year: 2024 });
  useEffect(() => {
    dispatch(transactionByDateThunk(date));
  }, [date, dispatch]);

  const summary = useSelector(selectSummary);

  return (
    <div className={css.box}>
      {/* ================================================================================================ */}

      <div className={css.doughnut}>
        <Doughnut data={data} />
      </div>

      {/* ========================================================================================== */}
      <div className={css.selectAndTable}>
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

        {/* ===================================================================================================*/}

        <table className={css.table}>
          <thead className={css.thead}>
            <tr>
              <th className={css.th}>Category</th>
              <th className={css.th}>Sum</th>
            </tr>
          </thead>
          <tbody className={css.tbody}>
            {summary.categoriesSummary?.map((el) => {
              data.datasets[0].data.push(el.total);
              const color = categoryes.find(
                (elem) => elem.categoryName === el.name
              );
              data.datasets[0].backgroundColor.push(color.categoryColor);
              return (
                <tr className={css.tr}>
                  <td className={css.thtd}>
                    <span
                      className={css.span}
                      style={{ backgroundColor: color.categoryColor }}
                    ></span>
                    {el.name}
                  </td>
                  <td className={css.tht}>{el.total}</td>
                </tr>
              );
            })}
            <tr>
              <td className={css.thtd}>Expenses</td>
              <td className={css.tht}>{summary.expenseSummary}</td>
            </tr>
            <tr>
              <td className={css.thtd}>Income</td>
              <td className={css.tht}>{summary.incomeSummary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatisticsTab;
