/* eslint require-jsdoc: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { browserHistory } from 'react-router';
import { logout } from '../../actions/userActions';


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      foo: false
    };
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.redirectToHomePage();
  }

  onClick(event) {
    event.preventDefault();
    this.setState({ foo: true });
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

    const logoutLink = (
      <li><a href="#" onClick={this.logout}>Logout</a></li>
    );

    const rolesLink = (
      <li><a onClick={this.redirectToRoles}>Manage</a></li>
    );

    const searchLink = (
      <li>
        <a href="#search-modal">
          <i className="fa fa-search prefix" aria-hidden="true" /> &nbsp;Search
        </a>
        <div id="search-modal" className="modal view-user-modal">
          <div className="modal-content">
            <h5>Enter search query</h5>
            <input
              id="new-role"
              type="text"
              name="new-role"
              className="validate"
              onChange="" />
            <a
              className="modal-action waves-effect waves-green btn-flat"
              onClick={this.onClick}> Search</a>
            {this.state.foo ? <div>Hello there</div> : null}
          </div>
          <div className="modal-footer">
            <a
              className="modal-action modal-close waves-effect waves-green btn-flat"
              onClick=""> Close</a>
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
  isSuperAdmin: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isSuperAdmin: state.users.isSuperAdmin
  };
}

// export default Header;
export default connect(mapStateToProps, { logout })(Header);
