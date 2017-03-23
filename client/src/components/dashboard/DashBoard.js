/* eslint require-jsdoc:0 */
import React from 'react';

class DashBoard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue lighten-3">
            <div className="card-content white-text">
              <span className="card-title">Doc 1</span>
              <p>This is your first document</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
