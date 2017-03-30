import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import UserRoleModal from './UsersRoleModal';
// import * as roleActions from '../../actions/rolesActions';
import { updateRole, getRole, deleteRole } from '../../actions/rolesActions';

class RolesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: Object.assign({}, props.currentRole).title,
      roleId: undefined
    };

    this.onClick = this.onClick.bind(this);
    this.editRole = this.editRole.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.getRole(this.props.id);
  }

  onChange(event) {
    this.setState({ title: event.target.value, roleId: this.props.role.id });
  }

  delete(event) {
    event.preventDefault();
    this.props
      .deleteRole(this.props.role.id).then(() => {
        toastr.success('Document successfully deleted');
      }).catch(() => {
        toastr.error('Unable to delete');
      });
  }

  editRole(event) {
    event.preventDefault();
    const newRole = {};
    newRole.title = this.state.title;
    newRole.roleId = this.props.role.id;
    this.props
      .updateRole(this.state).then(() => {
        toastr.success('Role updated successfully');
      }).catch(() => {
        toastr.error('An error occurred');
      });
  }

  componentDidMount() {
    $('.modal').modal();
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6 l4">
          <div className="card blue lighten-2">
            <div className="card-content white-text">
              <span className="card-title">{this.props.role.title}</span>
              <span>
                <a
                  id={this.props.id}
                  href="#view-modal"
                  className="white-text"
                  onClick={this.onClick}>
                  <i className="fa fa-eye" aria-hidden="true" /> View Users with this role</a>
              </span>
              <div>
                {/* Modal to show users that have a role */}
                <UserRoleModal />
              </div>
            </div>
            <div className="card-action">
              <a
                id={this.props.id}
                href="#edit-modal"
                onClick={this.editRole}
                className="white-text left">
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit</a>
              {/* Modal Start*/}
              <div id="edit-modal" className="modal">
                <div className="modal-content">
                  <h5>Edit this role</h5>
                  <div className="input-field col s6">
                    <span>Old value: {this.props.currentRole.title}</span>
                    <input
                      id="text-edit2"
                      type="text"
                      name="title"
                      className="validate"
                      defaultValue=""
                      onChange={this.onChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <a
                    className="waves-effect waves-light btn modal-action modal-close"
                    id="edit-role"
                    onClick={this.editRole}>UPDATE</a>
                </div>
              </div>
              {/* Modal end*/}
              <a
                href="#"
                className="white-text right"
                onClick={this.delete}>
                <i className="fa fa-trash-o" aria-hidden="true" /> Delete</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RolesCard.propTypes = {
  id: PropTypes.number.isRequired,
  role: PropTypes.object.isRequired,
  getRole: PropTypes.func.isRequired,
  currentRole: PropTypes.object.isRequired,
  updateRole: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentRole: state.roles.currentRole
  };
}

export default connect(mapStateToProps, { getRole, updateRole, deleteRole })(RolesCard);
