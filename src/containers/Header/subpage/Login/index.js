import  React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import { Form, Button, Input, Icon, Checkbox, message, Spin } from 'antd'

import * as userInfoActionsFromOtherFile from '../../../../actions/userinfo.js';
import { getItem, setItem } from '../../../../util/storeUser';
import './style.less';
import loginFetch from '../../../../fetch/login';
import getVerifyCode from '../../../../fetch/getVerifyCode';
const FormItem = Form.Item;


class Login extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          verifyCode: '',
          captchaHead: '',
          loginLoading: false,
          verifyCodeLoading: false,
        }
    }
    componentDidMount() {
      let userName = getItem('bigDataMonth_mail');
      let passWord = getItem('bigDataMonth_passWord');
      let { setFieldsValue } = this.props.form;
      setFieldsValue({
        userName: !!userName?userName:'',
        passWord: !!passWord?passWord:''
      });
      // 获取验证码
      this.getVerifyCodeAction();
    }
    // 获取验证码动作
    getVerifyCodeAction() {
      this.setState({
        verifyCodeLoading: true,
        loginLoading: false
      });
      let result = getVerifyCode();
      result.then(resp=>{
        if (resp.ok) {
          // console.log('resp.head', resp.headers.get('captcha-code'));
          this.setState({
            captchaHead: resp.headers.get('captcha-code'),
          })
          return resp.text()
        }
      }).then(verifyCode =>{
        // console.log(verifyCode);
        this.setState({
          verifyCode,
          verifyCodeLoading: false,
        });
      })
    }
    handleSubmit(e)  {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let { remember, userName, passWord } = values
            setItem('bigDataMonth_mail', remember ? userName : '');
            setItem('bigDataMonth_passWord', remember ? passWord : '');
            this.loginAction(values);
            this.changeLoginBtnLoadState(true);
          }
        });
    }
    componentWillUpdate(nextProps, nextState) {
      // console.log('nextProps, nextState', nextProps, nextState);
      if(nextProps.init&&!this.props.init) {
        // 更换
        this.getVerifyCodeAction();
        this.props.form.setFieldsValue({
          verification: '??',
        });
      }
    }
    // 登录动作
    loginAction({ verification, userName, passWord }) {
      const { login } = this.props.userInfoAction;
      const { captchaHead } = this.state;
      let result = loginFetch({
        mail: userName,
        pwd: passWord,
        verifyCode: verification,
      }, captchaHead);

      result.then(resp=>{
          if (resp.status===502) {
            message.error('502 Bad Gatway');
          } else if(resp.status===500) {
            message.error('500 服务器内部错误');
          } else{
            return resp.json()
          }
      }).then(data=>{
        if(data.msg==undefined) {
          let { mail, token, username, matched, teamId } = data;
          // console.log('success', data);
          // 將登录信息保存入redux
          setItem('bigDataMonth_token', token);
          login({
            mail,
            token,
            username,
            matched,
            teamId,
          });
          // 更改登陆按钮状态
          this.changeLoginBtnLoadState(false);
          message.success('Login Success');
          // 隐藏弹窗
          this.props.cb();
        } else {
          let info = data.msg;
          message.error(info);
          if(info==='密码错误'){
            this.props.form.setFields({
              passWord: {
                value: '',
                errors: [new Error('The password does not match')],
              },
            });
          } else if(info==='没有该用户') {
            this.props.form.setFields({
              userName: {
                value: userName,
                errors: [new Error('This user does not exist!')],
              },
            });
          }else {
            this.props.form.setFields({
              verification: {
                value: verification,
                errors: [new Error('Invalid verification code!')],
              },
            });
          }
          
          // 登录失败时更新验证码
          this.getVerifyCodeAction();
          // 更改登陆按钮状态
          this.changeLoginBtnLoadState(false);
        }
      }).catch(ex =>{
          console.log('fetch error', ex.message);
      }) 
    }
    handleRegister() {
      this.props.onRegister();
    }
    handleChangeVerifyCode(e) {
      this.getVerifyCodeAction();
    }     
    // 登录按钮状态切换
    changeLoginBtnLoadState(isLoading) {
      this.setState({
        loginLoading: isLoading
      })
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      const { verifyCode } = this.state;
        return(
            <div id='header-login-container'>
              <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, type: 'email', message: 'Please input your email!' }],
                    })(
                      <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="email" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('passWord', {
                      rules: [{ required: true, message: 'Please input your passWord!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="passWord" placeholder="passWord" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('verification', {
                      rules: [{ required: true, message: 'Please input verification!' }],
                    })(
                    <p>
                      <Input placeholder='verification' prefix={<Icon type="credit-card" style={{ fontSize: 13 }} />} style={{width: '60%'}} />
                      <span className='login-input-verification' onClick={this.handleChangeVerifyCode.bind(this)}>
                      <Spin spinning={this.state.verifyCodeLoading}>
                        <img alt='loading' title='click me to change one' src={`data:image/png;base64,${verifyCode}`}/>
                      </Spin>
                      </span>
                    </p>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>Remember me</Checkbox>
                    )}
                    <Button loading={this.state.loginLoading} type="primary" htmlType='submit' className="login-form-button">
                      Log in
                    </Button>
                    Or <a href="javascript: void(0)" style={{color: '#4f77ff'}} onClick={this.handleRegister.bind(this)}>register now!</a>
                  </FormItem>
              </Form>
            </div>
        )
    }
}
                    // <a className="login-form-forgot" href="javascript: void(0)">Forgot passWord</a>
const LoginWrap = Form.create()(Login);

LoginWrap.propTypes = {
  // 登录界面是否显示
  init: PropTypes.bool,
  // 登录成功的回调
  cb: PropTypes.func.isRequired,
  // 切换至注册页面
  onRegister: PropTypes.func.isRequired,
}
// 链接redux
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}
function mapDispatchToProps(dispatch) {
  return {
    userInfoAction: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWrap)