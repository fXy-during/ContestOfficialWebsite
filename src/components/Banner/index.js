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
        return(
            <div id='content-banner-container'>
                <img className='content-banner-logo' src='../src/static/images/314684282-01.png'/>
                <div className='content-banner-text'>
                    <h1>创数据算法比赛</h1>
                    <h2>Creating data algorthm contest</h2>
                </div>
                <Button className='content-banner-btn' onClick={this.handleClick.bind(this)}>参加比赛</Button>
            </div>
        )
    }
}

export default Logo;