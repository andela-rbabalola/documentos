import React from 'react';
import { Link } from 'react-router';
import docImage from '../../images/dms.jpg';


const SignUpForm = ({ onChange, onClick }) => {
  return (
    <div className="row">
      <div className="col s7">
        <img src={docImage} className="responsive-img" alt="document image" />
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
                onChange={onChange} />
            </div>
            <div className="input-field col s12">
              <i className="fa fa-user prefix" aria-hidden="true" />
              <input
                id="last_name"
                placeholder="Last Name"
                name="lastName"
                type="text"
                className="validate"
                onChange={onChange} />
            </div>
            <div className="input-field col s12">
              <i className="fa fa-envelope prefix" aria-hidden="true" />
              <input
                id="email"
                placeholder="Email"
                name="email"
                type="email"
                className="validate"
                onChange={onChange} />
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
                onChange={onChange} />
            </div>
            <div className="input-field col s12">
              <a className="waves-effect waves-light btn" onClick={onClick}>SIGN UP</a>
            </div>
            <div className="input-field col s12">
              <h6 className="left small">Already have an account? <Link to="/">Sign In</Link></h6>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default SignUpForm;
