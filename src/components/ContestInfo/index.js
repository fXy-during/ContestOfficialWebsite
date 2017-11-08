import  React from 'react';
import './style.less';

function ContestInfo(props) {
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
            每天提交次数：2次<br/>
            比赛时间：7天<br/>
            注意事项：请认真阅读文档中的README文件<br/>
        </p>
        </div>
    )
}
export default ContestInfo;