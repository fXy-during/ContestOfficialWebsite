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
                <OverPack className='Content-timeline-overpack' >
                    <QueueAnim key="queue"
                      className='Content-timeline-QueueAnim-container'
                      ease={['easeOutQuad', 'easeInQuad']}
                    >
                      <QueueAnim key="imgWrap"
                        style={{ width: 'auto'}}
                        ease={['easeOutQuad', 'easeInQuad']}
                      >
                        <TweenOne
                          key="img"
                          animation={{ delay: 400, type: 'to', ease: 'easeOutQuad' }}
                        >
                          <img width="100%" className='timeline-img' src="https://zos.alipayobjects.com/rmsportal/VHGOVdYyBwuyqCx.png" />
                        </TweenOne>
                      </QueueAnim>
                      <h1 key="a" className='timeline-date-head'>日程安排</h1>
                      <h4 key="b" className='timeline-date-subpage'>最终时间待定</h4>
                      <TweenOne
                        key="timeline"
                        animation={{ delay: 400, type: 'from', ease: 'easeOutQuad' }}
                        resetStyleBool>
                          <Timeline pending='等待答辩'>
                            <Timeline.Item color='green'>
                              <p>爬虫</p>
                              <p>2015-09-01</p>
                              <p>炒鸡牛笔的网络数据爬取技术</p>
                            </Timeline.Item>

                            <Timeline.Item color='red'>
                              <p>算法</p>
                              <p>2015-09-01</p>
                              <p>炒鸡牛笔的网络数据爬取技术</p>
                            </Timeline.Item>

                            <Timeline.Item color='blue'>
                              <p>后端</p>
                              <p>2015-09-01</p>
                              <p>炒鸡牛笔的网络数据爬取技术</p>
                            </Timeline.Item>

                            <Timeline.Item color='orange'>
                              <p>前端</p>
                              <p>2015-09-01</p>
                              <p>炒鸡牛笔的网络数据爬取技术</p>
                            </Timeline.Item>
                            
                            <Timeline.Item>
                              <p>算法</p>
                              <p>2015-09-01</p>
                              <p>炒鸡牛笔的网络数据爬取技术</p>
                            </Timeline.Item>
                          </Timeline>
                      </TweenOne>
                      
                    </QueueAnim>

              </OverPack>
            </div>

        )
    }
}    
                  // <TweenOne
                  //       key="img"
                  //       animation={{ y: 30, opacity: 0, delay: 400, type: 'from', ease: 'easeOutQuad' }}
                  //       resetStyleBool
                  //     >
                  //       <img width="100%" src="https://zos.alipayobjects.com/rmsportal/VHGOVdYyBwuyqCx.png" />
                  //     </TweenOne>
                      // <div key="a" className="code-box-shape queue-anim-demo" />
                      // <div key="b" className="code-box-shape queue-anim-demo" />
                      // <div key="c" className="code-box-shape queue-anim-demo" />
                      // <div key="d" className="code-box-shape queue-anim-demo" />
                      // <div key="e" className="code-box-shape queue-anim-demo" />
                      // <div key="f" className="code-box-shape queue-anim-demo" />
export default TimeLine;