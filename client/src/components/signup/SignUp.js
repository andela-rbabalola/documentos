import React from 'react';
import { Link } from 'react-router';
import docImage from '../../images/dms.jpg';

class SignUpForm extends React.Component {
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
                <i className="fa fa-user prefix" aria-hidden="true"></i>
                <input id="first_name" placeholder="First Name" type="text" className="validate" />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-user prefix" aria-hidden="true"></i>
                <input id="last_name" placeholder="Last Name" type="text" className="validate" />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-envelope prefix" aria-hidden="true"></i>
                <input id="email" placeholder="Email" type="email" className="validate" />
                <label htmlFor="email" data-error="wrong" data-success="right" />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-key prefix" aria-hidden="true"></i>
                <input id="password" placeholder="Password" type="password" className="validate" />
              </div>
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn">SIGN UP</a>
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

export default SignUpForm;
