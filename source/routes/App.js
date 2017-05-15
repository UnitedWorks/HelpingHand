import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import TopBar from "../component-library/Navigation/TopBar";

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
				{/*<DevTools />*/}
				<TopBar />

				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Landing")} />
					)}
				/>
				<Route
					exact
					path="/:id"
					render={props => (
						<LazyRoute {...props} component={import("./Quest")} />
					)}
				/>
				<footer>
					{testval}
					<a href="https://twitter.com/mhaagens" target="_blank">
						@mhaagens
					</a>
					{" "}
					| github:
					{" "}
					<a href="https://github.com/mhaagens" target="_blank">
						mhaagens
					</a>
				</footer>
			</div>
		);
	}
}
