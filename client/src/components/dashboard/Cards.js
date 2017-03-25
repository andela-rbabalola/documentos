import React, { PropTypes } from 'react';
import TextEditor from './TextEditor';

class Cards extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-image">
              <span className="card-title">{this.props.document.title}</span>
              <div className="fixed-action-btn horizontal click-to-toggle show-docs">
                <a className="btn-floating btn-large red">
                  <i className="fa fa-bars" aria-hidden="true" />
                </a>
                <ul>
                  <li><a
                    href="#modal1"
                    className="btn-floating blue">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" /></a></li>
                  <li><a className="btn-floating red darken-1">
                    <i className="fa fa-trash-o" aria-hidden="true" /></a></li>
                </ul>
              </div>
            </div>
            <div className="card-content">
              <p>{this.props.document.docContent}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cards.propTypes = {
  document: PropTypes.array.isRequired
};

export default Cards;
