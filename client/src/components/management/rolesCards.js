import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import UserRoleModal from './UsersRoleModal';
// import * as roleActions from '../../actions/rolesActions';
import { updateRole, getRole } from '../../actions/rolesActions';

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
  }

  editRole(event) {
    event.preventDefault();
    this.props.getRole(this.props.id);
    this.setState({ title: this.props.currentRole.title });
  }

  onChange(event) {
    this.setState({ title: event.target.value, roleId: this.props.currentRole.id });
  }

  onClick(event) {
    event.preventDefault();
    this.props
      .updateRole(this.state).then(() => {
        toastr.success('Role updated successfully');
      }).catch(() => {
        toastr.error('An error occured');
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
                className="white-text">
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit Role</a>
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
                    onClick={this.onClick}>UPDATE</a>
                </div>
              </div>
              <a href="#" className="white-text">
                <i className="fa fa-trash-o" aria-hidden="true" /> Delete Role</a>
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
  updateRole: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentRole: state.roles.currentRole
  };
}

export default connect(mapStateToProps, { getRole, updateRole })(RolesCard);
