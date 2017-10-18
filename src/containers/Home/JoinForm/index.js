import  React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Form, Button, Input, Icon, message, Tooltip } from 'antd';

import './style.less';


const FormItem = Form.Item;

// 初始为一个输入框
let uuid = 1;
// 最多输入框数
const maxMember = 2;
class JoinForm extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    remove(k) {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      console.log('uuid', uuid);
      // We need at least one passenger
      
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    }

  add() {
    const { form } = this.props;
      // can use data-binding to get
    const keys = form.getFieldValue('keys');
    
    if (keys.length>=maxMember) {
      message.error(`超过最大人数${maxMember}`);
      console.log('keys', keys);
      return;
    }
    uuid++;
    // can use data-binding to get
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let members = [];
        for(let [keys, values] of Object.entries(values)) {
          // console.log('keys, values', keys, values);
          if (keys.indexOf('name')>=0) {
            members = members.concat(values);
          }
        }
        this.props.createTeam({
          teamName: values.teamName,
          members,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 17, offset: 7 },
      },
    };
    getFieldDecorator('keys', { initialValue: [1] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 
                  <span>
                    Members&nbsp;
                    <Tooltip title="include your own email">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span> : ''}
          required={index === 0 ? true : false }
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              type: 'email',
              required: true,
              whitespace: true,
              message: "Please input your team members' email.",
            }],
          })(
            <Input placeholder="members' email" style={{ width: '80%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem 
        label='Team name'
        required={true}
        {...formItemLayout}
        >
        {
          getFieldDecorator('teamName', {
            rules: [{
              required: true,
              whitespace: true,
              message: 'Please input your team name.'
            }],
          })(
            <Input placeholder='team name'  />
          )
        }
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '70%' }}>
            <Icon type="plus" /> Add team member
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Create</Button>
        </FormItem>
      </Form>
    );
  }
}


const JoinFormWrap = Form.create()(JoinForm);

export default JoinFormWrap