/* eslint require-jsdoc: "off"  */
import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import initialState from '../../reducers/initialState';


class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      docContent: '',
      access: '',
      select: ''
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
    this.setState({ select: event.target.value });
  }

  onClick(event) {
    event.preventDefault();
    console.log(this.state);
  }

  onChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div>
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
            <div className="input-field col s5">
              <select value={this.state.select} id="selectMe">
                <option value="">Choose an access type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Role">Role</option>
              </select>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
            <div className="text-editor" id="editor">
              <FroalaEditor
                tag="textarea"
                config={this.config}
                id="doc-content"
                model={this.state.docContent}
                onModelChange={this.handleModelChange} />
              <div>
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
              </div>
            </div>
            <a
              className="waves-effect waves-light btn"
              id="create-doc"
              onClick={this.onClick}>CREATE</a>
          </div>
        </div>
      </div>
    );
  }
}

export default TextEditor;
