import  React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Icon, Menu } from 'antd';
import { hashHistory } from 'react-router';
import Category from '../../components/Category';
import User from './subpage';
import Logo from '../../components/Logo'
import { bindActionCreators } from 'redux';
import getTeamInfo from '../../fetch/getTeamInfo';
import { getItem } from '../../util/storeUser';

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';

// import * as fetchType from '../../constants/fetchType';



import './style.less';
class Header extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          teamInfo: [],
        }
    }
    handleClick(current) {
      // this.props.onClickAction(current);
      console.log('current', current);
      hashHistory.push(current);
    }
    signOutAction() {
      this.props.userinfoAction.logout();
    }
    // 是否面密登录
    componentDidMount() {
      const token = getItem('bigDataMonth_token');
      const username = getItem('bigDataMonth_username');
      const teamId = getItem('bigDataMonth_teamId');
      const mail = getItem('bigDataMonth_mail');
      const matched = getItem('bigDataMonth_matched');
      const password = getItem('bigDataMonth_passWord');
      console.log('token', token);
      if (token!='undefined') {
        this.props.userinfoAction.login({
            mail,
            token,
            username,
            matched,
            teamId,
          });
      }
    }
    // 获取队伍信息
    getTeamInfoAction() {
      const { teamId, token } = this.props.userinfo;
      let result = getTeamInfo('', token, teamId);
      result.then(resp => {
        return resp.json()
      }).then(teamInfo => {
        // console.log('teamInfo', teamInfo);
        this.setState({teamInfo});
      })
    }
    render(){
        const userinfo = this.props.userinfo;
        const username = userinfo.username || '';
        const { teamInfo } = this.state; 
        return(
            <div className='header-inner-container'>
              <User getTeamInfoAction={this.getTeamInfoAction.bind(this)} teamInfo={teamInfo} username={username} signOut={this.signOutAction.bind(this)}/>
              <Category current={this.props.current} onClickAction={this.handleClick.bind(this)}/>
              <Logo/>
            </div>
        )
    }
}

///  链接redux

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
function matDispatchToProps(dispatch) {
    return {
        userinfoAction: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    matDispatchToProps
)(Header);
