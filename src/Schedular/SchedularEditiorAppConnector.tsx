import { connect } from "react-redux";
import { RootState } from "../types";
import { SchedularEditiorApp } from "./SchedularEditiorApp";

function mapStateToProps(state: RootState) {
  return {
    approvals: state.approvalFlow.approvals,
    status: state.approvalFlow.status
  };
}

export default connect(mapStateToProps)(SchedularEditiorApp);