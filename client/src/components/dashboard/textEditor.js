/* eslint require-jsdoc: "off"  */
import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as docActions from '../../actions/docActions';


export class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      docContent: '',
      access: 'public',
      userId: jwt.decode(localStorage.getItem('JWT')).UserId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('#selectMe').on('change', this.handleChange);
    $('.modal').modal({
      dismissible: false
    });
  }

  handleModelChange(docContent) {
    this.setState({ docContent });
  }

  handleChange(event) {
    this.setState({ access: event.target.value });
  }

  onClick(event) {
    event.preventDefault();
    // validate first
    if (this.state.title === '') {
      toastr.error('Please enter the required fields');
    } else {
      this.props.docsActions
        .createDocument(this.state)
        .then(() => {
          toastr.success('Document created');
        }).catch(() => {
          toastr.error('An error occured creating the document');
        });
    }
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div>
        <div id="createModal" className="modal">
          <h4 className="center">Create Document</h4>
          <div className="row">
            <div className="col s6">
              <form className="col s6">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="text"
                      type="text"
                      name="title"
                      className="validate"
                      onChange={this.onChange} />
                    <label htmlFor="text" id="text">Title</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col s6">
              <div className="input-field col s8">
                <select value={this.state.select} id="selectMe">
                  <option value="">Access</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-content">
            <div className="text-editor" id="editor">
              <FroalaEditor
                tag="textarea"
                config={this.config}
                id="doc-content"
                model={this.state.docContent}
                onModelChange={this.handleModelChange} />
            </div>
            <div className="modal-footer">
              <a
                className="waves-effect waves-light btn modal-action modal-close"
                id="create-doc"
                onClick={this.onClick}>SUBMIT</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  createDocument: React.PropTypes.func.isRequired,
  docsActions: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    currentUser: state.users.userInfo || state.users.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    docsActions: bindActionCreators(docActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
