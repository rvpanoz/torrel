import config from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ProviderOption = (props) => {
  return (
    <option value={props.name}>{props.name}</option>
  )
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      providers: []
    }

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
  componentWillMount() {
    axios.get(`${config.baseUrl}/providers`)
    .then((resp) => {
      this.setState({
        providers: resp.data.data
      })
    })
  }
  componentDidMount() {
    if(this.textInput)
      this._focus();
  }
  render() {
    return (
      <form onSubmit={this.onSubmitEvent} className="navbar-form navbar-left hidden-xs" role="search">
        <div className="input-group">
          <input type="text" placeholder="Search for torrents..." className="form-control search-query" ref={(input) => {
            this.textInput = input;
          }}/>
          <div className="input-group-btn">
            <button ref={(button) => {
              this.buttonSubmit = button;
            }} type="submit" className="btn btn-link">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <select className="form-control">
          <option value="0">All providers</option>
          {this.state.providers.map((provider, idx) => <ProviderOption key={idx} {...provider}/>)}
        </select>
      </form>
    )
  }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbar_main">
            <a className="navbar-brand" href="#" style={{display: 'none'}}>
              {config.appName}
            </a>
            <SearchForm handleQuery={this.props.handleQuery}/>
          </div>
        </div>
      </nav>
    )
  }
}
