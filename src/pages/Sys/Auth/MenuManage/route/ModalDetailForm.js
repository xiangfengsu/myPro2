import React, { PureComponent } from 'react';
import { Form, Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import renderFormItem from '@/core/common/renderFormItem';

@Form.create()
class DetailFormInfo extends PureComponent {
  static contextTypes = {
    updateFormItems: PropTypes.func,
  };

  state = {
    selectMenuTypeValue: this.props.currentItem.menutype || 1,
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
      if (item.formType === 'CSelectDynamicTree') {
        Object.assign(item.props, {
          selectMenuTypeValue,
        });
      }

      if (item.key === 'menutype') {
        item.props.onChange = this.selectMenuType; // eslint-disable-line
      }
      const InputType = renderFormItem(item, form);
      return (
        <Col
          lg={item.colSpan === 0 ? 0 : item.colSpan || 8}
          md={item.colSpan === 0 ? 0 : 12}
          sm={item.colSpan === 0 ? 0 : 24}
          key={item.key}
        >
          {InputType}
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
