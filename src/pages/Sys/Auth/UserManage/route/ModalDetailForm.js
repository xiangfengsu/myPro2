import React, { PureComponent } from 'react';
import { Form, Row, Col, Card } from 'antd';

import { renderFormItem } from '@/core/common/formItem';

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
  renderFormItem = () => {
    const { formItems, form } = this.props;
    return formItems.map(item => {
      const InputType = renderFormItem(item, form);
      return (
        <Col lg={item.colSpan === 0 ? 0 : item.colSpan || 8} md={12} sm={24} key={item.key}>
          <FormItem label={`${item.label}`} {...formItemLayout} hasFeedback>
            {InputType}
          </FormItem>
        </Col>
      );
    });
  };

  render() {
    // console.log(this.props);
    return (
      <Card bordered={false} loading={false}>
        <Form>
          <Row gutter={24}>{this.renderFormItem()}</Row>
        </Form>
      </Card>
    );
  }
}
export default DetailFormInfo;
