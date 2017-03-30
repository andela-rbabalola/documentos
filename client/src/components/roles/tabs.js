import React from 'react';
import { connect } from 'react-redux';
import ManageRoles from './manageRolesPage';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6"><a href="#roles">Roles</a></li>
              <li className="tab col s6"><a className="active" href="#users">Users</a></li>
            </ul>
          </div>
          <div id="roles" className="col s12">
            <ManageRoles />
          </div>
          <div id="users" className="col s12">Put user manager here</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allRoles: state.roles.allRoles
  };
}

export default connect(mapStateToProps)(Tabs);
