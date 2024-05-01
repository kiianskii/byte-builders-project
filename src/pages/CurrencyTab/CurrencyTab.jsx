import { useDispatch } from "react-redux";
import { currencyThunk } from "../../store/thunks/currencyThunk";

const CurrencyTab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(currencyThunk());
  };

  return (
    <a href="/currency" onClick={handleClick}>
      View current exchange rates
    </a>
  );
};

export default CurrencyTab;
