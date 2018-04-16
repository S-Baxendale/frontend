import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUser, approveUser } from "../../actions/users";
import { assignImage } from "./lib/lib";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import EditUserForm from "./EditUserForm";
import IconButton from "material-ui/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import compose from "lodash/fp/compose";
import { translate } from "react-i18next";
import Dialog, { DialogTitle } from "material-ui/Dialog";

class AdminProfilePage extends PureComponent {
  state = {
    edit: false
  };


  approveUser = id => {
    this.props.approveUser(id);
    this.props.history.goBack()
   };


  handleEditClose = () => {
    this.setState({ edit: false });
  };

  handleEditOpen = () => {
    this.setState({ edit: true });
  };

  componentWillMount(props) {
    this.props.fetchUser(this.props.match.params.id);
  }

  updateUser = user => {
    this.props.updateUser(this.props.match.params.id, user);
    this.handleEditClose();
  };

  render() {
    const { user, t } = this.props;
    if (!user || !user.profile) return null;

    return (
      <div key={user.profile.id} className="user-card">
      <Button
        onClick={() => this.props.history.goBack()}
        size="medium"
        color="primary"
        style={{display:'flex', flex:1}}
      >
        Go Back
      </Button>
        <div className="photo">
          <img
            style={{ marginTop: "50px" }}
            src={assignImage(user.profile.logo)}
            alt="img"
            width="100"
          />
        </div>
        <IconButton onClick={this.handleEditOpen} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <div className="info">
          <Typography variant="headline" component="h2">
            {user.profile.name}
          </Typography>

          <Typography color="textSecondary">
            {t("field")}: {user.profile.field}
          </Typography>
          <Typography color="textSecondary">
            {t("type")}: {user.profile.type}
          </Typography>
          <Typography color="textSecondary">
            {t("coc")}: {user.profile.chamberOfCommerce}
          </Typography>
          <Typography color="textSecondary">
            {t("address")}: {user.profile.address}
          </Typography>
          <Typography color="textSecondary">
            {t("cityPort")}: {user.profile.city}
          </Typography>
          <Typography color="textSecondary">
            {t("country")}: {user.profile.country}
          </Typography>
          <Typography color="textSecondary">
            {t("phone")}: {user.profile.phone}
          </Typography>

          <Typography color="textSecondary">
            {t("Email")}: {user.email}
          </Typography>

          <Dialog
            open={this.state.edit}
            onClose={this.handleEditClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Update User</DialogTitle>
            {this.state.edit && (
              <EditUserForm
                initialValues={user.profile}
                onSubmit={this.updateUser}
              />
            )}
          </Dialog>

          <div>
            <Button
              onClick={() => this.props.history.push(`/orders/${user.id}`)}
              size="medium"
              color="primary"
            >
              Orders
            </Button>
            <Button
              onClick={() => this.props.history.push(`/products/${user.id}`)}
              size="medium"
              color="primary"
            >
              Products
            </Button>
          </div>
        </div>
        <Button
          onClick={() => this.approveUser(user.id)}
          size="medium"
          color="primary"
        >
          Approve
        </Button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

export default compose(
  translate("user"),
  connect(mapStateToProps, { fetchUser, updateUser, approveUser })
)(AdminProfilePage);