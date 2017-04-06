import React, { PropTypes } from 'react';
import HeaderComponent from './common/Header';
import FlashMessagesList from '../components/flashMessages/flashMessagesList';



class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <FlashMessagesList />
        <div className="">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
