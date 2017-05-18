import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import axios from 'axios';

import DataWrapper from "../Quest/QuestDataWrapper";

@DataWrapper
@observer
export default class Quest extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.state = {
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
		};
		this.handleQuestChange = this.handleQuestChange.bind(this);
		this.handleGoalChange = this.handleGoalChange.bind(this);
	}
	handleQuestChange(key, value) {
		const newState = this.state;
		newState[key] = value;
		this.setState(newState);
	}
	handleGoalChange(index, key, value) {
		const newState = this.state;
		newState.goals[index][key] = value;
		this.setState(newState);
	}
	handleSumbit() {
		axios.post('quests', { quest: this.state }).then(() => {
			alert('Sent!');
			this.props.history.push('/');
		}).catch(() => {
			alert('Sent!');
			this.props.history.push('/');
		});
	}
	render() {
		console.log(this)
		return (
			<div className="ask">
				<Link className="back-button" to="/">← Back</Link>
				<section>
					<article>
						<h3>Ask for a Hand (Video Required)</h3>
						<p>Go download the <u>Youtube app</u> for recording/uploading/getting a link to do this via mobile!</p>
						<br />
						<div className="input-field">
							<label>Your Quest</label>
							<input type="text" placeholder="Ex) Helping Hand!" onChange={e => this.handleQuestChange('name', e.target.value)} />
						</div>
						<div className="input-field">
							<label>Description</label>
							<input type="text" placeholder="Ex) Give folks a way to ask a community for non-monetary assistance while still rewarding them for their help. Can be projects big and small!" onChange={e => this.handleQuestChange('description', e.target.value)} />
						</div>
						<div className="input-field">
							<label>Youtube URL (Under 1 minute!)</label>
							<input type="text" placeholder="Ex) https://www.youtube.com/watch?v=Sn7t-T3Ngzo" onChange={e => this.handleQuestChange('video_url', e.target.value)} />
						</div>
						{Array.prototype.map.call([{},{},{}], (goal, index) => {
							return (
								<div className="ask-goal" key={index}>
									<h6>Ask #{index + 1} {index !== 0 ? '(Optional)' : ''}</h6>
									<div className="input-field">
										<label>Asking For</label>
										<input type="text" placeholder="I'm looking to community leaders!" onChange={e => this.handleGoalChange(index, 'ask', e.target.value)} />
									</div>
									<div className="input-field">
										<label>Giving in Return</label>
										<input type="text" placeholder="I am a great designer. I can help you out with a logo!" onChange={e => this.handleGoalChange(index, 'giving', e.target.value)} />
									</div>
									<div className="input-field">
										<label>Proof by</label>
										<input type="text" placeholder="Email ___ with x, y, z!" onChange={e => this.handleGoalChange(index, 'proof_instructions', e.target.value)} />
									</div>
								</div>
							)
						})}
						<br/>
						<button onClick={() => this.handleSumbit()}>Submit →</button>
					</article>
				</section>
			</div>
		);
	}
}
