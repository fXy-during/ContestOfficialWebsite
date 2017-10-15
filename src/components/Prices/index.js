import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button, Row, Col } from 'antd'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

import PriceItem from './subpage';
import './style.less';


class Prices extends React.Component{

    render(){
        const { prices } = this.props;
        return(
            <div className='home-section-container'>
                <div className='price-wrap'>
                    <Row gutter={14}>
                    <OverPack className='Content-timeline-overpack' >
                        <QueueAnim key="title"
                          className='Content-timeline-QueueAnim-container'
                          ease={['easeOutQuad', 'easeInQuad']}
                                    >
                        <TweenOne
                          key="img"
                          animation={{ delay: 400, type: 'to', ease: 'easeOutQuad' }}
                        >
                            <div className='prices-title'>
                                <h2>奖品</h2>
                                <p>让程序员无法抗拒的奖励</p>
                            </div>
                        </TweenOne>
                        </QueueAnim>
                        <QueueAnim key="prices"
                          className='Content-timeline-QueueAnim-container'
                          ease={['easeOutQuad', 'easeInQuad']}
                                >
                        {
                            prices.map((item, index)=>{
                                return (
                                    <TweenOne
                                      key="item"
                                      key={index}
                                      animation={{ delay: 400, type: 'to', ease: 'easeOutQuad' }}
                                    >
                                        <Col className='col-diy' span={7} key={index}>
                                            <PriceItem data={item} key={index}/>
                                        </Col>
                                    </TweenOne>
                                )
                            })
                        }
                        </QueueAnim>
                    </OverPack>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Prices;