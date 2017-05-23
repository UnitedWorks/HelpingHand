import React, { Component } from 'react';
import { Match, Link } from "react-router-dom";

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
        <iframe type="text/html" width={width} height={width*1.8} src={`https://www.youtube.com/embed/${this.props.quest.video_url}?controls=0&fs=0&loop=1&modestbranding=1&rel=0&color=white`} />
      </div>
    )
  }
};
