import React from 'react';

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

export default Mask;
