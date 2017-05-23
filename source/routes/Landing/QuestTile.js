import React, { Component } from 'react';
import { Match, Link } from "react-router-dom";
import ReactPlayer from 'react-player'

export default class QuestTile extends Component {
  render() {

    const widths = [300, 270, 240];
    const width = widths[Math.floor(Math.random() * widths.length)];
    return (
      <div className={"quest-tile".concat(` width-${width}`)}>
        <div className="quest-tile__actions">
          <Link to={`quest${this.props.match.path}${this.props.quest.id}`}>
            <div className="header">
              <span className="giving">Giving</span>
              <span className="goArrow">→</span>
            </div>
            {Array.prototype.map.call(this.props.quest.goals, (quest, index) => {
              return (
                <div className="reward" key={index}>
                  <u>{index + 1}</u>) {quest.giving.length > 75 ? `${quest.giving.substring(0,75)}...` : quest.giving}
                </div>
              );
            })}
          </Link>
        </div>
        <div className="video-frame">
          <ReactPlayer
            width={width}
            controls={true}
            url={this.props.quest.video_url.includes('amazonaws.com') ?
              this.props.quest.video_url : `https://www.youtube.com/watch?v=${this.props.quest.video_url}`} />
        </div>
        <Link to={`quest${this.props.match.path}${this.props.quest.id}`}>
          <div className="header">
            <span className="giving">For help with {this.props.quest.name.length > 32 ? `${this.props.quest.name.substring(0,32)}...` : this.props.quest.name}!</span>
            <span className="goArrow">→</span>
          </div>
        </Link>
      </div>
    )
  }
};
