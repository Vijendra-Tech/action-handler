import { FETCH_APPROVALS, FETCH_APPROVALS_FAILURE, FETCH_APPROVALS_SUCCESS, SUBMIT_FOR_APPROVAL, SUBMIT_FOR_APPROVAL_FAILURE, SUBMIT_FOR_APPROVAL_SUCCESS } from "./types";
import axios from 'axios';
import { Dispatch } from 'redux';

// Action creator using redux-thunk
export const callFetchApprovals = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        dispatch({
            type: FETCH_APPROVALS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.error('Error fetching approvals:', error);
        dispatch({
            type: FETCH_APPROVALS_FAILURE,
            payload: error
        });
    }
};

export const submitForApproval = (payload: any) => async (dispatch: Dispatch) => {
    dispatch({ type: SUBMIT_FOR_APPROVAL });
    try {
        // Replace with your actual API endpoint
        const response = await axios.post('https://api.example.com/submit-approval', payload);
        dispatch({
            type: SUBMIT_FOR_APPROVAL_SUCCESS,
            payload: response.data
        });
        return true;
    } catch (error) {
        console.error('Error submitting for approval:', error);
        dispatch({
            type: SUBMIT_FOR_APPROVAL_FAILURE,
            payload: error
        });
        return false;
    }
};
