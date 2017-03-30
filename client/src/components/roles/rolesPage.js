import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as rolesActions from '../../actions/rolesActions';

class RolesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  displayRoles(role, index) {
    return (
      <div className="col s4" key={index}>
        <div id={index}>{role}</div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.isAuthenticated && this.props.isSuperAdmin) {
      this.props.dispatch(rolesActions.getRoles());
    }
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

RolesPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log('state rolespage', state);
  return {
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin
  };
}

export default connect(mapStateToProps)(RolesPage);

