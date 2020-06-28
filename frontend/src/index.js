import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import { Provider } from 'react-redux'
import reducers from '../src/my_main/reducers'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { applyMiddleware, createStore } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise, thunk, multi)(createStore)(
  reducers,
  devTools)

ReactDOM.render(
  <Provider store={store}>
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <App />
        </MuiThemeProvider>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
