import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';

import Torrents from '../torrents';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let torrents = new Torrents(10);
    let is_visible = this.props.isVisible;

    if (this.props.torrents) {
      this.props.torrents.forEach((torrent, idx) => {
        if (torrent) {
          torrents.push(torrent);
        }
      });
    }

    return (
      <div className="wrap" ref={(el) => {
        this.el = el;
      }}>
        <section className="list" style={{
          display: (!is_visible)
            ? 'none'
            : 'block'
        }}>
          <List torrents={torrents}/>
        </section>
      </div>
    )
  }
}
