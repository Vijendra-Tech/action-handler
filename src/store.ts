import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
import { RootState } from './types';

const store = createStore(
    reducers,
    { approvalFlow: { approvals: [], status: "Unlocked" } } as RootState,
    applyMiddleware(thunk)
);

export default store;
