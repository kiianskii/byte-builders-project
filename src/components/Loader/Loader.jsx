import s from "./Loader.module.css";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={s.loader}>
      <Circles
        height="80"
        width="80"
        color="#FFFF00"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};
export default Loader;
