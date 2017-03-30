import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as rolesActions from '../../actions/rolesActions';
import RolesCard from './rolesCards';


class ManageRolesTab extends React.Component {
  constructor(props) {
    super(props);
  }

  // this will be cards that will show all the roles
  displayRoles(role, index) {
    return (
      <div className="col s4" key={index}>
        {/* Create a roles card that will show all roles here*/}
        <RolesCard role={role} id={index} />
      </div>
    );
  }

  // dispatch get roles action when this component mounts
  componentDidMount() {
    if (this.props.isAuthenticated && this.props.isSuperAdmin) {
      this.props.dispatch(rolesActions.getRoles());
      toastr.success('Roles successfully fetched');
    }
  }

  render() {
    return (
      <div>
        <div className="fixed-action-btn horizontal">
          <a
            className="btn-floating btn-large red"
            onClick={this.createDoc}
            href="#createModal">
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </a>
        </div>
        <div className="row">
          <div className="row">
            {this.props.roles.map(this.displayRoles)}
          </div>
        </div>
      </div>
    );
  }
}

ManageRolesTab.propTypes = {
  roles: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    roles: state.roles.allRoles,
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin
  };
}

export default connect(mapStateToProps)(ManageRolesTab);
