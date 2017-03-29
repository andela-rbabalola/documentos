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

  render() {
    return (
      <nav >
        <div className="nav-wrapper">
          <IndexLink to="/" className="brand-logo">Documentos</IndexLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/about">About</Link></li>
            <li><a href="#" onClick={this.logout}>Logout</a></li>
          </ul>
        </div>
      </nav >
    );
  }
}

Header.propTypes = {
  logout: React.PropTypes.func.isRequired
};

// export default Header;
export default connect(null, { logout })(Header);
