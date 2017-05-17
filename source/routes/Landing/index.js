import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Match, Link } from "react-router-dom";

import DataWrapper from "../Quest/QuestDataWrapper";

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
			<div className="page posts">
				<h1>Quests</h1>
				<p className="subheader">
					Quests are fetched from Postgres (get out of here firebase)
				</p>
				<hr />
				<ul>
					{quests && quests.length
						? quests.map(quest => {
								return (
									<li key={quest.id}>
										<Link to={`${this.props.match.path}${quest.id}`}>
											<h1>{quest.name}</h1>
										</Link>
										<p>{quest.description.substring(0, 120)}</p>
									</li>
								);
							})
						: "Loading..."}
				</ul>
			</div>
		);
	}
}
