import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button, Row, Col } from 'antd'

import PriceItem from './subpage';
import './style.less';

let xm = '';
class Prices extends React.Component{

    render(){
        const { prices } = this.props;
        return(
            <div className='home-section-container'>
                <div className='price-wrap'>
                            <div className='prices-title'>
                                <h2>奖品 </h2>
                                <p>让程序员无法抗拒的奖励</p>
                            </div>
                    <Row gutter={14}>
                        {
                            prices.map((item, index)=>{
                                return (
                                    <Col className='col-diy' span={7} key={index}>
                                        <PriceItem data={item} key={index}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default Prices;