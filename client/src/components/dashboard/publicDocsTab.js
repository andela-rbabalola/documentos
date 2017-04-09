/* eslint require-jsdoc: "off"  */
/* eslint class-methods-use-this: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docActions';
import CardsComponent from './Cards';


class PublicDocsTab extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.docsActions.loadDocuments();
  }

  displayPublicDocs(document, index) {
    return (
      <div className="col s4" key={index}>
        <CardsComponent document={document} id={index} />
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        {this.props.publicDocs.map(this.displayPublicDocs)}
      </div>
    );
  }
}

PublicDocsTab.propTypes = {
  docsActions: PropTypes.object.isRequired,
  publicDocs: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    docsActions: bindActionCreators(docActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    publicDocs: state.documents.publicDocs,
    isAuthenticated: state.users.isAuthenticated
  };
}

// connect??
export default connect(mapStateToProps, mapDispatchToProps)(PublicDocsTab);
