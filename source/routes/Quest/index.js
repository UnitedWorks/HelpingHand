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
				<Link className="back-button" to="/">← Back</Link>
				<section>
					{!!quest &&
						<article>
							<h6>Give a hand to...</h6>
							<h1>{quest.name}</h1>
							<p>{quest.description}</p>
							<br/>
							{!!quest.goals && Array.prototype.map.call(quest.goals, (goal, index) => {
								return (
									<div className="goal" key={index}>
										<h5><u>Asking</u>: {goal.ask}</h5>
										<h6><u>Giving</u>: {goal.giving}</h6>
										<p><u>Prove by</u>: {goal.proof_instructions}</p>
									</div>
								)
							})}
						</article>}
					{!!quest && <aside>
						<iframe id="ytplayer" type="text/html" src={`https://www.youtube.com/embed/${quest.video_url}?controls=0&fs=0&loop=1&modestbranding=1&rel=0&color=white`} />
					</aside>}
				</section>
			</div>
		);
	}
}
