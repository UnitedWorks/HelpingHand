import React, { Component } from "react";
import Webcam from './Webcam';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import axios from 'axios';

import DataWrapper from "../Quest/QuestDataWrapper";

@DataWrapper
@observer
export default class Quest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quest: {
				name: '',
				description: '',
				video_url: '',
				goals: [{
					ask: '',
					giving: '',
					proof_instructions: '',
				},{
					ask: '',
					giving: '',
					proof_instructions: '',
				}, {
					ask: '',
					giving: '',
					proof_instructions: '',
				}],
			}
		};
		this.handleQuestChange = this.handleQuestChange.bind(this);
		this.handleGoalChange = this.handleGoalChange.bind(this);
	}
	handleQuestChange(key, value) {
		const newState = this.state;
		newState.quest[key] = value;
		this.setState(newState);
	}
	handleGoalChange(index, key, value) {
		const newState = this.state;
		newState.quest.goals[index][key] = value;
		this.setState(newState);
	}
	handleSumbit() {
		axios.post('quests', { quest: this.state.quest }).then(() => {
			alert('Sent!');
			this.props.history.push('/');
		}).catch(() => {
			alert('Sent!');
			this.props.history.push('/');
		});
	}
	render() {
		return (
			<div className="ask">
				<section>
					<article>
						<div className="input-field">
							<h3>Ask for a 👋</h3>
							<h6>URL to your video! Be short, informal, and captivating.</h6>
							<input type="video_url" placeholder="Ex) youtube.com/watch?v=124812482" onChange={e => this.handleQuestChange('video_url', e.target.value)} />
						</div>
						<div className="input-field">
							<label>Your Quest</label>
							<input type="text" placeholder="Ex) Helping Hand!" onChange={e => this.handleQuestChange('name', e.target.value)} />
						</div>
						<div className="input-field">
							<label>Why should we care?</label>
							<input type="text" placeholder="Ex) Give folks a way to ask a community for non-monetary assistance while still rewarding them for their help. Can be projects big and small!" onChange={e => this.handleQuestChange('description', e.target.value)} />
						</div>
						<br/>
						{Array.prototype.map.call([{},{}], (goal, index) => {
							return (
								<div className="ask-goal" key={index}>
									<h6>Need #{index + 1}</h6>
									<div className="input-container">
										<div className="input-field">
											<label>I Need</label>
											<input type="text" placeholder="I'm looking to community leaders!" onChange={e => this.handleGoalChange(index, 'ask', e.target.value)} />
										</div>
										<div className="input-field">
											<label>Prove You've Done It By</label>
											<input type="text" placeholder="Email me with x, y, z!" onChange={e => this.handleGoalChange(index, 'proof_instructions', e.target.value)} />
										</div>
										<div className="input-field">
											<label>I'll Give</label>
											<input type="text" placeholder="I can help you out with design!" onChange={e => this.handleGoalChange(index, 'giving', e.target.value)} />
										</div>
									</div>
								</div>
							)
						})}
						<button onClick={() => this.handleSumbit()}>Submit →</button>
					</article>
				</section>
			</div>
		);
	}
}
