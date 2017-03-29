/* eslint require-jsdoc:0 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
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
    this.createDoc = this.createDoc.bind(this);
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

  createDoc(event) {
    event.preventDefault();
    // handle this
  }
  render() {
    return (
      <div>
        <div className="fixed-action-btn horizontal">
          <a
            className="btn-floating btn-large red"
            onClick={this.createDoc}
            href="#createModal">
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </a>
        </div>
        <TextEditor />
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

function mapStateToProps(state, ownProps) {
  console.log('state', state);
  return {
    documents: state.documents.allDocuments,
    isAuthenticated: state.users.isAuthenticated
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(docActions, dispatch)
//   };
// }

export default connect(mapStateToProps)(DashBoard);
