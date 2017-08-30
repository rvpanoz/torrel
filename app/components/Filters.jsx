import React from 'react';
import ReactDOM from 'react-dom';

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.triggerFilter = this.triggerFilter.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
  }
  triggerFilter(e) {
    e.preventDefault();
    let filter_container = document.querySelector('.cd-filter');
    filter_container.classList.add('filter-is-visible');
  }
  closeFilter(e) {
    e.preventDefault();
    let filter_container = document.querySelector('.cd-filter');
    filter_container.classList.remove('filter-is-visible');
  }
  render() {
    return (
      <section className="content-filters">
        <div className="cd-filter">
          <form>
            <div className="cd-filter-block">
              <h4>Search</h4>
              <div className="cd-filter-content">
                <input type="search" placeholder="Try color-1..."/>
              </div>
            </div>
            <div className="cd-filter-block">
              <h4>Select</h4>
              <div className="cd-filter-content">
                <div className="cd-select cd-filters">
                  <select className="filter" name="selectThis" id="selectThis">
                    <option value="">Choose an option</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <a href="#0" onClick={this.closeFilter} className="cd-close">Close</a>
        </div>
        <a href="#0" onClick={this.triggerFilter} className="cd-filter-trigger">Filters</a>
      </section>
    )
  }
}
