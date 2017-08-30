import React from 'react';
import ReactDOM from 'react-dom';

export default class ActionBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('actionbar render');
    let is_visible = this.props.isVisible;

    return (
      <div></div>
    )
  }
}
