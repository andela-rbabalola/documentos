/* eslint require-jsdoc: "off"  */
import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import toastr from 'toastr';
// import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docActions';


class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      docContent: '',
      access: '',
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
    $('.modal').modal();
  }

  handleModelChange(docContent) {
    this.setState({ docContent });
  }

  handleChange(event, index, value) {
    this.setState({ access: event.target.value });
  }

  onClick(event) {
    event.preventDefault();
    console.log('state', this.state);
    this.props.dispatch(docActions.createDocument(this.state));
    toastr.success('Document created');
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div>
        <div id="createModal" className="modal">
          <h4 className="center">Document</h4>
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
                  <option value="">Choose an access type</option>
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
  dispatch: React.PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(docActions, dispatch)
//   };
// }

export default connect(mapStateToProps)(TextEditor);
