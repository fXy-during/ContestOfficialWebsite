import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Icon, Button, Modal } from 'antd';
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
    render(){
        const { username, signOut } = this.props;
        return(
            <div id='header-user'>
            {
                !!username ? 
                <span className='header-user-container'>
                  <span><Icon type='user' />{username}</span>
                  <Button ghost type='dashed' onClick={signOut}>注销</Button>
                </span> : 
                <span className='header-btn-container'>                  
                    <Button onClick={this.showModal.bind(this, 'loginVisible')} ghost>登录</Button>
                    <Button onClick={this.showModal.bind(this, 'registerVisible')} ghost>注冊</Button>
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
                <img className='login-logo-img' src='../../../src/static/images/logo.png'/>
              </p>
              <Login init={this.state.loginVisible} cb={this.hideModal.bind(this)} onRegister={this.handleToRegistration.bind(this)} />
            </Modal>
            <Modal
              title='Register'
              visible={this.state.registerVisible}
              onOk={this.hideModal.bind(this)}
              onCancel={this.hideModal.bind(this)}
              footer={null}
             >
              <Register init={this.state.registerVisible}/ >
            </Modal>
            </div>

        )
    }
}

export default User;