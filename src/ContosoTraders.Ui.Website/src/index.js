import React from "react";
import ReactDOM from "react-dom/client";
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
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
        <Provider store={store}><Router history={history}><App /></Router></Provider>
    );
})();