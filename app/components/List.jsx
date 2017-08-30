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
      <tr role="row">
        <td><p>{this.props.title}</p></td>
        <td>{this.props.peers}</td>
        <td>{this.props.seeds}</td>
        <td>{this.props.size}</td>
        <td>{this.props.time}</td>
      </tr>
    )
  }
}

class Filters extends React.Component {
  render() {
    return (
      <div className="filters"></div>
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
    console.log('list render')
    if (!this.props.torrents) {
      return null;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Torrents</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive">
            <div className="row">
              <div className="col-xs=12">
                <Filters/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs=12">
                <table className="table">
                  <thead>
                    <tr role="row">
                      <th>Title</th>
                      <th className="sorting">Peers</th>
                      <th className="sorting">Seeds</th>
                      <th className="sorting">Size</th>
                      <th className="sorting">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.torrents.map((torrent, idx) => <ListItem key={idx} {...torrent}/>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
