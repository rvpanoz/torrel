/**
 * App Component
 */

'use strict';

import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header.jsx';
import Content from './Content.jsx';

/**
 * [Mask description]
 * @param {[type]} props [description]
 */
const Mask = (props) => {
  let is_loading = props.isLoading;
  return (
    <div id="loader" className={(is_loading)
      ? 'show'
      : 'hide'}>
      <p>Loading torrents..</p>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  )
}

/**
 * [Layout description]
 * @param {[type]} props [description]
 */
const Layout = (props) => {
  return (
    <div className="split-pane">
      <div className="split-pane-header">
        {props.header}
      </div>
      <div className="split-pane-content">
        {props.content}
      </div>
    </div>
  );
}

/**
 *
 */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMask: false,
      torrents: []
    }
    this.handleQuery = this.handleQuery.bind(this);
  }
  handleQuery(query, cb) {
    this.setState({showMask: true});
    axios.get(`${config.baseUrl}/search?query=${query}\&category=${config.defaultCategory}`).then((resp) => {
        setTimeout(() => {
          this.setState((prevState, props) => ({
            showMask: false,
            torrents: resp.data.data
          }));
          if(cb && typeof cb === 'function') {
            cb();
          }
        }, 1500)
    });
  }
  render() {
    return (
      <div className="container">
        <Mask isLoading={this.state.showMask} ref={(el) => {
          this.mask = el;
        }}/>
        <Layout header={< Header handleQuery = {
          this.handleQuery
        } />} content= {<Content isVisible={!this.state.showMask
      } torrents = {
        this.state.torrents
      } />}/>
      </div>
    )
  }
};

ReactDOM.render(
  <App/>, document.getElementById('wrapper'))
