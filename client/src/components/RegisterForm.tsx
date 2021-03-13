import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import {
  handleSubmit,
  initialValues,
  validationSchema
} from "../lib/login-config";

const RegisterForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          component={TextField}
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          aria-required
          fullWidth
        />
        <Field
          component={TextField}
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          aria-required
          fullWidth
        />
      </Form>
    </Formik>
  );
};

export default RegisterForm;
