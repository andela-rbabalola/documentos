/* eslint class-methods-use-this: "off" */
import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link, IndexLink, browserHistory } from 'react-router';
import { logout, searchDocuments } from '../../actions/userActions';

/**
 * Class to create UserInput Component
 */
export class Header extends React.Component {
  /**
   *
   * @param {Object} props
   */
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

  /**
   *
   * @param {*} event
   * @returns {*} click action
   */
  onClick(event) {
    event.preventDefault();
    if (this.state.query.length > 0) {
      this.setState({ showTable: !this.state.showTable });
    }
    // Dispatch an action to search
    this.props.searchDocuments(this.state.query);
  }

  /**
   *
   * @param {*} event
   * @returns {*} action
   */
  onChange(event) {
    event.preventDefault();
    // set showTable back to false when user types in query
    this.setState({ showTable: false, query: event.target.value });
  }

  /**
   *
   * @param {*} event
   * @returns {*} click action
   */
  onClose(event) {
    event.preventDefault();
    this.setState({ showTable: false, query: '' });
  }

  /**
   *
   * @param {*} event
   * @returns {*} click action
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.redirectToHomePage();
  }

  /**
   * Redirects to the home page
   * @returns {*} redirect
   */
  redirectToHomePage() {
    browserHistory.push('/');
  }

  /**
   * Redirects to the roles page
   * @returns {*} redirect
   */
  redirectToRoles() {
    browserHistory.push('/rolesPage');
  }

  /**
   * Renders the Header component
   * @param {*} null
   * @returns {*} rendered JSX
   */
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
      accessor: 'docContent',
      width: 400
    }, {
      header: 'access',
      accessor: 'access'
    }];

    const logoutLink = (
      <li><a className="logout" href="#" onClick={this.logout}>Logout</a></li>
    );

    const rolesLink = (
      <li><a className="manage" onClick={this.redirectToRoles}>Manage</a></li>
    );

    const searchLink = (
      // search icon on the nav bar
      <li id="searchlink">
        <a href="#search-modal" className="search">
          <i className="fa fa-search prefix" aria-hidden="true" />          &nbsp;Search
        </a>
        {/* Modal Start */}
        <div id="search-modal" className="modal view-user-modal">
          <div className="modal-content">
            <h5>Enter search query</h5>
            <input
              id="search-query"
              type="text"
              name="new-role"
              value={this.state.query}
              className="validate"
              onChange={this.onChange} />
            <a
              className="modal-action waves-effect waves-green btn-flat"
              onClick={this.onClick} id="search-button">              Search</a>
            {this.state.showTable ? <ReactTable
              data={data}
              columns={columns} id="results" /> : null}
          </div>
          <div className="modal-footer">
            <a
              className="modal-action modal-close waves-effect waves-green center btn-flat"
              onClick={this.onClose}>              Close</a>
          </div>
        </div>
        {/* Modal end */}
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

/**
 *
 * @param {*} state
 * @returns {*} mappedState
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin,
    searchResults: state.users.searchResults
  };
}

export default connect(mapStateToProps, { logout, searchDocuments })(Header);
