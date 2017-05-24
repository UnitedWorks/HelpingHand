import React, { Component } from 'react';
import { Match, Link } from "react-router-dom";
import ReactPlayer from 'react-player'

export default class QuestTile extends Component {
  render() {

    const widths = [270, 240];
    const width = widths[Math.floor(Math.random() * widths.length)];
    return (
      <div className={"quest-tile".concat(` width-${width}`)}>
        <div className="quest-tile__actions">
          <Link to={`quest${this.props.match.path}${this.props.quest.id}`}>
            <div className="header">
              <span className="giving">Asking For</span>
              <span className="goArrow">→</span>
            </div>
            {Array.prototype.map.call(this.props.quest.goals, (goal, index) => {
              return (
                <div className="reward" key={index}>
                  <u>{index + 1}</u>) {goal.ask.length > 75 ? `${goal.ask.substring(0,75)}...` : goal.ask}
                </div>
              );
            })}
          </Link>
        </div>
        <div className="video-frame">
          <ReactPlayer
            width={width}
            height={width*1.777}
            controls={true}
            url={this.props.quest.video_url} />
        </div>
        <div className="quest-tile__actions">
          <Link to={`quest${this.props.match.path}${this.props.quest.id}`}>
            <div className="header">
              <span className="giving">Giving in Return</span>
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
      </div>
    )
  }
};
