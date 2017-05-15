import("./styles/main.scss");
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import { rehydrate, hotRehydrate } from "rfx-core";

import { isProduction } from "./utils/constants";
import initializeFirebase from './utils/firebase';
import App from "./routes/App";
import stores from "./stores/stores";

import firebase from './utils/firebase';

const store = rehydrate();

const renderApp = Component => {
	render(
		<AppContainer>
			<Router>
				<Provider store={isProduction ? store : hotRehydrate()}>
					<App />
				</Provider>
			</Router>
		</AppContainer>,
		document.getElementById("root")
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
