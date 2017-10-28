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

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';

// import * as fetchType from '../../constants/fetchType';



import './style.less';
class Header extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    handleClick(current) {
      // this.props.onClickAction(current);
      console.log('current', current);
      hashHistory.push(current);
    }
    signOutAction() {
      this.props.userinfoAction.logout();
    }
    // 获取队伍信息
    getTeamInfoAction() {
      const { teamId, token } = this.props.userinfo;
      let result = getTeamInfo('', token, teamId);
      result.then(resp => {
        return resp.json()
      }).then(teamInfo => {
        // console.log('teamInfo', teamInfo);
        this.props.userinfoAction.addTeamInfo(teamInfo);
      })
    }
    render(){
        const userinfo = this.props.userinfo;
        const username = userinfo.username || '';
        const teamInfo = userinfo.teamInfo || [];
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
