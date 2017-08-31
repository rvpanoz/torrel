import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
  }
  componentWillMount() {
    let title = this.props.title, peers = this.props.peers;
    let pattern = /1080|evo|yify|720|brrip|hdrip|dvdrip|xvid/i;
    this.setState({
      watchable: pattern.test(title) || peers < 1
    });
  }
  handleDownload(e) {
    e.preventDefault();
    let torrent = {};

    for (let prop in this.props) {
      if (prop !== 'key') {
        torrent[prop] = this.props[prop];
      }
    }

    axios.post(`${config.baseUrl}/download`, {
      data: {
        torrent: torrent
      },
      timeout: 5000,
    }).then((response) => {
      let data = response.data;
      let link = document.createElement('a');
      link.href = `${config.baseUrl}/${data.fileName}`;
      link.download = data.fileName;
      link.click();
    }).catch(err=>{
      throw new Error(err);
    });
  }
  render() {
    return (
      <tr role="row">
        <td>
          <p style={{
              color: (this.state.watchable) ? 'green' : 'red'
            }} ref={(el)=>{
              this.elTitle = el;
            }}>{this.props.title}</p>
        </td>
        <td>{this.props.peers}</td>
        <td>{this.props.seeds}</td>
        <td>{this.props.size}</td>
        <td>{this.props.time}</td>
        <td>
          <a href="#" onClick={this.handleDownload} className="btn btn-primary download">Dowload</a>
        </td>
      </tr>
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
    if (!this.props.torrents || this.props.torrents.length === 0) {
      return null;
    }

    return (
      <div>
        <div className="panel panel-default" style={{
          display: 'block'
        }}>
          <div className="panel-heading"></div>
          <div className="panel-body">
            <div className="table-responsive">
              <div className="row">
                <div className="col-xs-12">
                  <table className="table">
                    <thead>
                      <tr role="row">
                        <th>Title</th>
                        <th className="sorting">Peers</th>
                        <th className="sorting">Seeds</th>
                        <th className="sorting">Size</th>
                        <th className="sorting">{`Date`}</th>
                        <th></th>
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
      </div>
    )
  }
}
