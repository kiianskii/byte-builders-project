import * as Yup from "yup";

export default function Validation(type) {

  const validationSchema = Yup.object().shape({
    username:
      type === "register"
        ? Yup.string()
            .min(2, "Name: min 2 chars")
            .max(50, "Name: max 50 chars")
            .required("Name is required")
        : Yup.string()
            .min(2, "Name: min 2 chars")
            .max(50, "Name: max 50 chars"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password: min 6 chars")
      .required("Password is required"),
    confirmPassword:
      type === "register"
        ? Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password")], "Passwords must match")
        : Yup.string(),
  });


  return validationSchema;
}
