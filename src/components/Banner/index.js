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
                <img className='content-banner-logo' src='../src/static/images/banner.png'/>
                <img className='content-banner-text' src='../src/static/images/text.png'/>
                <Button className='content-banner-btn' onClick={this.handleClick.bind(this)}>参加比赛</Button>
            </div>
        )
    }
}

export default Logo;