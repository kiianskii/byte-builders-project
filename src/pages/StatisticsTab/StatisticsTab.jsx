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
import { categoryes } from "./constans";
import { selectMonth } from "./constans";
import { selectYear } from "./constans";

function StatisticsTab() {
  const balance = useSelector(selectBalance);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const nowMonth = selectMonth.find(
    (el) => el.value === currentMonth.toString()
  );
  const nowYear = selectYear.find((el) => el.value === currentYear.toString());

  const [selectedMonth, setSelectedMonth] = useState(nowMonth);
  const [selectedYear, setSelectedYear] = useState(nowYear);
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      transition: "transform 0.2s ease-in-out",
    }),
    input: (provided, state) => ({
      ...provided,
    }),
  };

  // ============================================================================================

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: "transparent",
      },
    ],
  };

  const [cutoutValue, setCutoutValue] = useState();

  useEffect(() => {
    function handleResize() {
      if (window.matchMedia("(min-width: 1150px)").matches) {
        setCutoutValue(100);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setCutoutValue(120);
      } else if (window.matchMedia("(min-width: 320px)").matches) {
        setCutoutValue(100);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = {
    cutout: cutoutValue,
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
      if (
        chart.data.datasets.length > 0 &&
        chart.data.datasets[0].data.length > 0
      ) {
        ctx.save();
        ctx.font = "600 18px Poppins";
        ctx.fillStyle = "#FBFBFB";
        ctx.textAlign = "center";
        ctx.textBaseline = "center";
        const formattedBalance = balance.toFixed(2);
        // const balanceWithSymbol = `₴ ${formattedBalance}`;
        ctx.fillText(
          `₴ ${formattedBalance}`,
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

  return (
    <div className={css.box}>
      {/* ================================================================================================ */}

      <div className={css.doughnut}>
        <h2 className={css.doughnutText}>Statistics</h2>
        {/* <Doughnut data={data} options={options} plugins={[textCenter]} /> */}
        {summary.expenseSummary !== 0 || summary.incomeSummary !== 0 ? (
          <Doughnut data={data} options={options} plugins={[textCenter]} />
        ) : (
          <p className={css.noTrasaction}>
            There are no transactions for this period
          </p>
        )}
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
            // placeholder="Please select a month"
          />
          {/* </div> */}

          <Select
            options={selectYear}
            defaultValue={selectedYear}
            onChange={setSelectedYear}
            classNamePrefix="input"
            styles={customStyles}
            className="selectInput"
            placeholder="Please select a year"
          />
        </div>

        {/* ===================================================================================================*/}

        <div className={css.wrapper}>
          <span>Category</span>
          <span>Sum</span>
        </div>
        <div className={css.tbl}>
          <table className={css.table}>
            <tbody className={css.tbody}>
              {summary.categoriesSummary?.map((el, idx) => {
                data.datasets[0].data.push(el.total);
                const color = categoryes.find(
                  (elem) => elem.categoryName === el.name
                );
                data.datasets[0].backgroundColor.push(color.categoryColor);
                return (
                  <tr className={css.tr} key={idx}>
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
            </tbody>
          </table>
        </div>

        <div className={css.footer}>
          <div className={css.footerText}>
            <span className={css.textSpan}>Expenses</span>
            <span className={css.textSpan}>Income</span>
          </div>
          <div className={css.footerNumber}>
            <span className={css.numberSpan}>{summary.expenseSummary}</span>
            <span className={css.numberSpan}>{summary.incomeSummary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsTab;
