import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import TextEditor from './TextEditor';
import Edit from './Edit';
import * as docActions from '../../actions/docActions';

class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      docId: null
    };
    this.editDocument = this.editDocument.bind(this);
  }

  editDocument(event) {
    event.preventDefault();
    console.log('show editor ', this.state.showEditor);
    this.setState({ showEditor: !this.state.showEditor });
    this.props.dispatch(docActions.getDoc(this.props.id));
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-image">
              <span className="card-title">{this.props.document.title}</span>
              <div className="fixed-action-btn horizontal click-to-toggle show-docs">
                <a className="btn-floating btn-large red">
                  <i className="fa fa-bars" aria-hidden="true" />
                </a>
                <ul>
                  <li><a
                    href="#editModal"
                    id={this.props.id}
                    className="btn-floating blue"
                    onClick={this.editDocument}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true" /></a></li>
                  <li><a className="btn-floating red darken-1">
                    <i className="fa fa-trash-o" aria-hidden="true" /></a></li>
                </ul>
              </div>
            </div>
            <div className="card-content">
              <p>{this.props.document.docContent}</p>
            </div>
            {this.state.showEditor ? <Edit /> : null}
          </div>
        </div>
      </div>
    );
  }
}


Cards.propTypes = {
  document: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentDoc: state.currentDoc
  };
};

export default connect(mapStateToProps)(Cards);

