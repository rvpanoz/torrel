import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';
import ActionBar from './ActionBar.jsx';
import Torrents from '../torrents';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('content render');
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
      <div className="wrap" style={{
        display: (!is_visible)
          ? 'none'
          : 'flex'
      }} ref={(el) => {
        this.el = el;
      }}>
        <section className="list">
          <List torrents={torrents}/>
        </section>
        <section className="action-bar">
          <ActionBar />
        </section>
      </div>
    )
  }
}
