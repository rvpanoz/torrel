import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';
import Filters from './Filters.jsx';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let torrents = [];
    let is_visible = this.props.isVisible;

    if (this.props.torrents) {
      this.props.torrents.forEach((torrent, idx) => {
        if (torrent) {
          torrents.push(torrent);
        }
      });
    }

    return (
      <div className="container-fluid main__content" style={{
        display: (!this.props.isVisible)
          ? 'none'
          : 'block'
      }} ref={(el) => {
        this.el = el;
      }}>
        <div className="row">
          <div className="col-xs-12">
            <h3 className="page-header"></h3>
            <List torrents={torrents}/>
          </div>
        </div>
        <Filters/>
      </div>
    )
  }
}
