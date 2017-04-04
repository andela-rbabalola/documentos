/* eslint require-jsdoc: "off" */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import docImage from '../../images/dms.jpg';
import { login } from '../../actions/userActions';

class SigninForm extends React.Component {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      errors: {}
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * @param {*} event
   * @returns {*} click action
   */
  onClick(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state.user).then(
        res => this.context.router.push('/dashboard'),
        err => toastr.error('Incorrect login details')
      );
    }
  }

  /**
   *
   * @param {*} event
   * @returns {*} action
   */
  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }

  /**
   *
   * @param {*} null
   * @returns {Boolean} Boolean validating the form
   */
  isValid() {
    let formIsValid = true;
    const errors = {};
    if (!this.state.user.email || !this.state.user.password) {
      errors.error = 'Please fill the required fields';
      formIsValid = false;
    }
    this.setState({ errors });
    return formIsValid;
  }

  /**
   * Renders the UserInput component
   * @param {*} null
   * @returns {*} rendered JSX
   */
  render() {
    return (
      <div className="row">
        <div className="col s7">
          <img src={docImage} className="responsive-img" alt="document manager" />
        </div>
        <div className="col s5">
          <form className="col s8">
            <h5 className="blue-text text-lighten-2 center">SIGN IN</h5>
            <div className="row">
              <div className="input-field col s12">
                <i className="fa fa-envelope prefix" aria-hidden="true" />
                <input
                  id="email"
                  placeholder="Email"
                  type="email"
                  className="validate"
                  name="email"
                  onChange={this.onChange} />
                <label htmlFor="email" data-error="wrong" data-success="right" />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-key prefix" aria-hidden="true" />
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  className="validate"
                  name="password"
                  onChange={this.onChange} />
              </div>
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn" onClick={this.onClick}>SIGN IN</a>
              </div>
              <div className="input-field col s12">
                <h6 className="left small">Do not have an account yet?
                  <Link to="/signup"> Sign up</Link></h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SigninForm.propTypes = {
  login: React.PropTypes.func.isRequired
};

SigninForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { login })(SigninForm);
