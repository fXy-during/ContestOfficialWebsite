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
                <img src='../src/static/images/contestInfo_title_bg.png' />
            </div>
            <p className='contest-info-text-container'>
                参赛人数：每支队伍人数限定1~2人。<br/>
                每天提交次数：3次，1~8时，9~17时，18~0时<br/>
                比赛时间：7天<br/>
                注意事项：请认真阅读文档中的Readme文件<br/>
            </p>
            </div>

        )
    }
}

export default ContestInfo;