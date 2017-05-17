import React, { Component } from 'react';
import { Match, Link } from "react-router-dom";

export default class QuestTile extends Component {
  render() {

    const widths = [400, 320, 240];
    const width = widths[Math.floor(Math.random() * widths.length)];
    return (
      <div className={"quest-tile".concat(` width-${width}`)}>
        <iframe id="ytplayer" type="text/html" width={width} height={width*1.8} src={`https://www.youtube.com/embed/${this.props.quest.video_url}?controls=0&fs=0&loop=1&modestbranding=1&rel=0&color=white`} />
        <Link to={`${this.props.match.path}${this.props.quest.id}`}>
          <u>Giving:</u> {Array.prototype.map.call(this.props.quest.goals, (quest, index) => {
            return (<b>{index + 1}) {quest.reward}<br/></b>);
          })}
        </Link>
      </div>
    )
  }
};
