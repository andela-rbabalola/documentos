/* eslint require-jsdoc:0 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import TextEditor from './TextEditor';
import Cards from './Cards';
import * as docActions from '../../actions/docActions';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(docActions.loadDocuments());
  }

  displayDocs(document, index) {
    return (
      <div className="col s4">
        <Cards document={document} />
      </div>
    );
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
        <div className="row">
          {this.props.documents.map(this.displayDocs)}
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  documents: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    documents: state.manageDocs.documents
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(docActions, dispatch)
//   };
// }

export default connect(mapStateToProps)(DashBoard);
