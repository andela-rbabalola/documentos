import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Edit from './Edit';
import * as docActions from '../../actions/docActions';

class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
    };
    this.editDocument = this.editDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  editDocument(event) {
    event.preventDefault();
    this.setState({ showEditor: !this.state.showEditor });
    this.props.dispatch(docActions.getDoc(this.props.id));
  }

  deleteDocument(event) {
    event.preventDefault();
    this.props.dispatch(docActions
      .deleteDocument(this.props.document.id)).then(() => {
        toastr.success('Document successfully deleted');
      }).catch(() => {
        toastr.error('Unable to delete');
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6 l4">
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
                  <li><a
                    onClick={this.deleteDocument}
                    className="btn-floating red darken-1">
                    <i className="fa fa-trash-o" aria-hidden="true" /></a></li>
                </ul>
              </div>
            </div>
            <div className="card-content">
              <span className="card-title grey-text text-darken-4">{this.props.document.title}</span>
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
    currentDoc: state.documents.currentDoc
  };
};

export default connect(mapStateToProps)(Cards);

