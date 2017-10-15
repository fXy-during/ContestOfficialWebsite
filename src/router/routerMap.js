import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import Rank from '../containers/Rank';
import App from '../containers/App.js';

class RouteMap extends React.Component {

updateHandle() { 
    console.log('记录PV');
    //PV统计
}
     render() {
        return ( 
            <Router 
             history={this.props.history} 
             onUpdate={this.updateHandle.bind(this)}> 
                <Route path='/' component={App}> 
                    <IndexRoute component={Home}/> 
                    <Route path='/home' component={Home}/>
                    <Route path='/rank' component={Rank}/>
                    <Route path="*" component={NotFound}/> 
                </Route> 
            </Router> 
            ) 
    } 
}
                    // <Route path='/login(/:router)' component={Login} /> 

export default RouteMap;

