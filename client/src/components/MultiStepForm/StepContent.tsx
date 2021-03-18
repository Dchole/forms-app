import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface IStepContentProps {
  step: number;
}

const StepContent: React.FC<IStepContentProps> = ({ step }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  return step === 0 ? (
    <>
      <Field
        component={TextField}
        id="firstName"
        name="firstName"
        label="First Name"
        variant="outlined"
        autoComplete="given-name"
        autoCapitalize="on"
        aria-required
        autoFocus
        fullWidth
      />
      <Field
        component={TextField}
        id="lastName"
        name="lastName"
        label="Last Name"
        margin="normal"
        variant="outlined"
        autoComplete="family-name"
        autoCapitalize="on"
        aria-required
        fullWidth
      />
    </>
  ) : (
    <>
      <Field
        component={TextField}
        id="email"
        type="email"
        name="email"
        label="Email"
        margin="normal"
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
        autoComplete="new-password"
        aria-required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide password" : "show password"}
                onClick={handleToggle}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

export default StepContent;
