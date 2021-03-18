import FormWrapper from "../components/FormWrapper";
import MultiStepForm from "../components/MultiStepForm";
import RegisterForm from "../components/RegisterForm";
import useDevice from "../hooks/useDevice";

const Login = () => {
  const device = useDevice();

  return (
    <FormWrapper>
      {device === "mobile" ? <MultiStepForm /> : <RegisterForm />}
    </FormWrapper>
  );
};

export default Login;
