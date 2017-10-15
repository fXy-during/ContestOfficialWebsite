import React from 'react';


import { render } from 'react-dom' ;
import { hashHistory } from 'react-router' ;
import RouteMap from './router/routerMap' ;

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

let store = configureStore();

let Root = React.createClass({
    render(){
        return(
            <Provider store={store}>
                <RouteMap history={hashHistory}/>
            </Provider>
        )
    }
})
                // <Provider store={store}>
                //     
                // </Provider>
export default Root;