import React from "react";
import { Provider } from "react-redux";
import store from './store';

interface RootProps {
    children: React.ReactNode;
}

const Root = ({ children }: RootProps): JSX.Element => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default Root;
