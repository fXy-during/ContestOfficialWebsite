import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Layout, message, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Head from '../Header';
import JoinForm from './JoinForm';
import Banner from '../../components/Banner';
import TimeLine from '../../components/TimeLine';
import Prices from '../../components/Prices';
import Foot from '../../components/Footer';
import ContestInfo from '../../components/ContestInfo';
import createTeam from '../../fetch/createTeam';
import './style.less';

const { Header, Content, Footer} = Layout;
class Home extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            visible: false
        }
    }
    componentDidMount() {

    }
    handleClick(current) {
        this.setState({current});
    }
    handleTakeIn() {
        const UNLOG = 'stateless';
        const matched  = !!this.props.userinfo.token ? this.props.userinfo.matched : UNLOG;
        console.log('matched', matched);
        if (matched===true) {
            message.info('你已经参加了比赛');
        } else if (matched===UNLOG) { 
            message.info('请先登录');
        } else {
            this.setState({visible: true})
        }
    }
    hideModal(){
        this.setState({visible:false})
    }
    handleCreateTeam({teamName, members}) {
        const { token, mail } = this.props.userinfo;
        let result = createTeam({teamName, teamerMail: members}, '', token, mail);
        result.then(resp=>{
            if (resp.status === 500) {
                message.error('服务器内部错误');
            } else if(resp.status === 502){
                message.error('Bad Gatway');
            } else if(resp.status === 403){
                console.log(resp.statusText);
                return resp.json()
            } else {
                return resp.json()
            }
        }).then(info=>{
            if (info.msg==1) {
                message.success('Your team has been created successfully!');
            } else { 
                message.info(info.msg)
            }
        }).catch(ex=>{
            console.log('catch error', ex.message);
        })
    }
    render(){
        const prices = [{
            title: 'Alienware17C-R2848',
            rank: 1,
            description: 'i7-7820HK 16G 1TSSD+1T GTX1080 8G独显 QHD (价值33999.00￥)',
            img: '../src/static/images/award_one.jpg',
        },{
            title: 'Alienware  24.5英寸电竞显示器',
            rank: 2,
            description: 'AW2518H G-Sync 240Hz刷新专业游戏电竞显示器 (价值5999.00￥)',
            img: '../src/static/images/award_two.jpg',
        },{
            title: 'Alienware Advanced版 游戏键盘',
            rank: 3,
            description: ' AW568 机械/茶轴游戏键盘(AlienFX灯效 全键无冲 5个宏按键)黑 (价值899.00￥)',
            img: '../src/static/images/award_three.jpg',
        }]
        return(
            <Layout>
                <Header id='layout-header-diy'>
                    <Head current='home'/>
                </Header>
                <Content>
                    <Modal
                      width='400'
                      title='Create Team'
                      footer={null}
                      visible={this.state.visible}
                      onOk={this.hideModal.bind(this)}
                      onCancel={this.hideModal.bind(this)}
                     >
                     <JoinForm createTeam={this.handleCreateTeam.bind(this)}/>
                    </Modal>

                    <Banner takeIn={this.handleTakeIn.bind(this)}/>
                    <ContestInfo />
                    <TimeLine />
                    <Prices prices={prices} />
                </Content>
                <Footer id='layout-footer'>
                    <Foot /> 
                </Footer>
            </Layout>

        )
    }
}
                    // <Test id="content_7_0" key="content_7_0" isMode={this.state.isMode}/>

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
export default connect(mapStateToProps)(Home);