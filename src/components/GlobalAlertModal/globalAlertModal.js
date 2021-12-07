import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import updateGlobalAlertModal from "./globarAlertModalAction";

class GlobalAlertModal extends Component {
  hideModal = () => {
    this.props.updateGlobalAlertModal(false, "");
    console.log("hide here");
    this.props.onExpire && this.props.onExpire();
  };
  render() {
    return this.props.show ? (
      <SweetAlert
        type={this.props.type ? this.props.type : "warning"}
        confirmBtnBsStyle={this.props.type ? this.props.type : "warning"}
        confirmBtnStyle={{ width: "auto", padding: "0.5rem 1rem" }}
        style={{ top: "0", left: "0", color: "black" }}
        title={this.props.title}
        onConfirm={() => this.hideModal()}
      >
        {this.props.message}
      </SweetAlert>
    ) : null;
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.globalModalReducer,
  };
};
const mapDispatchToProps = {
  updateGlobalAlertModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(GlobalAlertModal);
