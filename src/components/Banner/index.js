import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button } from 'antd'
import Prototype from 'prop-types'
import './style.less';
class Banner extends React.Component{
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
Banner.defaultProps = {
    isMatched: false,
}
/*

 */
Banner.propTypes = {
    // 参加比赛触发函数
    takeIn: Prototype.func.isRequired,
    // 是否已经组队
    isMatched: Prototype.bool,
}
export default Banner;