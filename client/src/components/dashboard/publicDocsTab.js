/* eslint require-jsdoc: "off"  */
/* eslint class-methods-use-this: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docActions';


class PublicDocsTab extends React.Component {

  componentDidMount() {
    this.props.docsActions.loadDocuments();
  }

  render() {
    return (
      <div className="row">
        Hello
      </div>
    );
  }
}

PublicDocsTab.propTypes = {
  docsActions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    docsActions: bindActionCreators(docActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated
  };
}

// connect??
export default connect(mapStateToProps, mapDispatchToProps)(PublicDocsTab);
