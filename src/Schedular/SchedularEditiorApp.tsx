import * as React from "react";
import { FlowServiceResponseHandler } from "../approverhandler/FlowServiceResponseHandler";
import { approvalData } from "../data/approval-data";
import { ScheduleGrid } from "../approverhandler/components/ScheduleGrid";

interface SchedularEditiorAppProps {
  approvals?: any[];
  status?: string;
}

interface SchedularEditiorAppState {
  isSubmitting: boolean;
  state: any;
  editSchedule: any;
  submitforApprovalButton: any;
  tableCells: any;
}

export class SchedularEditiorApp extends React.PureComponent<SchedularEditiorAppProps, SchedularEditiorAppState> {
  private flowService: FlowServiceResponseHandler;

  constructor(props: SchedularEditiorAppProps) {
    super(props);
    this.state = {
      isSubmitting: false,
      state: null,
      editSchedule: null,
      submitforApprovalButton: null,
      tableCells: null,
    };
    this.flowService = new FlowServiceResponseHandler();
  }

  componentDidMount() {
    this.initializeApprovals();
  }

  initializeApprovals = async () => {
    try {
      this.setState({ isSubmitting: true });
      await this.flowService.initiaApprovals();
      const { state, editSchedule, submitforApprovalButton, tableCells } = this.flowService.processData(approvalData);
      this.setState({ state, editSchedule, submitforApprovalButton, tableCells });
      this.setState({ isSubmitting: false });
    } catch (error) {
      console.error('Error initializing approvals:', error);
      this.setState({ isSubmitting: false });
    }
  };

  handleSubmitForApproval = async () => {
    try {
      this.setState({ isSubmitting: true });
      const payload = {
        scheduleId: 123,
        status: 'pending_approval'
      };
      const success = await this.flowService.submitForApproval(payload);
      if (success) {
        console.log('Successfully submitted for approval');
      } else {
        console.error('Failed to submit for approval');
      }
      this.setState({ isSubmitting: false });
    } catch (error) {
      console.error('Error submitting for approval:', error);
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { approvals, status } = this.props;
    const { isSubmitting, state, editSchedule, submitforApprovalButton, tableCells } = this.state;

    return (
      <div>
        <h1>Schedular Editor</h1>
        <p>Status: {status}</p>
        <p>Approvals: {approvals?.length ?? 0}</p>
        <p>Current State: {state}</p>
        <div className="actions" style={{ marginBottom: '20px' }}>
          {editSchedule && editSchedule.roles.includes("editor") && (
            <button disabled={!editSchedule.props.enabled}>
              Edit Schedule
            </button>
          )}
          {submitforApprovalButton && submitforApprovalButton.roles.includes("editor") && (
            <button 
              disabled={!submitforApprovalButton.props.enabled || isSubmitting}
              onClick={this.handleSubmitForApproval}
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
            </button>
          )}
        </div>
        <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
          {tableCells ? (
            <ScheduleGrid cells={tableCells} />
          ) : (
            <p>No schedule data available</p>
          )}
        </div>
      </div>
    );
  }
}
