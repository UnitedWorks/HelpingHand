import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import DataWrapper from "./QuestDataWrapper";

@DataWrapper
@observer
export default class Quest extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		const { quest } = this.store.questState;
		console.log('!?!?!??!?!!?')
		console.log(quest)
		console.log('!?!?!??!?!!?')
		return (
			<div className="page post">
				<Link to="/">← Back</Link>
				{!!quest &&
					<article>
						<h1>{quest.name}</h1>
						<p>{quest.description}</p>
					</article>}

			</div>
		);
	}
}
