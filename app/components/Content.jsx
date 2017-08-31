import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.el.style.display = (this.props.isVisible)
      ? 'block'
      : 'none';
  }
  render() {
    let torrents = [];
    if (this.props.torrents) {
      this.props.torrents.forEach((torrent, idx) => {
        if (torrent) {
          torrents.push(torrent);
        }
      });
    }

    return (
      <div>
        <div className="container-fluid main__content" style={{
          display: (this.props.isVisible)
            ? 'block'
            : 'none'
        }} ref={(el) => {
          this.el = el;
        }}>
          <div className="row">
            <div className="col-xs-9">
              <h3 className="page-header" ref={(el) => {
                this.pageTitle = el;
              }}>Torrents</h3>
              <List torrents={torrents}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
