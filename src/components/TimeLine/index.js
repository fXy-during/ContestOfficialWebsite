import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { Timeline } from 'antd'

import './style.less';
class TimeLine extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
                    // <TweenOne key="0" animation={{ opacity: 1 }}
                    //   style={{ opacity: 0, marginBottom: 10 }}/>
    render(){
        return(
            <div id='Content-timeline-container' className='home-section-container'>
              <div className='contest-info-title-container'>
                  &nbsp;
                  <p>
                      <h1>时间安排</h1>
                      <h2>Schedule</h2>
                  </p>
                  <img src='../src/static/images/schedule_title_bg.png' />
              </div> 
              <img className='timeline-wrap' src='../src/static/images/timeline.png' /> 
            </div>
        )
    }
}    
export default TimeLine;