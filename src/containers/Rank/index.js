import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getRank from '../../fetch/getRank';
import Foot from '../../components/Footer';
import Head from '../Header';

// import ContestInfo from '../../components/ContestInfo';
import RankTable from '../../components/RankTable';
import UploadFile from '../../components/Upload';
import './style.less';

const { Header, Content, Footer} = Layout;
class Rank extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            loading: false,
        }
    }
    componentDidMount() {
        this.getRankAction();
    }
    // 获取排行榜数据
    getRankAction() {
        this.setState({loading: true})
        let result = getRank();
        result.then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        }).then(data =>{
            this.setState({data, loading: false});
        })
    }
    
    render(){
        const { data, loading } = this.state;
        const { mail, token, matched } = this.props.userinfo;
        return(
            <Layout>
                <Header id='layout-header-diy'>
                    <Head current='rank'/>
                </Header>
                <Content>
                    <div className='rank-section-container '>
                      <p>
                        <h1>创数据算法大赛</h1>
                        <h2>排行榜</h2>
                      </p>
                      <img className='rank-img-bg' src='../src/static/images/info_ahead.png' />
                      <img className='rank-img-cup' src='../src/static/images/awarkCup.png'/>
                    </div>
                    <RankTable 
                        RefreshData={this.getRankAction.bind(this)}  
                        data={data} 
                        loading={loading}/>
                    <UploadFile mail={!!mail? mail: ''} token={!!token? token: ''} matched={!!matched? true: false} />
                </Content>
                <Footer id='layout-footer'>
                    <Foot /> 
                </Footer>
            </Layout>
        )
    }
}
                    
                    // <ContestInfo />

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
export default connect(mapStateToProps)(Rank);