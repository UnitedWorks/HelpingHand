import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

import DataWrapper from "../Quest/QuestDataWrapper";
import QuestTile from './QuestTile';

@DataWrapper
@observer
export default class Landing extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		const { quests } = this.store.questState;
		return (
			<div className="quests">
				<Link to="/ask">
					<div className="quest-tile width-240 asking-tile">
						<p>Request Help</p>
						<h2>👋</h2>
					</div>
				</Link>
				{quests && quests.length
					? quests.map(quest => {
							return (
								<QuestTile key={quest.id} quest={quest} match={this.props.match}></QuestTile>
							);
						})
					: "Loading..."}
			</div>
		);
	}
}
