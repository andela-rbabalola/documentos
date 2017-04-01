// This modal show the users that have a particular role
import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import * as roleActions from '../../actions/rolesActions';

class UserRoleModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.modal').modal();
    // this.props.dispatch(roleActions.getRole(1));
  }

  render() {
    const data = this.props.currentRole.users;
    // Column definitions for the react-table
    const columns = [{
      header: 'id',
      accessor: 'id'
    }, {
      header: 'First Name',
      accessor: 'firstName',
    }, {
      header: 'Last Name',
      accessor: 'lastName'
    }, {
      header: 'Email',
      accessor: 'email'
    }];

    return (
      <div>
        <div id="view-modal" className="modal view-user-modal">
          <h4 className="center">Users with this Role</h4>
          <div className="modal-content">
            <ReactTable data={data} columns={columns} />
            <div className="modal-footer">
              <a
                className="waves-effect waves-light btn modal-action modal-close"
                id="view-users">CLOSE</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserRoleModal.propTypes = {
  currentRole: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentRole: state.roles.currentRole
  };
}

export default connect(mapStateToProps)(UserRoleModal);
