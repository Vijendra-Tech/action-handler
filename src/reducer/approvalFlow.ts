import { FETCH_APPROVALS, FETCH_APPROVALS_SUCCESS, FETCH_APPROVALS_FAILURE } from "../action/types";

export default function approvalFlow(state = {}, action) {
    switch (action.type) {
        case FETCH_APPROVALS:
            return { ...state, loading: true };
        case FETCH_APPROVALS_SUCCESS:
            return { ...state, loading: false, approvals: action.payload };
        case FETCH_APPROVALS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}