import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
  }
  handleDownload(e) {
    e.preventDefault();
    let torrent = {};

    for (let prop in this.props) {
      if (prop !== 'key') {
        torrent[prop] = this.props[prop];
      }
    }

    axios.get(`${config.baseUrl}/download`, {
      params: {
        torrent: torrent,
        responseType: 'arraybuffer'
      }
    }).then((response) => {
      //TODO
      console.log(response);
    });
  }
  render() {
    return (
      <li className="list-item">
        <div className="top">
          <span className="title long-text">{this.props.title}</span>
          <span className="provider">{this.props.provider}</span>
        </div>
        <div className="bottom">
          <div className="meta-info-left">
            <span className="size">
              <i className="fa fa-list"></i>&nbsp;{this.props.size}</span>
            <span className="time">
              <i className="fa fa-calendar"></i>&nbsp;{this.props.time}</span>
          </div>
          <div className="meta-info-right">
            <span className="seeds">
              <i className="fa fa-user"></i>&nbsp;Seeds&nbsp;{this.props.seeds}</span>
            <span className="peers">
              <i className="fa fa-user"></i>&nbsp;Peers&nbsp;{this.props.peers}</span>
            <span className="download">
              <a className="download" onClick={this.handleDownload} href="#">
                <i className="fa fa-download"></i>&nbsp;Download
              </a>
            </span>
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
