import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button } from 'antd'
import './style.less';
class Logo extends React.Component{
    handleClick() {
        this.props.takeIn();
    }
    render(){
        const { isMatched } = this.props;
        return(
            <div id='content-banner-container'>
                <img className='content-banner-logo' src='../src/static/images/bg_latest.png'/>
                <div className='content-banner-text'>
                    <h1>创数据算法比赛</h1>
                    <h2>Creating data algorthm contest</h2>
                </div>
                <Button className='content-banner-btn' onClick={this.handleClick.bind(this)}>
                {
                    !isMatched? '参加比赛' :'查看排行榜'
                }</Button>
            </div>
        )
    }
}

export default Logo;