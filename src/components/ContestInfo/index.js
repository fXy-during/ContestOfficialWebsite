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
            <div className='contest-info-title-container'>
                &nbsp;
                <p>
                    <h1>赛制说明</h1>
                    <h2>Competition Specification</h2>
                </p>
                <img src='./src/static/images/contestInfo_title_bg.png' />
            </div>

            </div>

        )
    }
}

export default ContestInfo;