import React, { Component } from "react";
import Webcam from './Webcam';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import RecordRTC from 'recordrtc';

import { captureUserMedia, S3Upload } from '../../utils/media';
import DataWrapper from "../Quest/QuestDataWrapper";

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
										navigator.mozGetUserMedia || navigator.msGetUserMedia);

@DataWrapper
@observer
export default class Quest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recordVideo: null,
			src: null,
			uploadSuccess: null,
			uploading: false,
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
		this.requestUserMedia = this.requestUserMedia.bind(this);
		this.startRecord = this.startRecord.bind(this);
		this.stopRecord = this.stopRecord.bind(this);
	}
	requestUserMedia() {
	  captureUserMedia((stream) => {
	    this.setState({
				...this.state,
				src: window.URL.createObjectURL(stream)
			});
	  });
	}
	startRecord() {
	  captureUserMedia((stream) => {
	    this.state.recordVideo = RecordRTC(stream, {
				type: 'video',
				video: {
					height: 480,
					width: 320,
				}
			});
	    this.state.recordVideo.startRecording();
	  });
	}
	stopRecord() {
    this.state.recordVideo.stopRecording(() => {
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000
      }
      this.setState({
				...this.state,
				uploading: true,
			});
			S3Upload(params)
				.then((success) => {
					console.log(success);
					this.setState({ uploadSuccess: true, uploading: false })
				});
		});
	}
	componentDidMount() {
		if (!hasGetUserMedia) {
			alert('Your browser cannot stream, please switch to Chrome or Firefox.')
			return;
		}
		this.requestUserMedia();
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
				<Link className="back-button" to="/">← Back</Link>
				<section>
					<article>
						<div className="video-holders">
							<Webcam src={this.state.src}></Webcam>
						</div>
						<div>
							<button ref="recordButton" onClick={this.startRecord}>Start Recording</button>
							<button ref="recordButton" onClick={this.stopRecord}>Stop Recording</button>
						</div>
						<div className="input-field">
							<label>Your Project</label>
							<input type="text" placeholder="Ex) Helping Hand!" onChange={e => this.handleQuestChange('name', e.target.value)} />
						</div>
						<div className="input-field">
							<label>About It</label>
							<input type="text" placeholder="Ex) Give folks a way to ask a community for non-monetary assistance while still rewarding them for their help. Can be projects big and small!" onChange={e => this.handleQuestChange('description', e.target.value)} />
						</div>
						{Array.prototype.map.call([{},{},{}], (goal, index) => {
							return (
								<div className="ask-goal" key={index}>
									<h6>Ask #{index + 1} {index !== 0 ? '(Optional)' : ''}</h6>
									<div className="input-container">
										<div className="input-field">
											<label>Need help with...</label>
											<input type="text" placeholder="I'm looking to community leaders!" onChange={e => this.handleGoalChange(index, 'ask', e.target.value)} />
										</div>
										<div className="input-field">
											<label>... can give in return....</label>
											<input type="text" placeholder="I am a great designer. I can help you out with a logo!" onChange={e => this.handleGoalChange(index, 'giving', e.target.value)} />
										</div>
										<div className="input-field">
											<label>...prove by...</label>
											<input type="text" placeholder="Email me with x, y, z!" onChange={e => this.handleGoalChange(index, 'proof_instructions', e.target.value)} />
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
