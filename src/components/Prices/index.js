import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button, Row, Col} from 'antd'

import PriceItem from './subpage';
import './style.less';

class Prices extends React.Component{
                            // <img className='prices-img-wordpad' src='./src/static/images/award_title_bg.png' />

    render(){
        const priceItemStyle = {
            xs: {span: 7, offset: 1},
            lg: {span: 7, offset: 1},
        }
        const { prices } = this.props;
        return(
            <div className='home-section-container' id='prices-section-container'>
                <div className='price-wrap'>

                            <div className='prices-title'>
                                <h2>奖项设置</h2>
                                <h3>Award</h3>
                                <img src='../src/static/images/award_title_bg.png' />
                            </div>
                    
                    <Row>
                        {
                            prices.map((item, index)=>{
                                return (
                                    <Col className='col-diy' {...priceItemStyle} key={index}>
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