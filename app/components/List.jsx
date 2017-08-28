import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="list-item">
        <div className="top">
          <span className="title">{this.props.title}</span>
        </div>
        <div className="bottom">
          <div className="meta-info">
            <div className="meta-info-left">
              <span className="size">{this.props.size}</span>
              <span className="time">{this.props.time}</span>
            </div>
            <div className="meta-info-right">
              <span className="peers">Peers&nbsp;{this.props.peers}</span>
              <span className="seeds">Seeds&nbsp;{this.props.seeds}</span>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    }
  }
  render() {
    if (!this.props.torrents) {
      return null;
    }

    return (
      <div className="torrents">
        <ul className="list">
          {this.props.torrents.map((torrent, idx) => <ListItem key={idx} {...torrent}/>)}
        </ul>
      </div>
    )
  }
}
