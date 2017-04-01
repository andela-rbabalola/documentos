import React, { PropTypes } from 'react';
import Header from './common/Header';
import FlashMessagesList from '../components/flashMessages/flashMessagesList';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
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
