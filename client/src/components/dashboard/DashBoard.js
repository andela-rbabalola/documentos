/* eslint require-jsdoc:0 */
import React from 'react';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import TextEditor from './textEditor';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.setState({ showEditor: !this.state.showEditor });
  }
  render() {
    return (
      <div>
        <div className="fixed-action-btn horizontal">
          <a
            className="btn-floating btn-large red"
            onClick={this.onClick}
            href="#modal1">
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </a>
        </div>
        {this.state.showEditor ? <TextEditor /> : null}
      </div>
    );
  }
}

export default DashBoard;
