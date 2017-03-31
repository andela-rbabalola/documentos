import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import ReactTable from 'react-table';
import * as rolesActions from '../../actions/rolesActions';

class ManageUsersTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isAuthenticated && this.props.isSuperAdmin) {
      this.props.dispatch(rolesActions.getUsers()).then(() => {
        toastr.success('Users successfully fetched');
      }).catch(() => {
        toastr.error('An error occurred getting the users');
      });
    }
  }

  render() {
    const data = this.props.allUsers;
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
      <ReactTable data={data} columns={columns} />
    );
  }
}

ManageUsersTabs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  allUsers: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    allUsers: state.roles.allUsers,
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin
  };
}

export default connect(mapStateToProps)(ManageUsersTabs);
