import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";
import { Helmet } from "react-helmet";

import TopBar from "../component-library/Navigation/TopBar";
import HoveringHand from "../component-library/Navigation/HoveringHand";

@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		const {
			testval
		} = this.store.appState;
		return (
			<div className="wrapper">
				<Helmet>
					<link rel="icon" type="image/png" href={require('../assets/hand.png')} />
				</Helmet>
				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Landing")} />
					)}
				/>
				<Route
					exact
					path="/ask"
					render={props => (
						<LazyRoute {...props} component={import("./Ask")} />
					)}
				/>
				<Route
					exact
					path="/quest/:id"
					render={props => (
						<LazyRoute {...props} component={import("./Quest")} />
					)}
				/>
				<footer>
					<p>😘😘😘 to ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____, ____ & 🔨 by <a href="https://mayor.chat" target="_blank">Hey Mayor!</a></p>
				</footer>
			</div>
		);
	}
}
