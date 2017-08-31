/**
 * App Component
 */

'use strict';

import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AppLoader from './AppLoader.jsx';
import Header from './Header.jsx';
import Content from './Content.jsx';

//import css
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.css';
import themeCSS from '../assets/css/theme.css';
import appCSS from '../assets/css/app.css';

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
      <div className="split-pane-content wrapper alt">
        {props.content}
      </div>
    </div>
  );
}

/**
 * App component
 */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoader: false,
      torrents: []
    }
    this.handleQuery = this.handleQuery.bind(this);
  }
  handleQuery(query, cb) {
    this.setState({showLoader: true, torrents: []}); //clear
    axios.get(`${config.baseUrl}/search?query=${query}\&category=${config.defaultCategory}`).then((resp) => {
      setTimeout(() => {
        this.setState((prevState, props) => ({showLoader: false, torrents: resp.data.data}));
        if (cb && typeof cb === 'function') {
          cb();
        }
      }, 1500)
    });
  }
  render() {
    console.log(!!this.state.torrents.length);
    return (
      <div className="app_content__wrapper">
        <AppLoader isLoading={this.state.showLoader} />
        <Layout header={<Header handleQuery = {this.handleQuery} />} content= {<Content isVisible={!!this.state.torrents.length} torrents = {this.state.torrents} />} />
      </div>
    )
  }
};

ReactDOM.render(
  <App/>, document.getElementById('app_content'));
