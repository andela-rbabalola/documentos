import React from 'react';
import SigninForm from '../signin/SignIn';
import Footer from '../common/Footer';


class HomePage extends React.Component {
  render() {
    return (
      <div>
        <SigninForm />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
