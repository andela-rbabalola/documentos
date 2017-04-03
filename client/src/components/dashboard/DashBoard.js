/* eslint require-jsdoc:0 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import TextEditor from './textEditor';
import Cards from './Cards';
import * as docActions from '../../actions/docActions';
import * as userActions from '../../actions/userActions';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  displayDocs(document, index) {
    return (
      <div className="col s4" key={index}>
        <Cards document={document} id={index} />
      </div>
    );
  }

  componentDidMount() {
    // Ensure user is authenticated before loading uer details
    if (this.props.isAuthenticated) {
      this.props.dispatch(docActions.loadDocuments());
      this.props.dispatch(userActions.setUserInState(localStorage.getItem('JWT')));
    }
  }

  render() {
    return (
      <div>
        <div className="fixed-action-btn horizontal">
          <a
            className="btn-floating btn-large red"
            onClick={this.createDoc}
            href="#createModal">
            <i className="fa fa-plus" aria-hidden="true" />
          </a>
        </div>
        {/* Render the TextEditor component only when a user is signed in*/}
        {localStorage.getItem('JWT') ? <TextEditor /> : null}
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
