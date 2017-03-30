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
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.redirectToHomePage();
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

    return (
      <nav >
        <div className="nav-wrapper">
          <IndexLink to="/" className="brand-logo">Documentos</IndexLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/about">About</Link></li>
            {auth ? logoutLink : null}
            {isSuperAdmin ? rolesLink : null}
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
