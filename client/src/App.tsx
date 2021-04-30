import "@fontsource/roboto";
import "@fontsource/nunito-sans/600.css";

import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { withQuicklink } from "quicklink/dist/react/hoc.js";
import Homepage from "./pages/Homepage";
import PageLoader from "./components/PageLoader";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
<<<<<<< HEAD
const Table = lazy(() => import("./pages/Table"));
const CreateForm = lazy(() => import("./pages/CreateForm"));
=======
const Dashboard = lazy(() => import("./pages/Dashboard"));
>>>>>>> apollo-client

const App = () => {
  return (
    <Switch>
      <Suspense fallback={<PageLoader />}>
        <Route path="/" component={Homepage} exact />
        <Route path="/login" component={withQuicklink(Login)} />
        <Route path="/register" component={withQuicklink(Register)} />
<<<<<<< HEAD
        <Route path="/table/:tableId" component={withQuicklink(Table)} />
        <Route
          path="/create-form/:draftId"
          component={withQuicklink(CreateForm)}
        />
=======
        <Route path="/dashboard" component={withQuicklink(Dashboard)} />
>>>>>>> apollo-client
      </Suspense>
    </Switch>
  );
};

export default App;
