import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as rolesActions from '../../actions/rolesActions';
import Tabs from './tabs';

class RolesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  displayRoles(role, index) {
    return (
      <div className="col s4" key={index}>
        <div id={index}>{role.title}</div>
      </div>
    );
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    if (this.props.isAuthenticated && this.props.isSuperAdmin) {
      this.props.dispatch(rolesActions.getRoles());
    }
  }

  render() {
    return (
      <div>
        <Tabs />
      </div>
    );
  }
}

RolesPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin,
    roles: state.roles.allRoles
  };
}

export default connect(mapStateToProps)(RolesPage);

