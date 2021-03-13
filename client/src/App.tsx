import "@fontsource/roboto";

import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// @ts-ignore
import { withQuicklink } from "quicklink/dist/react/hoc.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Homepage from "./pages/Homepage";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Suspense fallback={<CircularProgress />}>
          <Route path="/" component={Homepage} exact />
          <Route path="/login" component={withQuicklink(Login)} />
          <Route path="/register" component={withQuicklink(Register)} />
        </Suspense>
      </Switch>
    </>
  );
};

export default App;
