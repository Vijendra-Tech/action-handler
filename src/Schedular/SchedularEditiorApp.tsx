import * as React from "react";
import { FlowServiceResponseHandler } from "../approverhandler/FlowServiceResponseHandler";
import { approvalData } from "../data/approval-data";

interface SchedularEditiorAppProps {
  approvals?: any[];
  status?: string;
}

interface SchedularEditiorAppState {
  isSubmitting: boolean;
}

export class SchedularEditiorApp extends React.PureComponent<SchedularEditiorAppProps, SchedularEditiorAppState> {
    constructor(props: SchedularEditiorAppProps) {
        super(props);
        this.state = {
            isSubmitting: false
        };
    }

    componentDidMount() {
        FlowServiceResponseHandler.initiaApprovals();
        const { state, editSchedule, submitforApprovalButton } = FlowServiceResponseHandler.processData(approvalData);
        console.log('Current State:', state);
        console.log('Edit Schedule Component:', editSchedule);
        console.log('Submit for Approval Button:', submitforApprovalButton);
    }

    handleSubmitForApproval = async () => {
        this.setState({ isSubmitting: true });
        try {
            const payload = {
                scheduleId: 123, // Example ID
                status: 'pending_approval'
            };
            
            const success = await FlowServiceResponseHandler.submitForApproval(payload);
            if (success) {
                console.log('Successfully submitted for approval');
            } else {
                console.error('Failed to submit for approval');
            }
        } catch (error) {
            console.error('Error submitting for approval:', error);
        } finally {
            this.setState({ isSubmitting: false });
        }
    };

    render() {
        const { approvals, status } = this.props;
        const { isSubmitting } = this.state;
        const { state, editSchedule, submitforApprovalButton } = FlowServiceResponseHandler.processData(approvalData);
        
        return (
            <div>
                <h1>Schedular Editor</h1>
                <p>Status: {status}</p>
                <p>Approvals: {approvals?.length ?? 0}</p>
                <p>Current State: {state}</p>
                <div>
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
            </div>
        );
    }
}
