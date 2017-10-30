import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import enUS from 'antd/lib/locale-provider/en_US';
// import { LocaleProvider } from 'antd';
// import enUS from 'antd/lib/locale-provider/en_US';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userinfoActionFromOtherFiles from '../actions/userinfo.js';
import { getItem } from '../util/storeUser';

import '../static/style/common.less';
class App extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false,
        }
    }
    // 免迷登录
    componentDidMount() {
      const millisecondToHour = 1000*60*60;
      const token = getItem('bigDataMonth_token');
      const username = getItem('bigDataMonth_username');
      const teamId = getItem('bigDataMonth_teamId');
      const mail = getItem('bigDataMonth_mail');
      const matched = getItem('bigDataMonth_matched');
      const password = getItem('bigDataMonth_passWord');
      const lastestTime = getItem('bigDataMonth_lastestTime')
      console.log('token', token);
      const isOutTime = (((new Date()).getTime() - lastestTime)/millisecondToHour)<24? true: false;
      if (token!='undefined'&&isOutTime) {
        this.props.userinfoAction.login({
            mail,
            token,
            username,
            matched,
            teamId,
          });
      }
        this.setState({
            initDone: true
        })
    }
    render() { 
        return ( 
            <div>
            {   this.state.initDone?
                this.props.children:
                 <div>加载中...</div>
            }
            </div>
        ) 
    } 
}
            // <LocaleProvider locale={enUS}>
            // </LocaleProvider>
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
    }
}    

function mapDispatchToProps(dispatch) {
    return {
        userinfoAction: bindActionCreators(userinfoActionFromOtherFiles, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
