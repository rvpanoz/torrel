import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let torrents = [
      // {
      //   desc: "http://www.1337x.to/torrent/2239931/The-LEGO-Batman-Movie-2017-720p-YTS-YIFY/",
      //   peers: 1610,
      //   provider: "1337x",
      //   seeds: 4594,
      //   size: "764.5 MB",
      //   time: "Jun. 1st '17",
      //   title: "The LEGO Batman Movie (2017) [720p] [YTS] [YIFY]"
      // },
      // {
      //   desc: "http://www.1337x.to/torrent/2239931/The-LEGO-Batman-Movie-2017-720p-YTS-YIFY/",
      //   peers: 1610,
      //   provider: "1337x",
      //   seeds: 4594,
      //   size: "764.5 MB",
      //   time: "Jun. 1st '17",
      //   title: "The LEGO Batman Movie (2017) [720p] [YTS] [YIFY]"
      // }
    ];
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
