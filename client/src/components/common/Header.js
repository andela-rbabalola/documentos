/* eslint class-methods-use-this: "off" */
import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link, IndexLink, browserHistory } from 'react-router';
import { logout, searchDocuments } from '../../actions/userActions';
import SearchLink from './SearchLink';

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
    const { isAuthenticated, isSuperAdmin } = this.props;

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

    return (
      <nav >
        <div className="nav-wrapper">
          <IndexLink to="/dashboard" className="brand-logo">Documentos</IndexLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/about"> About </Link></li>
            {isAuthenticated ? <SearchLink
              data={data}
              columns={columns}
              query={this.state.query}
              showTable={this.state.showTable}
              onChange={this.onChange}
              onClick={this.onClick}
              onClose={this.onClose} /> : null}
            {isSuperAdmin ? rolesLink : null}
            {isAuthenticated ? logoutLink : null}
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
  searchResults: React.PropTypes.array.isRequired
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
