import React from 'react';
import ManageRolesTab from './manageRolesTab';
import ManageUsersTabs from './manageUsersTab';

class ManagementTabs extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'roles');
  }

  onClick(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {console.log('props tabs', this.props)}
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6"><a href="#roles">Roles</a></li>
              <li className="tab col s6"><a href="#users">Users</a></li>
            </ul>
          </div>
          {/* Modal Start*/}
          <div id="roles" className="col s12">
            <div id="modal2" className="modal">
              <div className="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
              </div>
              <div className="modal-footer">
                <a
                  className="modal-action modal-close waves-effect waves-green btn-flat"
                  onClick={this.onClick}>Agree</a>
              </div>
            </div>
            {/* Modal End */}
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
