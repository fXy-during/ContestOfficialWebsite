import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Form, Input, Tooltip, Icon, Row, Col, Button, message, Spin } from 'antd';
const FormItem = Form.Item;

import register from '../../../../fetch/register';
import getVerifyCode from '../../../../fetch/getVerifyCode';
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
        if (resp.ok) {
          return resp.text()
        } else {  
          return message.error('500: 服务器内部错误')
          // 登录失败时更新验证码
          this.getVerifyCodeAction();
        }
      }).then(text=>{
        if (!!text) {
          message.success('注冊成功');
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
        callback('Two passwords that you enter is inconsistent!');
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
              span: 14,
              offset: 6,
            },
          },
        };
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem 
                 {...formItemLayout}
                 label={(
                  <span>
                    Name&nbsp;
                    <Tooltip title="Recommend the real name">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                  )}>
                 {
                    getFieldDecorator('name', {
                        rules: [{
                            type: 'string',
                            pattern: /[\u4e00-\u9fa5]/,
                            message: 'The input is not valid name',
                        },{
                            required: true,
                            message: 'please input your real name',
                        }]
                    })(
                        <Input placeholder='your name'/>
                    )}
                 </FormItem>
                 <FormItem 
                 {...formItemLayout}
                 label='SchoolNumber:'
                 hasFeedback>
                 {
                    getFieldDecorator('number', {
                        rules: [{
                            len: 12,
                            message: 'The input is not valid SchoolNumber',
                        },{
                            required: true,
                            message: 'please input your SchoolNumber',
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
                            message: 'The input is not valid E-mail',
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
                            message: 'The input is not valid verification',
                        },{
                            required: true,
                            message: 'please input your verification',
                        }]
                    })(
                      <p>
                        <Input placeholder='the verification on the right'/>
                      </p>
                    )}
                      <span className='register-verification' onClick={this.handleChangeVerifyCode.bind(this)}>
                        <Spin spinning={this.state.verifyCodeLoading}>
                          <img alt='验证码' title='点击更换图片' src={`data:image/png;base64,${verifyCode}`}/>
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