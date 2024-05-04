import { selectSummary } from "../../redux/transactions/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transactionByDateThunk } from "../../redux/transactions/operations";
import css from "./StatisticsTab.module.css";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Select from "react-select";
import "./MySelect.css";
import clsx from "clsx";
import { selectBalance } from "../../redux/auth/selectors";
import "chartjs-plugin-annotation";
import "chartjs-plugin-style";
import { StyleDoughnutController } from "chartjs-plugin-style";
// Chart.register(StyleDoughnutController);

function StatisticsTab() {
  const balance = useSelector(selectBalance);

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
  const selectMonth = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const selectYear = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
  ];

  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedYear, setSelectedYear] = useState("1");
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: 181,
      height: 157,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      transition: "transform 0.2s ease-in-out",
    }),
    input: (provided, state) => ({
      ...provided,
      height: 50,
      width: 181,
    }),
  };

  // ============================================================================================

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [],
    datasets: [
      {
        // label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderColor: "transparent",
      },
    ],
  };
  const options = {
    cutout: 100,
    plugins: {
      style: {
        // Налаштування ефекту bevel
        bevel: {
          // Розмір фаски
          size: 5,
          // Колір фаски
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          // Колір тіні
          shadowColor: "rgba(0, 0, 0, 0.5)",
          // Прозорість тіні
          shadowBlur: 10,
          // Зсув тіні по горизонталі
          shadowOffsetX: 3,
          // Зсув тіні по вертикалі
          shadowOffsetY: 3,
        },
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      console.log(balance);
      if (
        chart.data.datasets.length > 0 &&
        chart.data.datasets[0].data.length > 0
      ) {
        ctx.save();
        ctx.font = "600 18px Poppins";
        ctx.fillStyle = "#FBFBFB";
        ctx.textAlign = "center";
        ctx.textBaseline = "center";
        ctx.fillText(
          balance,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y
        );
        ctx.restore();
      }
    },
  };

  // ===================================================================================================

  const dispatch = useDispatch();
  const [date, setDate] = useState({ month: 1, year: 2024 });
  useEffect(() => {
    dispatch(
      transactionByDateThunk({
        month: selectedMonth.value,
        year: selectedYear.value,
      })
    );
  }, [date, dispatch, selectedMonth, selectedYear]);

  const summary = useSelector(selectSummary);

  const classExpenses = clsx(css.thtd, css.classExpenses);
  const classExpensesValue = clsx(css.tht, css.classExpensesValue);
  const classIncomeValue = clsx(css.tht, css.classIncomeValue);

  return (
    <div className={css.box}>
      {/* ================================================================================================ */}

      <div className={css.doughnut}>
        <h2 className={css.doughnutText}>Statistics</h2>
        <Doughnut data={data} options={options} plugins={[textCenter]} />
      </div>

      {/* ========================================================================================== */}
      <div className={css.selectAndTable}>
        <div className={css.SearchBox}>
          {/* <div className="inputSelect"> */}
          <Select
            options={selectMonth}
            defaultValue={selectedMonth}
            onChange={setSelectedMonth}
            classNamePrefix="input"
            styles={customStyles}
            className="selectInput"
          />
          {/* </div> */}

          <Select
            options={selectYear}
            defaultValue={selectedYear}
            onChange={setSelectedYear}
            classNamePrefix="input"
            styles={customStyles}
            className="selectInput"
          />
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
                <tr className={css.tr} key={el.id}>
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
              <td className={classExpenses}>Expenses</td>
              <td className={classExpensesValue}>{summary.expenseSummary}</td>
            </tr>
            <tr>
              <td className={classExpenses}>Income</td>
              <td className={classIncomeValue}>{summary.incomeSummary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatisticsTab;
