import React from 'react';
import ManageRolesTab from './manageRolesTab';
import ManageUsersTabs from './manageUsersTab';

class ManagementTabs extends React.Component {
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
              <li className="tab col s6"><a href="#users">Users</a></li>
            </ul>
          </div>
          <div id="roles" className="col s12">
            <ManageRolesTab />
          </div>
          <div id="users" className="col s12">
            <ManageUsersTabs />
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementTabs;
