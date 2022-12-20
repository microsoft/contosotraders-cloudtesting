import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./index.css";
import App from "./App";
import './i18n';
import store from './store';
import ConfigService from './services/configService';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ basename: "" });
(async () => {
    await ConfigService.loadSettings();

    ReactDOM.render(
        <Provider store={store}><Router history={history}><App /></Router></Provider>,
        document.getElementById('root')
    );
})();