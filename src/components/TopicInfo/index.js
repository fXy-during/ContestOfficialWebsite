import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';

class TopicInfo extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div className='topic-info-container'>
            <div>
                <h1>题目描述</h1>
                <p></p>
            </div>
            <div>
                <h1>下面是为本次比赛准备的数据</h1>
                <p></p>
            </div>
            <div>
                <h1>做题要求</h1>
                <p></p>
            </div>
            <div>
                <h1>判分标准</h1>
                <p></p>
            </div>
            <div>
                <h1>提交格式</h1>
                <p></p>
            </div>

            </div>

        )
    }
}

export default TopicInfo;