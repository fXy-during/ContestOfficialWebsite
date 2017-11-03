import  React from 'react';
import { hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Layout, message, Modal, Button, Popconfirm  } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';

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
            visible: false,
            matched: false,
            isCreateTeam: false,
        }
    }
    componentDidMount() {

    }
    handleClick(current) {
        this.setState({current});
    }
    handleTakeIn() {
        const UNLOG = 'stateless';
        let matched  = !!this.props.userinfo.token ? this.props.userinfo.matched : UNLOG;
        console.log('matched before', matched);

        if (typeof matched === 'string' && matched!==UNLOG) {
            matched = matched === 'true' ? true : false;
        }
        console.log('matched after', matched);
        if (matched==true) {
            // message.info('你已经参加了比赛');
            hashHistory.push('rank');
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
                return resp.text()
            }
        }).then(info=>{
            console.log('info', info);
            if (typeof info === 'string') {
                message.success('Your team has been created successfully!');
                this.props.userinfoAction.match({
                    matched: true,
                    teamId: info-=0,
                })
                this.setState({isCreateTeam: true});
            } else { 
                message.error(info.msg);
            }
        }).catch(ex=>{
            console.log('catch error', ex.message);
        })
    }
    // {
    //         title: 'Alienware17C-R2848',
    //         rank: 1,
    //         description: 'i7-7820HK 16G 1TSSD+1T GTX1080 8G独显 QHD (价值33999.00￥)',
    //         img: '../src/static/images/award_one.jpg',
    //     },{
    //         title: 'Alienware  24.5英寸电竞显示器',
    //         rank: 2,
    //         description: 'AW2518H G-Sync 240Hz刷新专业游戏电竞显示器 (价值5999.00￥)',
    //         img: '../src/static/images/award_two.jpg',
    //     },{
    //         title: 'Alienware Advanced版 游戏键盘',
    //         rank: 3,
    //         description: ' AW568 机械/茶轴游戏键盘(AlienFX灯效 全键无冲 5个宏按键)黑 (价值899.00￥)',
    //         img: '../src/static/images/award_three.jpg',
    //     },
    getTestPop() {
        console.log('from pop');
    }
    getTestBtn() {
        console.log('from Btn');
    }
    render(){
        let { matched } = this.props.userinfo;
        if (typeof matched === 'string') {
            matched = matched === 'true' ? true : false;
        }
        console.log('isMatched', matched);
        const prices = [{
            title: '樱桃（Cherry）G80-3000LXCEU-2机械键盘',
            description: '程序员的梦想，德国樱桃，历久弥新。樱桃经典之一——SINCE 1989， CHERRY G80-3000系列键盘于1989年出品，是一款销售至今任然在售的机械键盘，在电脑终端产品里堪称奇迹(￥709*2)',
            img: '../src/static/images/prices/first.png',
            rank: 1,

        },{
            title: '魔声（Monster）Ntune 灵动 头戴式线控耳机',
            rank: 2,
            description: 'Ncredible系列中的N-Tune压耳式耳机以一系列魔声创新技术为基础进行设计，具备高性能、耐用性和时尚性等特点，确保将专业的音质呈现给所有人。轻便的N-Tune压耳式耳机设计便于长时间佩戴。采用无缠结线材，使用起来更加方便，低调的直角接头增加了舒适性和灵活度。(￥399*2)',
            img: '../src/static/images/prices/second.png',
        },{
            title: '雷蛇（Razer）炼狱蝰蛇 DeathAdder',
            rank: 3,
            description: '6400dpi 4G光学传感器,经优化的人体工学侧裙设计,支持Razer Synapse(￥249*4)',
            img: '../src/static/images/prices/third.png',
        },]
        return(
            <Layout>
                <Header id='layout-header-diy'>
                    <Head isCreateTeam={this.state.isCreateTeam} current='home'/>
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
                     <JoinForm cb={this.hideModal.bind(this)} createTeam={this.handleCreateTeam.bind(this)}/>
                    </Modal>
                    <Banner takeIn={this.handleTakeIn.bind(this)} isMatched={matched}/>
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
function mapStateToDispatch(dispatch) {
    return {
        userinfoAction: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(mapStateToProps, mapStateToDispatch)(Home);
