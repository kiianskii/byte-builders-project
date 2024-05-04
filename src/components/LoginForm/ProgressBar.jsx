
import PasswordStrengthBar from 'react-password-strength-bar';

import s from "./LoginForm.module.css";

const ProgressBar = ({ password }) => {
  return (
    <div className={s.porgress_container}>
      <PasswordStrengthBar
        password={password}
        minLength={6}
        scoreWordStyle={{ display: 'none' }}
        className={s.strengthBar}
      />
    </div>
  );
};

export default ProgressBar;