import "@fontsource/roboto";

import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// @ts-ignore
import { withQuicklink } from "quicklink/dist/react/hoc.js";
import Homepage from "./pages/Homepage";
import PageLoader from "./components/PageLoader";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Switch>
      <Suspense fallback={<PageLoader />}>
        <Route path="/" component={Homepage} exact />
        <Route path="/login" component={withQuicklink(Login)} />
        <Route path="/register" component={withQuicklink(Register)} />
      </Suspense>
    </Switch>
  );
};

export default App;
