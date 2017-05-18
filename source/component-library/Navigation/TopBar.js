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

	render() {
		return (
			<div className="topbar">
				<Link to="/"><p>Give a </p></Link><ActiveLink to="/">👋</ActiveLink> <Link to="/ask"><p>or ask for one →</p></Link>
			</div>
		);
	}
}
