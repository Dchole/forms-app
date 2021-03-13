import { useLocation, Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import useFormStyles from "../styles/useFormStyles";

const FormWrapper: React.FC = ({ children }) => {
  const classes = useFormStyles();
  const { pathname } = useLocation();
  const onLoginPage = pathname === "/login";

  return (
    <Container maxWidth="xs" classes={{ root: classes.root }}>
      <Paper component="main">
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          {onLoginPage ? "Sign In" : "Sign Up"}
        </Typography>
        {children}
        <Grid alignItems="center" justify="space-between" container>
          {onLoginPage ? (
            <Link component={RouterLink} to="/forgot-password">
              Forgot Password
            </Link>
          ) : (
            <div></div>
          )}
          <Link
            component={RouterLink}
            to={onLoginPage ? "/register" : "/login"}
          >
            {onLoginPage
              ? "Create an account"
              : "Already have an account? Login here"}
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FormWrapper;
