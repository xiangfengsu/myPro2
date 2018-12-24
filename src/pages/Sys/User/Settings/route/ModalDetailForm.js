import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Input } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
@Form.create()
class DetailFormInfo extends PureComponent {
  state = {
    confirmDirty: false,
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFieldsAndScroll(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(({ confirmDirty }) => ({
      confirmDirty: confirmDirty || !!value,
    }));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card bordered={false} loading={false}>
        <Form>
          <Row gutter={24}>
            <Col lg={24} md={12} sm={24}>
              <FormItem label="原密码" {...formItemLayout} hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入原密码',
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
            </Col>
            <Col lg={24} md={12} sm={24}>
              <FormItem label="新密码" {...formItemLayout} hasFeedback>
                {getFieldDecorator('newpassword', {
                  rules: [
                    {
                      required: true,
                      message: '请输入新密码',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
            </Col>
            <Col lg={24} md={12} sm={24}>
              <FormItem label="确认密码" {...formItemLayout} hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: '请输入确认密码',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}
export default DetailFormInfo;
