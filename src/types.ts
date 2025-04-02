export interface ApprovalFlowState {
    loading?: boolean;
    approvals?: any[];
    error?: any;
    status?: string;
}

export interface RootState {
    approvalFlow: ApprovalFlowState;
}
