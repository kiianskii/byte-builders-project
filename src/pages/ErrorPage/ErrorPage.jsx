import { Link } from "react-router-dom";
import s from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={s.container}>
      <div className={s.block404}>
        <div className={s.text}>
          <p className={s.four}>4</p>
          {/* Gif  ↓ */}
          <div className={s.oval}>
            <img
              src="/src/img/404.gif"
              className={s.gif}
              alt="Ooops!"
              title="Last page!"
            />
          </div>
          <p className={s.four}>4</p>
        </div>
        <p className={s.oops}>
          Oops! We can't find the page you are looking for! <br />
          Or maybe you just got lost!
        </p>
        <Link to="/" className={s.gohome}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
