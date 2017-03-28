import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import docImage from '../../images/dms.jpg';
import { signup } from '../../actions/userActions';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {},
      errors: {}
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    const inputField = event.target.name;
    const newUser = this.state.newUser;
    newUser[inputField] = event.target.value;
    this.setState({ newUser });
  }

  onClick(event) {
    event.preventDefault();
    this.props.signup(this.state.newUser).then(
      res => this.context.router.push('/dashboard'),
      err => toastr.error('An error occured')
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col s7">
          <img src={docImage} className="responsive-img" />
        </div>
        <div className="col s5">
          <form className="col s8">
            <h5 className="blue-text text-lighten-2 center">SIGN UP</h5>
            <div className="row">
              <div className="input-field col s12">
                <i className="fa fa-user prefix" aria-hidden="true" />
                <input
                  id="first_name"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  className="validate"
                  onChange={this.onChange} />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-user prefix" aria-hidden="true" />
                <input
                  id="last_name"
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  className="validate"
                  onChange={this.onChange} />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-envelope prefix" aria-hidden="true" />
                <input
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  className="validate"
                  onChange={this.onChange} />
                <label htmlFor="email" data-error="wrong" data-success="right" />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-key prefix" aria-hidden="true" />
                <input
                  id="password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="validate"
                  onChange={this.onChange} />
              </div>
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn" onClick={this.onClick}>SIGN UP</a>
              </div>
              <div className="input-field col s12">
                <h6 className="left small">Already have an account? <Link to="/">Sign In</Link></h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signup: React.PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { signup })(SignUpForm);
