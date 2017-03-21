import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <form className="col s4 offset-s7 api-form">
            <h5 className="blue-text text-lighten-2 center">SIGN IN</h5>
            <div className="row">
              <div className="input-field col s12">
                <input id="first_name" placeholder="First Name" type="text" className="validate" />
              </div>
              <div className="input-field col s12">
                <input id="last_name" placeholder="Last Name" type="text" className="validate" />
              </div>
              <div className="input-field col s12">
                <input id="password" placeholder="Password" type="password" className="validate" />
              </div>
              <div className="input-field col s12">
                <input id="email" placeholder="Email" type="email" className="validate" />
                <label htmlFor="email" data-error="wrong" data-success="right" />
              </div>
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn">Submit</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default HomePage;
