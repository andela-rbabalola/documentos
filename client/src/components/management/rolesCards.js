import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

class RolesCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6 l4">
          <div className="card blue lighten-2">
            <div className="card-content white-text">
              <span className="card-title">{this.props.role.title}</span>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

RolesCard.propTypes = {
  role: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default RolesCard;
