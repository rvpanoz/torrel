import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import LogoImage from '../assets/css/images/torrel.png';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this._focus = this._focus.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
    this._setEnabled = this._setEnabled.bind(this);
  }
  _focus() {
    this.textInput.focus();
  }
  _setValue(value) {
    this.textInput.value = value;
  }
  _setDisabled() {
    this.buttonSubmit.disabled = true;
    this.textInput.disabled = true;
  }
  _setEnabled() {
    this.buttonSubmit.disabled = false;
    this.textInput.disabled = false;
  }
  onChangeQuery(e) {
    this.setState({query: e.target.value});
  }
  onSubmitEvent(e) {
    e.preventDefault();
    this._setDisabled();

    let query = this.textInput.value;
    if (query.length) {
      this.props.handleQuery(query, this._setEnabled);
    }
    return false;
  }
  componentDidMount() {
    this._focus();
  }
  render() {
    console.log('header render');
    return (
      <div className="search-bar">
        <form onSubmit={this.onSubmitEvent}>
          <input type="text" placeholder="Search for torrents..." className="search-query" ref={(input) => {
            this.textInput = input;
          }} />
        <button ref={(button) => {
            this.buttonSubmit = button;
          }} type="submit">Search</button>
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
          <SearchBar handleQuery={this.props.handleQuery}/>
        </div>
      </div>
    );
  }
}
