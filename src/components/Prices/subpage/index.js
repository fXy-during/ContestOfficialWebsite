import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Button, Card } from 'antd'
import './style.less';


class Prices extends React.Component{

    render(){
        const numberArr = ['一', '二', '三'];
        const { title, rank, description, img } = this.props.data;
        return(
            <Card>
                <span className={`price-rank-${rank}`}>{numberArr[rank-1]}等奖</span>
                <div className="custom-image">
                  <img alt="奖品图片" width="100%" src={img} />
                </div>
                <div className="custom-card">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
            </Card>
        )
    }
}
                // <span className={`rank-top-${rank}`} ><img src='../src/static/images/award.png' /></span>

export default Prices;