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
        <div className="col s12 m6">
          <div className="card blue lighten-2 doc-card">
            <div className="card-content white-text">
              <span className="card-title">{this.props.document.title}</span>
            </div>
            <div className="card-action">
              <a
                href="#editModal"
                id={this.props.id}
                className="white-text left"
                onClick={this.editDocument}>
                <i className="fa fa-pencil-square-o" aria-hidden="true" />                Edit</a>
              {this.state.showEditor ? <Edit /> : null}
              <a
                onClick={this.deleteDocument}
                className="white-text right">
                <i className="fa fa-trash-o" aria-hidden="true" />                Delete</a>
            </div>
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

const mapStateToProps = (state, ownProps) => ({
  currentDoc: state.documents.currentDoc
});

export default connect(mapStateToProps)(Cards);

