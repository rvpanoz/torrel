import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query || ''
    }
    this._focus = this._focus.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onChangeProvider = this.onChangeProvider.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
  }
  _focus() {
    this.textInput.focus();
  }
  _setValue(value) {
    this.textInput.value = value;
  }
  onChangeProvider(e) {
    this.setState({provider: e.target.value});
  }
  onChangeQuery(e) {
    this.setState({query: e.target.value});
  }
  onSubmitEvent(e) {
    e.preventDefault();
    let query = this.state.query;
    if (query.length) {
      this.props.handleQuery(query);
    }
    return false;
  }
  componentDidMount() {
    this.setState({
      query: 'batman'
    });
    this._focus();
  }
  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.onSubmitEvent}>
          <input value={this.state.query} type="text" placeholder="Search for torrents..." className="search-query" ref={(input) => {
            this.textInput = input;
          }} onChange={this.onChangeQuery}/>
        </form>
      </div>
    )
  }
}

const Logo = (props) => {
  return (
    <div className="title-bar">
      <a href="#">
        <span className="nav-main-title">
          {config.appName}
        </span>
      </a>
    </div>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav-main">
        <div className="wrap">
          <Logo/>
          <SearchBar handleQuery={this.props.handleQuery}/>
        </div>
      </div>
    );
  }
}
