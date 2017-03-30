/* eslint require-jsdoc: "off"  */
import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { updateDocument } from '../../actions/docActions';


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: Object.assign({}, props.currentDoc).title,
      access: Object.assign({}, props.currentDoc).access,
      docContent: Object.assign({}, props.currentDoc).docContent,
      userId: jwt.decode(localStorage.getItem('JWT')).UserId,
      docId: props.currentDoc.id
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

  componentWillReceiveProps(nextProps) {
    if (this.props.currentDoc.id !== nextProps.currentDoc.id) {
      this.setState({
        title: Object.assign({}, nextProps.currentDoc).title,
        docContent: Object.assign({}, nextProps.currentDoc).docContent,
        access: Object.assign({}, nextProps.currentDoc).access,
        docId: nextProps.currentDoc.id
      });
    }
  }

  handleChange(event) {
    this.setState({ access: event.target.value });
  }

  // event handler to update the document
  onClick(event) {
    event.preventDefault();
    this.props
      .updateDocument(this.state)
      .then(() => {
        toastr.success('Document successfully updated');
      }).catch(() => {
        toastr.error('An error occured updating the document');
      });
  }

  onChange(event) {
    this.setState({ title: event.target.value });
  }

  handleModelChange(docContent) {
    this.setState({ docContent });
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
                      defaultValue={this.state.title}
                      name="title"
                      className="validate"
                      onChange={this.onChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="col s6">
              <div className="input-field col s8">
                <select value={this.state.access} id="selectMe-edit">
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
                model={this.state.docContent}
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
  currentDoc: React.PropTypes.object.isRequired,
  updateDocument: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    currentDoc: state.documents.currentDoc
  };
}

export default connect(mapStateToProps, { updateDocument })(Edit);
