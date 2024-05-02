
import * as Yup from "yup";

export default function Validation(type) {
  const validationSchema = () =>
    Yup.object({
      username: Yup.string()
        .min(2, "Name must be longer than 2 characters")
        .max(50, "Name must be shorter than 50 characters")
        .when("$type", {
          is: "register",
          then: Yup.string().required("Name is required"),
        }),
      email: Yup.string()
        .email("Invalid email address")
        .required(""),
      password: Yup.string()
        .min(6, "Password must be longer than 8 characters")
        .required(""),
        confirmPassword: Yup.string()
        .required('confirmPassRequired')
        .oneOf([Yup.ref('password')], ('matchPassword'))
    
        
    });

  return validationSchema();
}
