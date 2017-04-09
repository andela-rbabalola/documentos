/* eslint require-jsdoc: "off"  */
/* eslint class-methods-use-this: "off" */
import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import TextEditorComponent from './textEditor';
import CardsComponent from './Cards';
import * as docActions from '../../actions/docActions';
import * as userActions from '../../actions/userActions';

/**
 * Class to create dashboard component
 */
export class DashBoard extends React.Component {
  componentDidMount() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
    $('.modal').modal({
      dismissible: true,
      complete() { alert('Closed'); }
    });
    this.props.docsActions.loadDocuments();
    this.props.usersActions.setUserInState(localStorage.getItem('JWT'));
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    console.log('hello mi amor');
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
        <CardsComponent document={document} id={index} />
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
      <div className="row">
        <div className="col s12">
          <div>
            <div className="fixed-action-btn horizontal">
              <a
                className="btn-floating btn-large red"
                href="#createModal"
                id="create-document"
                onClick={this.onClick}>
                <i className="fa fa-plus" aria-hidden="true" />
              </a>
            </div>
            {/* Render the TextEditor component only when a user is signed in*/}
            {this.props.isAuthenticated ? <TextEditorComponent /> : null}
          </div>
          {/* Tabs Start */}
          <ul className="tabs">
            <li className="tab col s4"><a href="#public">Public</a></li>
            <li className="tab col s4"><a href="#private">Private</a></li>
            <li className="tab col s4"><a href="#role">Role</a></li>
          </ul>
        </div>
        <div id="public" className="col s12">Public</div>
        <div id="private" className="col s12">Private</div>
        <div id="role" className="col s12">Role</div>
        {/* Tabs End */}
      </div>
    );
  }
}

DashBoard.propTypes = {
  documents: PropTypes.array.isRequired,
  docsActions: PropTypes.object.isRequired,
  usersActions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents.allDocuments,
    isAuthenticated: state.users.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    usersActions: bindActionCreators(userActions, dispatch),
    docsActions: bindActionCreators(docActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
