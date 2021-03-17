import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  handleSubmit,
  initialValues,
  validationSchema
} from "../lib/login-config";
import useFormStyles from "../styles/useFormStyles";

const LoginForm = () => {
  const classes = useFormStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <Form>
            <Field
              component={TextField}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              autoComplete="email"
              aria-required
              fullWidth
            />
            <Field
              component={TextField}
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              aria-required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "hide password" : "show password"
                      }
                      onClick={handleToggle}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Form>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={isSubmitting}
            disableElevation={isSubmitting}
            aria-busy={isSubmitting}
            fullWidth
          >
            {isSubmitting ? <CircularProgress size={25} /> : "Sign In"}
          </Button>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
