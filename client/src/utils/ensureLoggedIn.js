import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

export default function (Component) {
  /**
   * Authenticated Component class
   */
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        toastr.error('You need to sign in');
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  AuthenticatedComponent.propTypes = {
    authenticated: React.PropTypes.bool.isRequired
  };

  AuthenticatedComponent.contextTypes = {
    router: PropTypes.object
  };

  /**
  * @param {any} state
  * @returns {boolean}
  */
  function mapStateToProps(state) {
    console.log('state auth comp', state);
    return { authenticated: state.users.isAuthenticated };
  }

  return connect(mapStateToProps)(AuthenticatedComponent);
}
