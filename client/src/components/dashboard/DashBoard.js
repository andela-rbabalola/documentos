/* eslint require-jsdoc: "off"  */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import TextEditor from './textEditor';
import Cards from './Cards';
import * as docActions from '../../actions/docActions';
import * as userActions from '../../actions/userActions';

/**
 * Class to create dashboard component
 */
export class DashBoard extends React.Component {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Ensure user is authenticated before loading uer details
    if (this.props.isAuthenticated) {
      this.props.dispatch(docActions.loadDocuments());
      this.props.dispatch(userActions.setUserInState(localStorage.getItem('JWT')));
    }
  }

  /**
   *
   * @param {Object} document
   * @param {Number} index
   * @return {*} Rendered component
   */
  displayDocs(document, index) {
    return (
      <div className="col s4" key={index}>
        <Cards document={document} id={index} />
      </div>
    );
  }

  /**
   * Renders the Header component
   * @param {*} null
   * @returns {*} rendered JSX
   */
  render() {
    return (
      <div>
        <div className="fixed-action-btn horizontal">
          <a
            className="btn-floating btn-large red"
            onClick={this.createDoc}
            href="#createModal" id="create-document">
            <i className="fa fa-plus" aria-hidden="true" />
          </a>
        </div>
        {/* Render the TextEditor component only when a user is signed in*/}
        {this.props.isAuthenticated ? <TextEditor /> : null}
        <div className="row">
          {this.props.documents.map(this.displayDocs)}
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  documents: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents.allDocuments,
    isAuthenticated: state.users.isAuthenticated
  };
}

export default connect(mapStateToProps)(DashBoard);
