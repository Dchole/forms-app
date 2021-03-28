import { FormikHelpers } from "formik";

export const initialValues = {
  title: "",
  fields: ""
};

export type TValues = typeof initialValues;

export const handleSubmit = (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  console.log({ actions, values });
};
