import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tabs from './tabs';

class RolesPage extends React.Component {
  constructor(props) {
    super(props);
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

