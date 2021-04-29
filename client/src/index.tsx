import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./lib/theme";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import typeDefs from "./apollo/type-defs";
import typePolicies from "./apollo/type-policies";

const client = new ApolloClient({
  cache: new InMemoryCache({ typePolicies }),
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.REMOTE_SERVER
      : process.env.LOCAL_SERVER,
  typeDefs
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <App />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
