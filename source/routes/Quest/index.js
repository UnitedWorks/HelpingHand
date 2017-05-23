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
					<aside>
						<ReactPlayer
							width={300}
	            controls={true}
	            url={!!quest.video_url && quest.video_url.includes('amazonaws.com') ?
								quest.video_url : `https://www.youtube.com/watch?v=${quest.video_url}`}
						/>
					</aside>
				</section>
			</div>
		);
	}
}
