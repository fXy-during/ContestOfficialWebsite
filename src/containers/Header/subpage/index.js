import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Icon, Button, Modal, Popover } from 'antd';
import Login from './Login';
import Register from './Register';



import './style.less';
class User extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            loginVisible: false,
            registerVisible: false,
            teamInfo: [],
        }
    }
    hideModal() {
      this.setState({
        loginVisible: false,
        registerVisible: false
      })
    }
    showModal(modalName) {
      this.setState({
        [modalName]: true,
      })  
    }
    handleToRegistration() {
      this.setState({
        loginVisible: false,
        registerVisible: true
      })
    }
    handleToLogin(){
      this.setState({
        loginVisible: true,
        registerVisible: false
      })
    }
    getTeamInfoAction() {
      this.props.getTeamInfoAction();
    }
    getMembersList(item, index) {
      return (
        <p key={index} className='teamInfo-member-wrap'>
          <span>{item.username}</span>
          <span>{item.mail}</span>
          <span>{item.schoolNumber}</span>
        </p>
      )
    }
    render(){
        const { username, signOut, teamInfo } = this.props;
        let teamInfoWrap = '';
        if (!!teamInfo.length) {
          teamInfoWrap = (
            <section >
            <div className='teamInfo-title'>
              <p>队伍名: </p>
              <p>{teamInfo[0].teamName}</p>
            </div>
            <div className='teamInfo-title'>
              <p>得分情况: </p>
              <p>最高得分: <span className='teamInfo-score'>{teamInfo[0].maxScore}</span> </p>
              <p>最新得分: <span className='teamInfo-score'>{teamInfo[0].lastScore}</span> </p>
            </div>
            <div className='teamInfo-title'>
              <p>成员: </p>
              {
                teamInfo.map(this.getMembersList)
              }
            </div>
            </section>
          )
        }
        return(
            <div id='header-user'>
            {
                !!username ? 
                <span className='header-user-container header-btn-container'>
                  <span className='header-user-icon'>
                    <Popover 
                     title='队伍信息'
                     trigger='focus'
                     content={!!teamInfoWrap? teamInfoWrap: '你尚未组队'}
                     >
                     <Button onClick={this.getTeamInfoAction.bind(this)} ghost icon='user'>{username}</Button>
                    </Popover>
                  </span>
                  <Button ghost type='dashed' onClick={signOut}>Sign Out</Button>
                </span> : 
                <span className='header-btn-container'>                  
                    <Button onClick={this.showModal.bind(this, 'loginVisible')} ghost>Sign in</Button>
                    <Button onClick={this.showModal.bind(this, 'registerVisible')} ghost>register</Button>
                </span>
            }

            <Modal
              width='350'
              title={null}
              footer={null}
              visible={this.state.loginVisible}
              onOk={this.hideModal.bind(this)}
              onCancel={this.hideModal.bind(this)}
             >
              <p id='login-logo-container'>
                <img className='login-logo-img' src='../src/static/images/logo.png'/>
              </p>
              <Login  
                getTeamInfoAction={this.getTeamInfoAction.bind(this)}
                init={this.state.loginVisible} 
                cb={this.hideModal.bind(this)} 
                onRegister={this.handleToRegistration.bind(this)} />
            </Modal>
            <Modal
              title='Register'
              visible={this.state.registerVisible}
              onOk={this.hideModal.bind(this)}
              onCancel={this.hideModal.bind(this)}
              footer={null}
             >
              <Register init={this.state.registerVisible} onLogin={this.hideModal.bind(this)}/>
            </Modal>
            </div>

        )
    }
}

export default User;