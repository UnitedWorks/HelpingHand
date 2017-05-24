import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';

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
				<section>
					{!!quest &&
						<article>
							<small>Give a hand to...</small>
							<h3>{quest.name}</h3>
							<p>{quest.description}</p>
						</article>}
				</section>
				<section>
					<ReactPlayer
						width={240}
						height={420}
						controls={true}
						url={quest.video_url}
						/>
				</section>
				<p>Here are ways you can help. Be sure to let them know when you do!</p>
				<section className="goals">
					{!!quest.goals && Array.prototype.map.call(quest.goals, (goal, index) => {
						return (
							<div className="goal" key={index}>
								<div className="goal__ask">
									<h5>#{index + 1} {goal.ask}</h5>
								</div>
								<div className="goal__giving">
									<small>Will Give</small>
									<h5>{goal.giving}</h5>
								</div>
								<div className="goal__proof">
									<small>Prove by</small>
									<p>{goal.proof_instructions}</p>
								</div>
							</div>
						)
					})}
				</section>
			</div>
		);
	}
}
