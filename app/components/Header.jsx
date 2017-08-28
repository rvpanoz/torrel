import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query || ''
    }
    this.focus = this.focus.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onChangeProvider = this.onChangeProvider.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
  }
  focus() {
    this.textInput.focus();
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
    // this.props.handleQuery('batman');
    this.focus();
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
          Reactor
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
