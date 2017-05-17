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
		return (
			<div className="quest">
				<Link to="/">← Back</Link>
				{!!quest &&
					<article>
						<h1>{quest.name}</h1>
						<p>{quest.description}</p>
						<hr/>
						{!!quest.goals && Array.prototype.map.call(quest.goals, (goal, index) => {
							return (
								<div key={index}>
									<h5>{goal.need}</h5>
									<h6>{goal.reward}</h6>
									<p>{goal.proof_instructions}</p>
								</div>
							)
						})}
					</article>}
			</div>
		);
	}
}
