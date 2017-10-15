import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';

class ContestInfo extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div className='home-section-container'>
            <h1>赛制说明</h1>

            </div>

        )
    }
}

export default ContestInfo;