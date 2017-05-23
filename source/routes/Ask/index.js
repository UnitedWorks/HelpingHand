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
		this.recordedBlobs = [];
		this.store = this.props.store;
		this.mediaRecorder;
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
	// Media Helpers
	handleSourceOpen(event) {
	  console.log('MediaSource opened');
	  sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
	  console.log('Source buffer: ', sourceBuffer);
	}
	handleDataAvailable(event) {
		console.log(event)
	  if (event.data && event.data.size > 0) {
	    this.recordedBlobs.push(event.data);
	  }
	}
	handleStop(event) {
	  console.log('Recorder stopped: ', event);
	}
	startRecording() {
	  let options = { mimeType: 'video/webm;codecs=vp9' };
	  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
	    console.log(options.mimeType + ' is not Supported');
	    options = { mimeType: 'video/webm;codecs=vp8' };
	    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
	      console.log(options.mimeType + ' is not Supported');
	      options = { mimeType: 'video/webm' };
	      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
	        console.log(options.mimeType + ' is not Supported');
	        options = { mimeType: '' };
	      }
	    }
	  }
	  try {
	    this.mediaRecorder = new MediaRecorder(window.stream, options);
	  } catch (e) {
	    console.error('Exception while creating MediaRecorder: ' + e);
	    alert('Exception while creating MediaRecorder: '
	      + e + '. mimeType: ' + options.mimeType);
	    return;
	  }
	  console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
	  this.mediaRecorder.ondataavailable = this.handleDataAvailable;
		this.mediaRecorder.start(10000);
		this.mediaRecorder.onstop = this.handleStop;
	  console.log('MediaRecorder started', this.mediaRecorder);
	}
	stopRecording() {
	  this.mediaRecorder.stop();
	  console.log('Recorded Blobs: ', this.recordedBlobs);
	}
	toggleRecording() {
		if (this.refs.recordButton.textContent === 'Start Recording') {
			this.refs.recordButton.textContent = 'Stop Recording';
	    this.startRecording();
	  } else {
			this.refs.recordButton.textContent = 'Start Recording';
	    this.stopRecording();
	  }
	}
	play() {
	  let superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
	  this.refs.recordedVideo.src = window.URL.createObjectURL(superBuffer);
	}
	render() {
		// Setup Media/Navigator
		this.mediaSource = new MediaSource();
		this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);
		navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true
		}).then((stream) => {
			console.log('getUserMedia() got stream: ', stream);
			window.stream = stream;
			console.log(window.URL)
			if (window.URL) {
				this.refs.gumVideo.src = window.URL.createObjectURL(stream);
			} else {
				this.refs.gumVideo.src = stream;
			}
		}).catch((error) => {
			console.log('navigator.getUserMedia error: ', error);
		});
		return (
			<div className="ask">
				<Link className="back-button" to="/">← Back</Link>
				<section>
					<article>
						<div className="video-holders">
							<video ref="gumVideo" muted></video>
							<video ref="recordedVideo" loop></video>
						</div>
						<div>
							<button ref="recordButton" onClick={() => this.toggleRecording()}>Start Recording</button>
							<button ref="playButton" onClick={() => this.play()} disabled={this.state.recorded}>Playback</button>
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

// <div className="input-field">
// 	<label>Youtube URL (Under 1 minute!)</label>
// 	<input type="text" placeholder="Ex) https://www.youtube.com/watch?v=Sn7t-T3Ngzo" onChange={e => this.handleQuestChange('video_url', e.target.value)} />
// </div>
