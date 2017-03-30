import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import UserRoleModal from './UsersRoleModal';
import * as roleActions from '../../actions/rolesActions';

class RolesCard extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    // Dispatch action to get the current role
    this.props.dispatch(roleActions.getRole(this.props.id));
  }

  componentDidMount() {
    $('.modal').modal();
    // this.props.dispatch(roleActions.getRole(1));
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6 l4">
          <div className="card blue lighten-2">
            <div className="card-content white-text">
              <span className="card-title">{this.props.role.title}</span>
              <span>
                <a
                  id={this.props.id}
                  href="#view-modal"
                  className="white-text"
                  onClick={this.onClick}>
                  <i className="fa fa-eye" aria-hidden="true" /> View Users with this role</a>
              </span>
              <div>
                <UserRoleModal />
              </div>
            </div>
            <div className="card-action">
              <a href="#" className="white-text">
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit Role</a>
              <a href="#" className="white-text">
                <i className="fa fa-trash-o" aria-hidden="true" /> Delete Role</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RolesCard.propTypes = {
  id: PropTypes.number.isRequired,
  role: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentRole: state.roles.currentRole
  };
}

export default connect(mapStateToProps)(RolesCard);
