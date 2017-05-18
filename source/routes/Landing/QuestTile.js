import React, { Component } from 'react';
import { Match, Link } from "react-router-dom";

export default class QuestTile extends Component {
  render() {

    const widths = [400, 350, 300];
    const width = widths[Math.floor(Math.random() * widths.length)];
    return (
      <div className={"quest-tile".concat(` width-${width}`)}>
        <iframe type="text/html" width={width} height={width*1.8} src={`https://www.youtube.com/embed/${this.props.quest.video_url}?controls=0&fs=0&loop=1&modestbranding=1&rel=0&color=white`} />
        <Link className="quest-tile__footer" to={`${this.props.match.path}${this.props.quest.id}`}>
          <span className="giving">Giving</span>
          {Array.prototype.map.call(this.props.quest.goals, (quest, index) => {
            return (<span className="reward" key={index}> {index != 0 ? ' + ' : ''}<br/>{quest.giving}</span>);
          })}
          <br/>
          →
        </Link>
      </div>
    )
  }
};
