import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Head from '../Header';
import Foot from '../../components/Footer';
import { Layout, Button } from 'antd';
import TeamInfo from '../../components/TeamInfo';
import './style.less';

const { Header, Content, Footer} = Layout;
class AboutUs extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    handleClick() {
         window.open('http://182.150.37.74:88/dist', '_blank');
    }
    render(){
        return(
            <Layout>
                <Header id='layout-header-diy'>
                    <Head current='about'/>
                </Header>
                <Content>
                    <div id='aboutUs-head-bg-container'>
                        <img className='aboutUs-head-bg' src='../src/static/images/AboutUs_head_bg_test.png'/>
                        <h1 className='aboutUs-head-text'>创数据团队招新进行中</h1>
                        <Button className='aboutUs-head-btn' onClick={this.handleClick.bind(this)}>加入我们</Button>
                    </div>
                    <TeamInfo />
                </Content>
                <Footer id='layout-footer'>
                    <Foot /> 
                </Footer>
            </Layout>
        )
    }
}    
export default AboutUs;