/* eslint require-jsdoc: "off" */
import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import docImage from '../../images/dms.jpg';
import * as userActions from '../../actions/userActions';
import SignUpForm from './SignUpForm';

/**
 * Class to create Signup component
 */
export class SignUp extends React.Component {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newUser: {},
      errors: {}
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   *
   * @param {*} event
   * @returns {*} action
   */
  handleChange(event) {
    event.preventDefault();
    const inputField = event.target.name;
    const newUser = this.state.newUser;
    newUser[inputField] = event.target.value;
    this.setState({ newUser });
  }

  /**
   *
   * @param {*} event
   * @returns {*} click action
   */
  handleClick(event) {
    // event.preventDefault();
    this.props.signup(this.state.newUser)
      .then(
      res => this.context.router.push('/dashboard'),
      err => toastr.error('An error occured')
      );
  }

  /**
   * Renders the UserInput component
   * @param {*} null
   * @returns {*} rendered JSX
   */
  render() {
    return (
      <SignUpForm
        onChange={this.handleChange}
        onClick={this.handleClick} />
    );
  }
}

SignUp.propTypes = {
  signup: React.PropTypes.func.isRequired
};

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(null, userActions)(SignUp);
