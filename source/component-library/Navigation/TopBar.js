import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import ActiveLink from "../Inputs/Activelink";

import Button from "../Inputs/Button";

@withRouter
@inject("store")
@observer
export default class TopBar extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	authenticate(e) {
		if (e) e.preventDefault();
	}

	render() {
		const { authenticated } = this.store;
		return (
			<div className="topbar">
				<ActiveLink to="/">👋</ActiveLink>
			</div>
		);
	}
}
