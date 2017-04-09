/* eslint require-jsdoc: "off"  */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import ManageRolesTab from './manageRolesTab';
import ManageUsersTabs from './manageUsersTab';
import * as rolesActions from '../../actions/rolesActions';

class ManagementTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'roles');
  }

  onClick(event) {
    event.preventDefault();
    this.props.dispatch(rolesActions.createRole(this.state)).then(() => {
      toastr.success('New role successfully created');
    }).catch(() => {
      toastr.error('An error occurred creating the role');
    });
  }

  onChange(event) {
    this.setState({ title: event.target.value });
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
          {/* Modal Start*/}
          <div id="roles" className="col s12">
            <div id="modal2" className="modal">
              <div className="modal-content">
                <h5>Enter new role name</h5>
                <input
                  id="new-role"
                  type="text"
                  name="new-role"
                  className="validate"
                  placeholder="New role"
                  onChange={this.onChange} />
              </div>
              <div className="modal-footer">
                <a
                  className="modal-action modal-close waves-effect waves-green btn-flat"
                  onClick={this.onClick}>Add role</a>
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

ManagementTabs.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(null)(ManagementTabs);
