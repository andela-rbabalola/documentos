/* eslint require-jsdoc: "off"  */
import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docActions';


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      docContent: '',
      access: '',
      model: Object.assign({}, props.currentDoc).docContent,
      userId: jwt.decode(localStorage.getItem('JWT')).UserId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('#selectMe-edit').on('change', this.handleChange);
    $('.modal').modal();
    $('#doc-content').froalaEditor('html.set', 'My custom paragraph.');
  }

  handleChange(event) {
    this.setState({ access: event.target.value });
  }

  // event handler to update the document
  onClick(event) {
    event.preventDefault();
    // this.props.dispatch(docActions.createDocument(this.state));
    // handle updating a document
    console.log('state', this.state);
  }

  onChange(event) {
    this.setState({ title: event.target.value });
  }

  handleModelChange(model) {
    this.setState({ docContent: model });
  }

  render() {
    return (
      <div>
        <div id="editModal" className="modal">
          <h4 className="center">Document</h4>
          <div className="row">
            <div className="col s6">
              <form className="col s6">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="text-edit"
                      type="text"
                      defaultValue={this.props.currentDoc.title}
                      name="title"
                      className="validate"
                      onChange={this.onChange} />
                    {this.props.currentDoc.title ? null : <label htmlFor="text" id="default-text">Title</label>}
                  </div>
                </div>
              </form>
            </div>
            <div className="col s6">
              <div className="input-field col s8">
                <select value={this.props.currentDoc.access} id="selectMe-edit">
                  <option value="">Choose an access type</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-content">
            <div className="text-editor" id="update-editor">
              <FroalaEditor
                tag="textarea"
                config={this.config}
                id="old-content"
                model={this.state.model}
                onModelChange={this.handleModelChange} />
            </div>
            <div className="modal-footer">
              <a
                className="waves-effect waves-light btn modal-action modal-close"
                id="edit-doc"
                onClick={this.onClick}>UPDATE</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  currentDoc: React.PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    currentDoc: state.documents.currentDoc
  };
}

export default connect(mapStateToProps)(Edit);