import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
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
  static contextTypes = {
    updateFormItems: PropTypes.func,
  };

  state = {
    selectMenuTypeValue: 1,
  };

  selectMenuType = value => {
    this.context.updateFormItems(value);
    this.setState({
      selectMenuTypeValue: value,
    });
    this.props.form.resetFields();
  };

  renderFormItem = () => {
    const { formItems, form } = this.props;
    const { selectMenuTypeValue } = this.state;
    return formItems.map(item => {
      if (item.formType === 'selectDynamicTree') {
        Object.assign(item, {
          extraProp: { selectMenuTypeValue },
        });
      }
      if (item.key === 'menutype') {
        item.onSelect = this.selectMenuType; // eslint-disable-line
      }
      const InputType = renderFormItem(item, form);
      return (
        <Col
          lg={item.colSpan === 0 ? 0 : item.colSpan || 8}
          md={item.colSpan === 0 ? 0 : 12}
          sm={item.colSpan === 0 ? 0 : 24}
          key={item.key}
        >
          <FormItem
            {...formItemLayout}
            label={
              item.tooltip ? (
                <span>
                  {item.label}
                  &nbsp;
                  <Tooltip title={item.tooltip}>
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              ) : (
                item.label
              )
            }
            hasFeedback
          >
            {InputType}
          </FormItem>
        </Col>
      );
    });
  };

  render() {
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
