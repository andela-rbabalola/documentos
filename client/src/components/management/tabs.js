import React from 'react';
import ManageRolesTab from './manageRolesTab';

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
              <li className="tab col s6"><a className="active" href="#users">Users</a></li>
            </ul>
          </div>
          <div id="roles" className="col s12">
            <ManageRolesTab />
          </div>
          <div id="users" className="col s12">Put user manager here</div>
        </div>
      </div>
    );
  }
}

export default ManagementTabs;
