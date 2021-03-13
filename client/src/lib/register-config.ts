import * as Yup from "yup";
import { FormikHelpers } from "formik";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

export type TValues = typeof initialValues;

export const validationSchema = Yup.object({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).required().label("Password")
});

export const handleSubmit = (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  console.log(values, actions);
};
