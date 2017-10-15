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
    render(){
        const userinfo = this.props.userinfo;
        const username = userinfo.username || ''
        return(
            <div className='header-inner-container'>
              <User username={username} signOut={this.signOutAction.bind(this)}/>
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
