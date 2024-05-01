



import { Field, Form, Formik } from "formik";
import { NavLink } from 'react-router-dom';


export default function LoginForm({ type, onSubmit, initialValues })
{
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
         
          {type === "register" && (
            <Field type="text" name="username" placeholder="name" />
          )}
          <Field
            type="text"
            name="email"
            placeholder="email"
            autoComplete="username"
          />
          <Field
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
          />
          {type === "register" && (
            <Field
              type="password"
              name="confirmPassword"
              placeholder="confirmPassword"
            />
          )}
          
                  {type === 'login' ? (
              <div>
                <button type="submit">
                  log in
                </button>
                <NavLink to="/register">
                  register
                </NavLink>
              </div>
            ) : (
              <div>
                <button type="submit">
                  register
                </button>
                <NavLink  to="/login">
                  log in
                </NavLink>
              </div>
            )}{' '}
        </Form>
      </Formik>
    </div>
  );
}
