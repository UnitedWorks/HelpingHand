import React, { Component } from 'react';
import { Match, Link } from "react-router-dom";
import ReactPlayer from 'react-player'

export default class QuestTile extends Component {
  render() {

    const widths = [270, 240];
    const width = widths[Math.floor(Math.random() * widths.length)];
    return (
      <div className={"quest-tile".concat(` width-${width}`)}>
        <div className="video-frame">
          <ReactPlayer
            width={width}
            height={width*1.777}
            controls={true}
            url={this.props.quest.video_url} />
        </div>
        {Array.prototype.map.call(this.props.quest.goals, (goal, index) => {
          return (
            <div className="quest-tile__list-item" key={index}>
              <Link to={`quest${this.props.match.path}${this.props.quest.id}`}>
                <div className="header">
                  <span className="giving"><u>Ask</u>: {goal.ask.length > 75 ? `${goal.ask.substring(0,75)}...` : goal.ask}</span>
                </div>
                <div className="reward" key={index}>
                  <u>Giving</u>: {goal.giving.length > 75 ? `${goal.giving.substring(0,75)}...` : goal.giving}
                </div>
              </Link>
            </div>
            );
          })}
        <a href={`mailto:${this.props.quest.contact_email}`} target="_blank"><div className="quest-tile__actions">
          Help {this.props.quest.contact_name}
        </div></a>
      </div>
    )
  }
};
