import { FormikHelpers } from "formik";

export const initialValues = {
  title: "",
  limit: "",
  deadline: "",
  disabled: "",
  fields: [""]
};

export type TValues = typeof initialValues;

export const handleSubmit = (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  console.log(values, actions);
};
