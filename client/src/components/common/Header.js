/* eslint require-jsdoc: "off" */
import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link, IndexLink, browserHistory } from 'react-router';
import { logout, searchDocuments } from '../../actions/userActions';


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {
      showTable: false,
      query: ''
    };
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.redirectToHomePage();
  }

  onClick(event) {
    event.preventDefault();
    if (this.state.query.length > 0) {
      this.setState({ showTable: !this.state.showTable });
    }
    // Dispatch an action to search
    this.props.searchDocuments(this.state.query);
  }

  onChange(event) {
    event.preventDefault();
    // set showTable back to false when user types in query
    this.setState({ showTable: false, query: event.target.value });
  }

  onClose(event) {
    event.preventDefault();
    this.setState({ showTable: false, query: '' });
  }

  redirectToHomePage() {
    browserHistory.push('/');
  }

  redirectToRoles() {
    browserHistory.push('/rolesPage');
  }

  render() {
    const auth = this.props.isAuthenticated;
    const isSuperAdmin = this.props.isSuperAdmin;

    const data = this.props.searchResults;
    // Column definitions for the react-table
    const columns = [{
      header: 'id',
      accessor: 'id'
    }, {
      header: 'Title',
      accessor: 'title',
    }, {
      header: 'Content',
      accessor: 'docContent'
    }, {
      header: 'access',
      accessor: 'access'
    }];

    const logoutLink = (
      <li><a href="#" onClick={this.logout}>Logout</a></li>
    );

    const rolesLink = (
      <li><a onClick={this.redirectToRoles}>Manage</a></li>
    );

    const searchLink = (
      <li>
        <a href="#search-modal">
          <i className="fa fa-search prefix" aria-hidden="true" />          &nbsp;Search
        </a>
        <div id="search-modal" className="modal view-user-modal">
          <div className="modal-content">
            <h5>Enter search query</h5>
            <input
              id="new-role"
              type="text"
              name="new-role"
              value={this.state.query}
              className="validate"
              onChange={this.onChange} />
            <a
              className="modal-action waves-effect waves-green btn-flat"
              onClick={this.onClick}>              Search</a>
            {this.state.showTable ? <ReactTable data={data} columns={columns} /> : null}
          </div>
          <div className="modal-footer">
            <a
              className="modal-action modal-close waves-effect waves-green center btn-flat"
              onClick={this.onClose}>              Close</a>
          </div>
        </div>
      </li>
    );

    return (
      <nav >
        <div className="nav-wrapper">
          <IndexLink to="/dashboard" className="brand-logo">Documentos</IndexLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/about"> About </Link></li>
            {auth ? searchLink : null}
            {isSuperAdmin ? rolesLink : null}
            {auth ? logoutLink : null}
          </ul>
        </div>
      </nav >
    );
  }
}

Header.propTypes = {
  logout: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isSuperAdmin: React.PropTypes.bool.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
  searchResults: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin,
    searchResults: state.users.searchResults
  };
}

export default connect(mapStateToProps, { logout, searchDocuments })(Header);
