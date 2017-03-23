/* eslint require-jsdoc: "off" */
import React from 'react';
import { Link } from 'react-router';
import docImage from '../../images/dms.jpg';

class SigninForm extends React.Component {
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
                <input id="email" placeholder="Email" type="email" className="validate" />
                <label htmlFor="email" data-error="wrong" data-success="right" />
              </div>
              <div className="input-field col s12">
                <i className="fa fa-key prefix" aria-hidden="true" />
                <input id="password" placeholder="Password" type="password" className="validate" />
              </div>
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn" href="/dashboard">SIGN IN</a>
              </div>
              <div className="input-field col s12">
                <h6 className="left small">Do not have an account yet? <Link to="/signup">Sign up</Link></h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SigninForm;
