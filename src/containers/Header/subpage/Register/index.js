import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Form, Input, Tooltip, Icon, Row, Col, Button, message, Spin, notification } from 'antd';
const FormItem = Form.Item;

import register from '../../../../fetch/register';
import getVerifyCode from '../../../../fetch/getVerifyCode';
import mailToWebsite from '../../../../components/mailToWebsite';
import './style.less';

class Register extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          confirmDirty: false,
          verifyCode: '',
          captchaHead: '',
          verifyCodeLoading: false,
        }
    }
    componentDidMount() {
      this.getVerifyCodeAction();
    }
    componentWillUpdate(nextProps, nextState) {
      // console.log('nextProps, nextState', nextProps, nextState);
      if(nextProps.init&&!this.props.init) {
        this.getVerifyCodeAction();
        this.props.form.setFieldsValue({
          verification: '',
        });
      }
    }
    // 表单提交
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.registerAction(values);
          }
        });
    }
    // 注冊
    registerAction({name, password, mail, verification, number}) {
      let { captchaHead } = this.state;
      let result = register({
        userInfo: {
          username: name,
          pwd: password,
          mail,
          schoolNumber: number
        },
        verifyCode: verification
      }, captchaHead)
      result.then(resp =>{
        if (resp.status===502) {
            message.error('502 Bad Gatway');
          } else if(resp.status===500) {
            message.error('500 服务器内部错误');
          } else if(resp.status===403) {
            message.error('邮箱已經被注册,请更换过后再试');
          } else{
            return resp.json()
          }
      }).then(text=>{
        this.getVerifyCodeAction();
        if (!!text) {
          // message.success('注冊成功, 请登录你的邮箱激活账号.');
          this.mailToWebsiteAction();
        }
      })
    }
    // 获取验证码
    getVerifyCodeAction() {
      this.setState({
        verifyCodeLoading: true,
      });
      let result = getVerifyCode();
      result.then(resp=>{
        if (resp.ok) {
          // 获取验证码hash
          this.setState({
            captchaHead: resp.headers.get('captcha-code'),
          })
          return resp.text()
        }
      }).then(verifyCode =>{
        this.setState({
          verifyCode,
          verifyCodeLoading: false,
        });
      })
    }
    // 
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    // 校验确认密码
    checkPassword(rule, value, callback) {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you entered is inconsistent!');
      } else {
        callback();
      }
    }
    // 
    checkConfirm(rule, value, callback) {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
    // 
    handleChangeVerifyCode(e) {
      this.getVerifyCodeAction();
    }
    mailToWebsiteAction() {
      const mail = this.props.form.getFieldValue('mail');
      // 根据对应邮箱打开
      const toMail = mailToWebsite(mail);
      const key = `${new Date()}`;
      const btnClick = ()=>{
        notification.close(key);
        window.open(`http://${toMail}`, '_blank');
      }
      // 自定义取消按钮
      const btn = (
        <Button onClick={btnClick}>click me to your mail</Button>
        )
      notification.open({
        message: `One last step to register`,
        description:'we have send a message to your e-mail,please confirm your email and activate the account',
        icon: <Icon type='info-circle' style={{ color: '#e46a5d' }}  />,
        btn,
        key,
      })
      // 切换至登录页
      this.props.onLogin();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { verifyCode } = this.state;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
        };
        const verifyItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
        }
         const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 4,
              offset: 16,
            },
          },
        };
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem 
                 {...formItemLayout}
                 label='Name'>
                 {
                    getFieldDecorator('name', {
                        rules: [{
                            pattern: /[\u4e00-\u9fa5]/,
                            message: 'The name entered is not valid',
                        },{
                            required: true,
                            message: 'please input your real name',
                        }]
                    })(
                    <Tooltip title="Recommended to use real names">
                        <Input placeholder='your name'/>
                    </Tooltip>
                    )}
                 </FormItem>
                 <FormItem 
                 {...formItemLayout}
                 label='StudentID:'
                 hasFeedback>
                 {
                    getFieldDecorator('number', {
                        rules: [{
                            len: 12,
                            message: 'The input is not valid StudentID',
                        },{
                            required: true,
                            message: 'please input your StudentID',
                        }]
                    })(
                        <Input placeholder=''/>
                    )}
                 </FormItem>
                 <FormItem 
                 {...formItemLayout}
                 label='Email'
                 hasFeedback>
                 {
                    getFieldDecorator('mail', {
                        rules: [{
                            type: 'email', 
                            message: 'The input is not a valid E-mail',
                        },{
                            required: true,
                            message: 'please input your E-mail',
                        }]
                    })(
                        <Input placeholder='your login account'/>
                    )}
                 </FormItem>
                  <FormItem 
                 {...formItemLayout}
                 label='Password:'>
                 {
                    getFieldDecorator('password', {
                        rules: [{
                          required: true,
                          message: 'please input your password',
                        },{
                          validator: this.checkConfirm.bind(this)
                        }]
                    })(
                        <Input  type="password"/>
                    )}
                 </FormItem>
                 <FormItem 
                 {...formItemLayout}
                 label='Confirm Password:'>
                 {
                    getFieldDecorator('confirm', {
                        rules: [{
                          required: true,
                          message: 'Please confirm your password!',
                        },{
                          validator: this.checkPassword.bind(this)
                        }]
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
                    )}
                 </FormItem>

                 <FormItem 
                 {...verifyItemLayout}
                 label='Verification'

                 hasFeedback>
                 {
                    getFieldDecorator('verification', {
                        rules: [{
                            len: 5,
                            message: 'The input is not a valid verification',
                        },{
                            required: true,
                            message: 'please input your verification',
                        }]
                    })(
                      <p>
                        <Input placeholder='Verification Code on the right'/>
                      </p>
                    )}
                      <span className='register-verification' onClick={this.handleChangeVerifyCode.bind(this)}>
                        <Spin spinning={this.state.verifyCodeLoading}>
                          <img alt='loading' title='click me to change one' src={`data:image/png;base64,${verifyCode}`}/>
                        </Spin>
                      </span>
                 </FormItem>
                 <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                 </FormItem>
            </Form>

        )
    }
}
const RegisterWrap = Form.create()(Register);
export default RegisterWrap;