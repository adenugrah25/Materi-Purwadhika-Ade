import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as serviceWorker from './serviceWorker';

//setup redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers";

const globalStore = createStore(Reducers)
globalStore.subscribe(() => console.log('global store : ', globalStore.getState()))

ReactDOM.render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
