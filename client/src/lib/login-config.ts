import * as Yup from "yup";
import { FormikHelpers } from "formik";

export const initialValues = {
  email: "",
  password: ""
};

export type TValues = typeof initialValues;

export const validationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).required().label("Password")
});

export const handleSubmit = (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  console.log(values, actions);
};
