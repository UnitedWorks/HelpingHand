import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import uuidV4 from 'uuid/v4';
import { S3Upload } from '../../utils/media';

import DataWrapper from "../Quest/QuestDataWrapper";

@DataWrapper
@observer
export default class Quest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileName: null,
			fileUploaded: false,
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
		this.handleFileUpload = this.handleFileUpload.bind(this);
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
	handleFileUpload() {
		const stateShot = this.state;
	  if (this.refs.fileInput.files[0].size > 50000000) {
	    return alert('Make sure file is under 50MB');
	  }
		this.setState({
			...stateShot,
			fileName: 'Loading... Takes a Moment.....',
		});
		S3Upload({
			id: uuidV4(),
			type: this.refs.fileInput.files[0].type,
			data: this.refs.fileInput.files[0],
		}).then((success) => {
			this.setState({
				...this.state,
				fileName: this.refs.fileInput.files[0].name,
				fileUploaded: true,
				quest: {
					...this.state.quest,
					video_url: success.publicUrl,
				},
			});
		}).catch(error => error);
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
						<div className="input-field input-file">
							<h2>👋</h2>
							<h6>Upload a video! Be short, informal, and captivating.</h6>
							<div>
								<input ref="fileInput" type="file" accept="video/*" onChange={this.handleFileUpload} />
								<b>Upload Video</b>{ this.state.fileName ? ` → ${this.state.fileName}` : ''}
							</div>
						</div>
						<div className="input-field">
							<label>Your Quest</label>
							<input type="text" placeholder="Helping Hand!" onChange={e => this.handleQuestChange('name', e.target.value)} />
						</div>
						<div className="input-field">
							<label>Why should we care?</label>
							<input type="text" placeholder="Give folks a way to ask a community for non-monetary assistance while still rewarding them for their help. Can be projects big and small!" onChange={e => this.handleQuestChange('description', e.target.value)} />
						</div>
						{Array.prototype.map.call([{},{}], (goal, index) => {
							return (
								<div className="ask-goal" key={index}>
									<div className="input-container">
										<div className="input-field">
											<label>I Need #{index + 1}</label>
											<input type="text" placeholder="I'm looking to community leaders!" onChange={e => this.handleGoalChange(index, 'ask', e.target.value)} />
										</div>
										<div className="input-field">
											<label>Prove It By</label>
											<input type="text" placeholder="Email me with x, y, z!" onChange={e => this.handleGoalChange(index, 'proof_instructions', e.target.value)} />
										</div>
										<div className="input-field">
											<label>What I'll Give</label>
											<input type="text" placeholder="I can help you out with design!" onChange={e => this.handleGoalChange(index, 'giving', e.target.value)} />
										</div>
									</div>
								</div>
							);
						})}
						<button disabled={!this.state.fileUploaded} onClick={() => this.handleSumbit()}>Submit Your 👋 →</button>
					</article>
				</section>
			</div>
		);
	}
}
