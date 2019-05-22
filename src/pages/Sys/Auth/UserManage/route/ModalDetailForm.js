import React, { PureComponent } from 'react';
import { Form, Row, Col, Card, Icon } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import findLastIndex from 'lodash/findLastIndex';

import renderFormItem from '@/core/common/renderFormItem';

@Form.create()
class DetailFormInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.currFormItems = props.formItems;
    this.keyId = 0;
  }

  addItem = () => {
    const { updateFormItems } = this.props;
    if (updateFormItems) {
      const mobileItem = this.currFormItems.find(item => item.key === 'mobile');
      const lastIndex = findLastIndex(this.currFormItems, item => item.type === 'add');
      const newItem = cloneDeep(mobileItem);
      this.keyId += 1;
      Object.assign(newItem, {
        key: `${this.keyId}_mobile`,
        initialValue: undefined,
      });
      this.currFormItems.splice(lastIndex === -1 ? 1 : lastIndex + 1, 0, newItem);
      updateFormItems(this.currFormItems);
    }
  };

  remove = key => {
    const { updateFormItems } = this.props;
    if (updateFormItems) {
      const index = this.currFormItems.findIndex(item => item.key === key);
      this.currFormItems.splice(index, 1);
      updateFormItems(this.currFormItems);
    }
  };

  renderFormItem = () => {
    const { formItems, form } = this.props;
    return formItems.map(item => {
      const InputType = renderFormItem(item, form);
      if (item.key === 'mobile') {
        return (
          <Col span={24} key={item.key}>
            <Row>
              <Col span={20} push={1}>
                {InputType}
              </Col>
              <Col span={2} push={2} style={{ marginTop: 7 }}>
                <Icon
                  type="plus-circle-o"
                  style={{ fontSize: 24, cursor: 'pointer' }}
                  onClick={() => this.addItem()}
                />
              </Col>
            </Row>
          </Col>
        );
      }
      if (item.key !== 'mobile' && item.type === 'add') {
        return (
          <Col span={24} key={item.key}>
            <Row>
              <Col span={20} push={1}>
                {InputType}
              </Col>
              <Col span={2} push={2} style={{ marginTop: 7 }}>
                <Icon
                  type="minus-circle-o"
                  style={{ fontSize: 24, cursor: 'pointer', color: 'rgb(245, 34, 45)' }}
                  onClick={() => this.remove(item.key)}
                />
              </Col>
            </Row>
          </Col>
        );
      }
      return (
        <Col lg={item.colSpan === 0 ? 0 : item.colSpan || 8} md={12} sm={24} key={item.key}>
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
