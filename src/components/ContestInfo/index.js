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
            <h1>题目描述：</h1>
            <p>银行排队系统也称之为银行排队机、叫号显示系统。
随着电子信息产品、智能产品的快速发展，以及人类生活对服务环境、服务效率的要求越来越高，尤其是在服务性行业里更是如此，因此排队系统这个概念就应运而生了。 但是在一些落后的地区，没有先进的系统支持，人们还在为了排队而烦恼。有时候看到银行门口长长的队伍，许多人就直接放弃了等待。这看似普通的现象，背后却蕴含着大量有迹可循的大道理！！！聪明的你可能会说，当一个顾客刚刚走进银行的时候，你就已经知道了他会离开所在队伍的可能性，从而选对正确的队列，减少等待。预测数据并不是凭空猜测，你肯定也需要一些数据作为你预测的佐证。</p>
            <h1>下面是为本次比赛准备的数据：</h1>
            <p>数据以CSV文件格式下发，每一行代表影响每一位顾客是否离开的相关信息。
数据分为两类，
第一类是训练集（train.csv，共2000行），用于训练你的算法或计算模型。包括八个特征和一个结果（即顾客离队率）。
第二类是测试集（test.csv，共500行），用于预测得出你本次比赛的答案。包括八个特征，结果（即顾客离队率，是你要提交给我们的答案）。</p>
            </div>

        )
    }
}

export default ContestInfo;