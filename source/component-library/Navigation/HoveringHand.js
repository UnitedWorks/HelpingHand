import React, { Component } from "react";
import { Link } from "react-router-dom";
import ActiveLink from "../Inputs/Activelink";

export default class HoveringHand extends Component {
	render() {
		return (
			<div className="hovering-hand">
				<Link to="/ask">👋</Link>
			</div>
		);
	}
}
