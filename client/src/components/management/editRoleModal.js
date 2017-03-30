import React from 'react';
import { connect } from 'react-redux';
import * as roleActions from '../../actions/rolesActions';

class EditRoleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: Object.assign({}, props.currentRole).title,
    };

    this.editRole = this.editRole.bind(this);
  }

  editRole(event) {
    event.preventDefault();
    // Dispatch an action to edit a role
  }

  render() {
    return (
      <div id="edit-modal" className="modal">
        <div className="modal-content">
          <h5>Edit this role</h5>
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" />
            <label htmlFor="first_name">Role title</label>
          </div>
        </div>
        <div className="modal-footer">
          <a
            className="waves-effect waves-light btn modal-action modal-close"
            id="edit-role"
            onClick={this.editRole}>UPDATE</a>
        </div>
      </div>
    );
  }
}

EditRoleModal.propTypes = {
  currentRole: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentRole: state.roles.currentRole
  };
}

export default connect(mapStateToProps)(EditRoleModal);
